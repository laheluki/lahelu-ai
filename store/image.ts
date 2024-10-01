/* eslint-disable @typescript-eslint/no-explicit-any */
import { RefObject } from 'react';
import { create } from 'zustand';

interface IImage {
  imageRef: (value: RefObject<HTMLImageElement> | null) => void;
  imagePreview: { src: string; size: number; name: string };
  setImagePreview: (value: object) => void;
  //   setImageRef: (value: RefObject<HTMLImageElement>) => void;
}

export const useImage = create<IImage>((set) => ({
  imageRef: (value) => set({ imageRef: value }),
  //   setImageRef: (value: RefObject<HTMLImageElement>) => set({ imageRef: value }),
  imagePreview: { src: '', size: 0, name: '' },
  setImagePreview: (value: any) => set({ imagePreview: value }),
}));
