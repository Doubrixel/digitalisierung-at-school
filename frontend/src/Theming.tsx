/* from: https://mui.com/customization/theming/ */
import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme {}
}

const theme = createTheme({
  // modify colors
  palette: {
    primary: {
      main: '#1e62a9',
    },
    secondary: {
      main: '#ff3d00',
    },
  },
  /* weitere Farben: error: warning, info, success */
  // modify Schriftart
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});

export default theme;
