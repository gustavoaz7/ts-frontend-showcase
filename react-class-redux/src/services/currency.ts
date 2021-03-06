import { TCurrencies } from '../config/currencies';

const BASE_URL = 'https://api.exchangerate.host';

export const getCurrencyConversions = (currency: TCurrencies) =>
  fetch(`${BASE_URL}/latest?base=${currency}`);
