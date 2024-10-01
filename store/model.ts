import { Model } from '@/constants/models';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface IModel {
  model: Model;
  provider: string;
  setProvider: (value: string) => void;
  changeModel: (value: Model) => void;
}

export const useModel = create(
  persist<IModel>(
    (set) => ({
      model: { value: '', label: '' },
      provider: '',
      setProvider: (value: string) => set({ provider: value }),
      changeModel: (value: Model) => set({ model: value }),
    }),
    {
      name: 'model-storage',
    }
  )
);
