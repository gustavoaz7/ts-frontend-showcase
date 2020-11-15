import { TCurrencies } from "../config/currencies";

const BASE_URL = 'https://api.exchangeratesapi.io';

export const getCurrencyConversions = (currency: TCurrencies) => fetch(
  `${BASE_URL}/latest?base=${currency}`
);
