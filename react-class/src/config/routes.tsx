export enum ROUTES {
  CURRENCIES = "/currencies",
  THEMES = "/themes",
  OPTIONS = "/options",
  HOME = "/",
}

export type TCurrenciesRouteState = {
  type: 'base' | 'quote';
}
