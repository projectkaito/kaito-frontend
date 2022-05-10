import { createTheme, responsiveFontSizes } from "@mui/material/styles";

// declare module "@mui/material/Button" {
//   interface ButtonPropsVariantOverrides {
//     containedLeft: true;
//     containedRight: true;
//   }
// }

// declare module "@mui/material/styles" {
//   interface Theme {
//     textShadows: {
//       primary: string;
//       secondary: string;
//       white: string;
//     };

//     fonts: string[];
//   }
//   // allow configuration using `createTheme`
//   interface ThemeOptions {
//     textShadows?: {
//       primary?: string;
//       secondary?: string;
//       white?: string;
//     };
//     fonts?: string[];
//   }
// }

let theme = createTheme({
  palette: {},
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1280,
      xl: 1920,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
