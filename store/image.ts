/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';

interface IImage {
  imagePreview: { src: string; size: number; name: string };
  setImagePreview: (value: object) => void;
  //   setImageRef: (value: RefObject<HTMLImageElement>) => void;
}

export const useImage = create<IImage>((set) => ({
  imagePreview: { src: '', size: 0, name: '' },
  setImagePreview: (value: any) => set({ imagePreview: value }),
}));
