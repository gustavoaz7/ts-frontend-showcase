export enum THEME_VARIANTS {
  BLUE = 'Blue',
  ORANGE = 'Orange',
  GREEN = 'Green',
  PURPLE = 'Purple',
}

export type TTheme = {
  colors: {
    primary: string;
    secondary: string;
    lightGray: string;
    gray: string;
    darkGray: string;
  }
}

const sharedColors: Omit<TTheme['colors'], 'primary' | 'secondary'> = {
  lightGray: '#F0F0F0',
  gray: '#979797',
  darkGray: '#797979',
}

export const blueTheme: TTheme = {
  colors: {
    primary: '#4F6D7A',
    secondary: '#fff',
    ...sharedColors,
  },
};

export const orangeTheme: TTheme = {
  colors: {
    primary: '#D57A66',
    secondary: '#333',
    ...sharedColors,
  },
};

export const greenTheme: TTheme = {
  colors: {
    primary: '#00BD9D',
    secondary: '#fff',
    ...sharedColors,
  },
};

export const purpleTheme: TTheme = {
  colors: {
    primary: '#9E768F',
    secondary: '#fff',
    ...sharedColors,
  },
};

export const getTheme = (variant: THEME_VARIANTS) => {
  switch (variant) {
    case THEME_VARIANTS.BLUE:
      return blueTheme;
    case THEME_VARIANTS.GREEN:
      return greenTheme;
    case THEME_VARIANTS.ORANGE:
      return orangeTheme;
    case THEME_VARIANTS.PURPLE:
      return purpleTheme;
  }
}