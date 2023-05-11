import {extendTheme} from 'native-base';

const newColorTheme = {
  brand: {
    900: '#0584FE',
    800: '#7c83db',
    700: '#ffffff',
  },
};

const theme = extendTheme({
  colors: newColorTheme,
});

export default theme;
