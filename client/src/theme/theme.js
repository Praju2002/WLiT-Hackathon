import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: "#FFFFFF", // White color
    },
    secondary: {
      main: "#4edf9", // Secondary color
    },
    text: {
      primary: "#000000", // Black text color
      secondary: "#FFFFFF", // White text color
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 950,
      lg: 1200,
      xl: 1536,
    },
  },
  typography: {
    fontFamily: "'Poppins', 'Roboto Slab', sans-serif",
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
  },
});

export default theme;
