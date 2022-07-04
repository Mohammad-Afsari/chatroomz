import { purple } from "@mui/material/colors";
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
    primary: colors,
    background: {
      default: colors.white,
      paper: colors.grey0,
    },
  },
  shape: {
    borderRadius: 8,
  },
  typography: {
    allVariants: {
      color: colors.white,
      background: colors.main,
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
    h1: { fontWeight: 600 },
    h2: { fontWeight: 500 },
    h3: { fontWeight: 500 },
    h4: { fontWeight: 500 },
    h5: { fontWeight: 500 },
    h6: { fontWeight: 500 },
  },
});

export const theme = responsiveFontSizes(baseTheme);
