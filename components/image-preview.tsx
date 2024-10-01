import Image from 'next/image';
import { Trash2 } from 'lucide-react';

interface ImagePreviewProps {
  imagePreview: {
    src: string;
  };
  setModalOpen: (open: boolean) => void;
  resetImageInput: () => void;
}

export const ImagePreview = ({
  imagePreview,
  setModalOpen,
  resetImageInput,
}: ImagePreviewProps) => {
  return (
    <div className='relative w-20 h-20 my-2'>
      <Image
        alt='preview'
        src={imagePreview.src}
        layout='fill'
        objectFit='cover'
        className='rounded-sm hover:opacity-75 cursor-pointer'
        onClick={() => setModalOpen(true)}
      />
      <button
        className='absolute top-0 -right-3 p-1 rounded-full text-red-700'
        onClick={resetImageInput}
      >
        <Trash2 className='h-5 w-5' />
      </button>
    </div>
  );
};
