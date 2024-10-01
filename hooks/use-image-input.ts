import { useImage } from '@/store/image';
import { useState, ChangeEvent, RefObject } from 'react';
import { toast } from 'sonner';

export function useImageInput(ref: RefObject<HTMLInputElement>) {
  // const [imagePreview, setImagePreview] = useState({
  //   src: '',
  //   size: 0,
  //   name: '',
  // });
  const { imagePreview, setImagePreview } = useImage((state) => state);

  // useEffect(() => {
  //   setImageRef(ref);
  // }, []);

  const [modalOpen, setModalOpen] = useState<boolean>(false);

  async function handleImageChange(e: ChangeEvent<HTMLInputElement>) {
    const image = e.target.files?.[0];

    if (image) {
      if (image.type === 'image/svg+xml') {
        toast('Unsupported Image Type.', {
          description:
            'SVG files are not supported. Please upload an image in PNG, JPEG, or other valid formats.',
          duration: 3500,
          position: 'top-right',
        });

        return;
      }
      const imageBlob = await image
        .arrayBuffer()
        .then((buffer) => new Blob([buffer], { type: image.type }));

      setImagePreview({
        src: URL.createObjectURL(imageBlob),
        size: image.size,
        name: image.name,
      });

      if (ref?.current) {
        ref.current.src = URL.createObjectURL(imageBlob);
      }
    }
  }

  function resetImageInput() {
    setImagePreview({ src: '', size: 0, name: '' });
    if (ref?.current) {
      ref.current.src = '';
      ref.current.value = '';
    }
  }

  return {
    imagePreview,
    modalOpen,
    handleImageChange,
    resetImageInput,
    setModalOpen,
  };
}
