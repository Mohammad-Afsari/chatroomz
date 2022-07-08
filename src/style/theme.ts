import { green, purple } from "@mui/material/colors";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";

const colors = {
  main: "#030214",
  secondary: "#EDEBFF",
  background: "red",
  white: "#FFF",
  black: "#141416",
  grey0: "#F4F5F6",
  grey1: "#E6E8EC",
  grey2: "#B1B5C3",
  grey3: "#777E90",
  grey4: "#353945",
  grey5: "#23262F",
  greyOutline: "#E6E8EC",
  searchBg: "#F4F5F6",
  success: "#0EAD69",
  error: "#DF3623",
  warning: "#EE660B",
  divider: "#E6E8EC",
};

export const baseTheme = createTheme({
  palette: {
    mode: "dark",
    // primary: colors,
    // background: {
    //   default: colors.black,
    //   paper: colors.black,
    // },
    // text: {
    //   primary: colors.white,
    //   secondary: colors.grey5,
    // },
  },
  shape: {
    borderRadius: 8,
  },
  typography: {
    allVariants: {
      //   color: colors.white,
      //   background: colors.grey1,
    },
    fontFamily: [
      "Poppins",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    button: {
      textTransform: "none",
      fontWeight: 500,
    },
    h1: { fontWeight: 600 },
    h2: { fontWeight: 550 },
    h3: { fontWeight: 500 },
    h4: { fontWeight: 450 },
    h5: { fontWeight: 400 },
    h6: { fontWeight: 350 },
  },
  components: {
    MuiButton: {
      defaultProps: {
        variant: "contained",
        disableRipple: true,
        disableElevation: true,
      },
    },
  },
});

export const theme = responsiveFontSizes(baseTheme);
