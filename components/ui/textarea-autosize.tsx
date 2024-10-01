'use client';
import ReactTextareaAutosize from 'react-textarea-autosize';

interface TextAreaAutoSizeProps {
  textareaRef?: React.RefObject<HTMLTextAreaElement>;
}

export const TextAreaAutoSize = ({ textareaRef }: TextAreaAutoSizeProps) => {
  return (
    <ReactTextareaAutosize className='bg-background w-full' ref={textareaRef} />
  );
};
