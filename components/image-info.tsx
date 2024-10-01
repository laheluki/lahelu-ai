import { formatImageSize } from '@/lib/format-image';

interface ImageInfoProps {
  imagePreview: {
    name: string;
    size: number;
  };
}

export const ImageInfo = ({ imagePreview }: ImageInfoProps) => {
  return (
    <div className='flex items-start flex-col my-2'>
      <p className='w-36 truncate'>{imagePreview.name}</p>
      <p className='text-sm'>{formatImageSize(imagePreview.size)}</p>
    </div>
  );
};
