/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { ElementRef, useEffect, useOptimistic, useRef, useState } from 'react';
import { toast } from 'sonner';
import ReactMarkdown from 'react-markdown';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { obsidian } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import { ChatInput } from '@/components/chat-input';
import { Skeleton } from '@/components/ui/skeleton';
import { Model } from '@/constants/models';
import { useModel } from '@/store/model';
import { db } from '@/lib/db';
import Image from 'next/image';
import { generateRandomId } from '@/utils/generateId';
import { checkProvider } from '@/utils/check-provider';
import { BlobToBase64 } from '@/utils/base64-encoder';
import { insertImage } from '@/services/image';
import {
  addConversation,
  deleteConversation,
  updateConversation,
} from '@/services/conversation';
import { useImageInput } from '@/hooks/use-image-input';

interface Message {
  id: string;
  answer?: string | undefined;
  question: string;
  imageId?: string;
}

type ChatProps = {
  messages: Message[];
  id: string;
};

export const Chat = ({ messages = [], id }: ChatProps) => {
  const scrollRef = useRef<ElementRef<'div'>>(null);
  const model = useModel((state) => state.model);
  const provider = useModel((state) => state.provider);

  const [imageOpen, setImageOpen] = useState(false);
  const [url, setUrl] = useState('');
  const [imageUrls, setImageUrls] = useState<{ [messageId: string]: string }>(
    {}
  );

  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    messages,
    (state, newMessage: string) => [
      ...state,
      {
        id: id,
        question: newMessage,
        answer: '',
      },
    ]
  );

  useEffect(() => {
    const fetchImageUrls = async () => {
      const newImageUrls: { [messageId: string]: string } = {};

      for (const message of messages) {
        const imageId = message.imageId;
        if (imageId) {
          const data = await db.images.where('id').equals(imageId).first();
          if (data?.imageData) {
            newImageUrls[message.id] = URL.createObjectURL(data.imageData);
          }
        }
      }

      setImageUrls(newImageUrls);
    };

    fetchImageUrls();
  }, [messages]);

  useEffect(() => {
    setTimeout(() => {
      scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }, [optimisticMessages]);

  return (
    <div className='grow max-w-3xl mx-auto'>
      <div className='flex flex-col items-start gap-12 pb-10 min-h-[77vh]'>
        {messages.map((message) => (
          <div className='flex flex-col items-start gap-4' key={message.id}>
            <h4 className='text-xl font-medium dark:text-sky-200 text-sky-700'>
              {imageUrls[message.id] && (
                <>
                  {imageOpen && (
                    <div
                      className='fixed inset-0 bg-opacity-50 flex justify-center items-center backdrop-blur-md'
                      onClick={() => {
                        setUrl('');
                        setImageOpen(false);
                      }}
                    >
                      <Image
                        src={url}
                        alt='preview'
                        layout='fill'
                        className='max-w-96 max-h-96 my-auto mx-auto'
                      />
                    </div>
                  )}
                  {message.imageId !== '' && (
                    <Image
                      className='rounded-sm hover:opacity-75 cursor-pointer'
                      onClick={() => {
                        setUrl(imageUrls[message.id]);
                        setImageOpen(true);
                      }}
                      src={imageUrls[message.id]}
                      alt={message.id}
                      width={60}
                      height={60}
                    />
                  )}
                </>
              )}
              {message.question}
            </h4>
            {!message.answer ? (
              <div className='w-96 flex flex-col gap-3'>
                <Skeleton className='w-[90%] h-[20px] rounded-md' />
                <Skeleton className='w-[60%] h-[20px] rounded-md' />
              </div>
            ) : (
              <ReactMarkdown
                className={'whitespace-pre-wrap w-full max-w-3xl'}
                components={{
                  code({ className, ...props }) {
                    const hasLang = /language-(\w+)/.exec(className || '');

                    return hasLang ? (
                      <SyntaxHighlighter
                        style={obsidian}
                        language={hasLang[1]}
                        PreTag='pre'
                        useInlineStyles={true}
                      >
                        {String(props.children).replace(/\n$/, '')}
                      </SyntaxHighlighter>
                    ) : (
                      <code className={className} {...props} />
                    );
                  },
                }}
              >
                {message.answer}
              </ReactMarkdown>
            )}
          </div>
        ))}
      </div>

      <div ref={scrollRef}></div>

      <div className='bottom-0 sticky pt-1 bg-background'>
        <ChatInputCustom
          id={id}
          addMessage={addOptimisticMessage}
          model={model}
          provider={provider}
          historyMessage={messages}
        />
        <span className='flex text-center justify-center text-muted-foreground text-xs mt-3'>
          Lahelu AI sponsored by tepung bumbu serbaguna AJINOMOTO.
        </span>
      </div>
    </div>
  );
};

interface ConversationComponent {
  id: string;
  model: Model;
  provider: string;
  historyMessage: any[];
  addMessage: (msg: string) => void;
}

const ChatInputCustom = ({
  addMessage,
  id,
  model,
  provider,
  historyMessage,
}: ConversationComponent) => {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const { resetImageInput } = useImageInput(inputFileRef);
  const [message, setMessage] = useState<string>('');

  const handleSubmit = async (data: FormData) => {
    if (message.trim() === '') return;
    const image = data.get('image');

    let imageId = '';

    const idConver = await addConversation(id, message, imageId);
    const url = checkProvider(provider);

    let messages = null;
    let blob: Blob | null = null;
    let base64 = null;

    if (image instanceof File && image.size !== 0) {
      blob = new Blob([image], { type: image.type });
      base64 = await BlobToBase64(blob);

      messages = {
        content: [
          {
            type: 'text',
            text: message,
          },
          {
            type: 'image_url',
            image_url: base64,
          },
        ],
      };
    } else {
      messages = {
        content: [
          {
            type: 'text',
            text: message,
          },
        ],
      };
    }

    addMessage(message);

    try {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          model: model.value,
          messages,
          historyMessage,
        }),
      });

      const json = await response.json();

      if (json.code !== 200) {
        deleteConversation(idConver);
        toast(json.data.content, {
          dismissible: true,
          duration: 3000,
        });
        return;
      }

      if (image instanceof File && image.size !== 0) {
        imageId = generateRandomId(4);
        await insertImage(imageId, blob!, base64);
      }

      await updateConversation(
        idConver,
        json.data.content,
        model.value,
        imageId
      );
    } catch (error) {
      toast('Error submitting message', {
        dismissible: true,
        duration: 3000,
      });
    } finally {
      resetImageInput();
      setMessage('');
    }
  };

  return (
    <ChatInput
      fileInputRef={inputFileRef}
      handleSubmit={handleSubmit}
      message={message}
      setMessage={setMessage}
    />
  );
};
