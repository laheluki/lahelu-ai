/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { RefObject, useEffect, useState } from 'react';
import Image from 'next/image';
import { FileImage } from 'lucide-react';
import TextareaAutosize from 'react-textarea-autosize';
import { SubmitButton } from './submit-button';
import { ImageInfo } from './image-info';
import { useImageInput } from '@/hooks/use-image-input';
import { ImagePreview } from './image-preview';
import { useModel } from '@/store/model';

interface ChatInputProps {
  message: string;
  setMessage: (message: string) => void;
  handleSubmit: (data: FormData) => Promise<void>;
  fileInputRef: RefObject<HTMLInputElement>;
}

export const ChatInput = ({
  handleSubmit,
  message,
  setMessage,
  fileInputRef,
}: ChatInputProps) => {
  const model = useModel((state) => state.model);
  // const imageRef = useRef<HTMLImageElement>(null);

  const [imageEnable, setImageEnable] = useState<boolean>(true);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  useEffect(() => {
    setImageEnable(!model.vision);
  }, [model.vision]);

  useEffect(() => {
    setIsDisabled(
      !(model.value.trim().length > 0 && message.trim().length > 0)
    );
  }, [model, message]);

  const {
    imagePreview,
    modalOpen,
    handleImageChange,
    resetImageInput,
    setModalOpen,
  } = useImageInput(fileInputRef);

  return (
    <>
      {imagePreview.src && (
        <>
          {modalOpen && (
            <div
              className='fixed inset-0 bg-opacity-50 flex justify-center items-center backdrop-blur-md'
              onClick={() => setModalOpen(false)}
            >
              <Image
                src={imagePreview.src}
                alt='preview'
                layout='fill'
                className='max-w-96 max-h-96 my-auto mx-auto'
              />
            </div>
          )}
          <ImagePreview
            imagePreview={imagePreview}
            setModalOpen={setModalOpen}
            resetImageInput={resetImageInput}
          />
          <ImageInfo imagePreview={imagePreview} />
        </>
      )}
      <form
        className='flex flex-row items-center gap-2 sm:pr-5'
        action={handleSubmit}
      >
        <div className='relative w-full'>
          <label
            htmlFor='image'
            aria-disabled={true}
            className={`absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground ${
              imageEnable
                ? 'opacity-25 cursor-default'
                : 'hover:opacity-50 cursor-pointer'
            }`}
          >
            <FileImage className='h-5 w-5' />
            <span className='sr-only'>Image input</span>
          </label>

          <input
            ref={fileInputRef}
            onChange={handleImageChange}
            type='file'
            className='hidden'
            name='image'
            id='image'
            disabled={imageEnable}
            accept='image/*'
          />

          <TextareaAutosize
            id='message'
            name='message'
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder='What magic can we create today?'
            rows={1}
            maxRows={6}
            className='block h-12 rounded-md break-words whitespace-pre-wrap w-full resize-none py-3 pl-10 pr-10 my-auto border border-input bg-transparent text-sm'
          />

          <SubmitButton disabled={isDisabled} />
        </div>
      </form>
    </>
  );
};
