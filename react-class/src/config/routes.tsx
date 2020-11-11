export enum ROUTES {
  CURRENCIES = "/currencies",
  THEMES = "/themes",
  OPTIONS = "/options",
  HOME = "/",
}

export enum CURRENCIES_ROUTE_TYPE {
  BASE,
  QUOTE,
}

export type TCurrenciesRouteState = {
  type: CURRENCIES_ROUTE_TYPE;
}
