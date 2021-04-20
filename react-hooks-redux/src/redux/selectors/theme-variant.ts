import { useAppSelector } from '../hooks';

export const useThemeVariantSelector = () =>
  useAppSelector((state) => state.themeVariant);
