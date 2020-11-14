import { TTheme } from './config/themes';

declare module 'styled-components' {
  export interface DefaultTheme extends TTheme {}
}
