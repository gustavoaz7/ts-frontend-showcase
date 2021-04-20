import { useAppSelector } from '../hooks';

export const useBaseCurrencySelector = () =>
  useAppSelector((state) => state.currency.baseCurrency);

export const useQuoteCurrencySelector = () =>
  useAppSelector((state) => state.currency.quoteCurrency);

export const useAmountSelector = () =>
  useAppSelector((state) => state.currency.amount);

export const useLoadingSelector = () =>
  useAppSelector((state) => state.currency.loading);

export const useErrorSelector = () =>
  useAppSelector((state) => state.currency.error);

export const useConversionsSelector = () =>
  useAppSelector((state) => state.currency.conversions);
