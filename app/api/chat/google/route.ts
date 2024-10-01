import { ServerRuntime } from 'next';
import { NextResponse } from 'next/server';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { AIMessage, BaseMessage, HumanMessage } from '@langchain/core/messages';
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from '@langchain/core/prompts';
import { env } from '@/config/env';

interface BodyData {
  model: string;
  messages: string;
  historyMessage?: { question: string; answer: string }[];
  topicId?: string;
}

export const runtime: ServerRuntime = 'edge';

export async function POST(req: Request) {
  const { model, messages, historyMessage }: BodyData = await req.json();

  try {
    const genai = new ChatGoogleGenerativeAI({
      apiKey: env.GOOGLE_API_KEY,
      model,
      maxRetries: 3,
      maxOutputTokens: 4096,
    });

    const history_chat: BaseMessage[] = [];

    if (historyMessage) {
      historyMessage?.map((history) => {
        history_chat.push(
          new HumanMessage(history.question),
          new AIMessage(history.answer || '')
        );
      });

      history_chat.slice(-10);
    }

    const prompt = ChatPromptTemplate.fromMessages([
      [
        'system',
        `You are a helpful assistant who remembers all details the user shares with you.`,
      ],
      new MessagesPlaceholder('history_chat'),
      new MessagesPlaceholder('input'),
    ]);

    const chain = prompt.pipe(genai);

    const response = await chain.invoke({
      history_chat: history_chat,
      input: [new HumanMessage(messages)],
    });

    return NextResponse.json({
      code: 200,
      status: 'success',
      data: {
        content: response.content,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({
        code: 500,
        status: 'false',
        data: {
          content: error.message,
        },
      });
    }
  }
}
