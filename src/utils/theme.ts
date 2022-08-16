import { createTheme, responsiveFontSizes } from "@mui/material/styles";

// declare module "@mui/material/Button" {
//   interface ButtonPropsVariantOverrides {
//     containedLeft: true;
//     containedRight: true;
//   }
// }

declare module "@mui/material/styles" {
  interface Theme {
    textShadows: {
      primary: string;
      secondary: string;
      white: string;
    };

    fonts: string[];
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    textShadows?: {
      primary?: string;
      secondary?: string;
      white?: string;
    };
    fonts?: string[];
  }
}

const Typographica = "Typographica";

const primaryCrimson = "#D3165E";
const secondaryWhite = "#FFFFFF";

let theme = createTheme({
  palette: {
    primary: {
      main: primaryCrimson,
    },
    secondary: {
      main: secondaryWhite,
    },
    text: {
      primary: "rgb(255,255,255)",
    },
  },
  typography: {
    fontFamily: " 'Ubuntu', sans-serif",
  },
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
          "&.Mui-disabled": {
            backgroundColor: "grey",
          },
        },
        containedPrimary: {
          boxShadow: "none",
          borderRadius: 10,
          fontWeight: 600,
          fontSize: "1.2rem",
          padding: "3px 32px",
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          fontFamily: "'Ubuntu', san-serif",
        },
      },
    },
    MuiCircularProgress: {
      styleOverrides: {
        root: {
          color: "white",
        },
      },
    },
  },
  fonts: [Typographica],
});

theme = responsiveFontSizes(theme);

export default theme;
