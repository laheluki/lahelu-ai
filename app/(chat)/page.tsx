'use client';

import { useCallback, useRef, useState } from 'react';
import { redirect } from 'next/navigation';
import { toast } from 'sonner';
import { BotMessageSquare } from 'lucide-react';

import { ChatInput } from '@/components/chat-input';
import { generateTitle } from '@/lib/generate-title';
import { addConversation, updateConversation } from '@/services/conversation';
import { insertImage } from '@/services/image';
import { generateTopic } from '@/services/topic';
import { useModel } from '@/store/model';
import { BlobToBase64 } from '@/utils/base64-encoder';
import { checkProvider } from '@/utils/check-provider';
import { generateRandomId } from '@/utils/generateId';
import { useImageInput } from '@/hooks/use-image-input';

export default function Chat() {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const { resetImageInput } = useImageInput(inputFileRef);
  const model = useModel((state) => state.model);
  const provider = useModel((state) => state.provider);

  const [message, setMessage] = useState<string>('');

  const handleSubmit = useCallback(
    async (data: FormData) => {
      if (message.trim() === '') return;
      const image = data.get('image');
      const url = checkProvider(provider);

      const topicId = generateRandomId(9);
      let imageId = '';
      const title = (await generateTitle(message)) as string;

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

      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          model: model.value,
          messages,
        }),
      });

      const json = await response.json();

      if (json.code !== 200) {
        toast(json.data.content, {
          dismissible: true,
          duration: 3000,
        });
        return;
      }

      if (image instanceof File && image.size !== 0) {
        imageId = generateRandomId(4);
        await await insertImage(imageId, blob!, base64);
      }

      await generateTopic(topicId, title);
      const idConver = await addConversation(topicId, message, imageId);
      await updateConversation(
        idConver,
        json.data.content,
        model.value,
        imageId
      );

      resetImageInput();
      redirect(`/c/${topicId}`);
    },
    [message, provider, model.value, resetImageInput]
  );

  return (
    <div className='grow max-w-3xl mx-auto'>
      <div className='flex flex-col items-center justify-center gap-4 pb-10 min-h-[77vh] w-full'>
        <div className='hover:opacity-50 cursor-pointer w-full'>
          <BotMessageSquare className='w-24 h-24 mx-auto' />
          <p className='text-center my-4 text-xl font-bold tracking-widest'>
            Lahelu AI
          </p>
        </div>
      </div>

      {/* input */}
      <div className='bottom-0 sticky pt-1 bg-background'>
        <ChatInput
          fileInputRef={inputFileRef}
          handleSubmit={handleSubmit}
          message={message}
          setMessage={setMessage}
        />
        <span className='flex text-center justify-center text-muted-foreground text-xs mt-3'>
          Lahelu AI sponsored by tepung bumbu serbaguna AJINOMOTO.
        </span>
      </div>
    </div>
  );
}
