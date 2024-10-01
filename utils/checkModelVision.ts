import { MODELS } from '@/constants/models';

export const checkModelSupportVision = (modelName: string) => {
  for (const provider of MODELS) {
    const foundModel = provider.models.find(
      (model) => model.value === modelName
    );

    if (foundModel) {
      return foundModel.vision || false;
    }

    return false;
  }
};
