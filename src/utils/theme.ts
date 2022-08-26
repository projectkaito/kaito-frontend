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
const RealityCheck = "RealityCheck";
const Ubuntu = "'Ubuntu', sans-serif";

const primaryCrimson = "#C92115";
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
    // fontFamily: " 'Ubuntu', sans-serif",
    fontFamily: RealityCheck,
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
          fontWeight: 400,
          fontSize: "1.2rem",
          padding: "3px 32px",
          background: "linear-gradient(180deg, #C92212 0%, #700B0F 100%)",
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
    MuiTextField: {
      styleOverrides: {
        root: {
          borderColor: "white",
          "& label": {
            color: "grey",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          background: "rgba(100,100,100,0.2)",
          backdropFilter: "blur(10px)",
        },
      },
    },
  },
  fonts: [RealityCheck, Typographica, Ubuntu],
});

theme = responsiveFontSizes(theme);

export default theme;
