import { extendTheme } from "@chakra-ui/react";
import FileUpload from "./FileUpload";
import ImageOptions from "./ImageOptions";

const fonts = {
  body: "sans-serif",
  heading: "sans-serif",
  mono: "monospace",
};

const colors = {
  boilerplate: {
    transparent: "transparent",
    black: "black",
    white: "white",
    gold: "#D69E2E",
  },
  brand: {
    100: "#C4F550",
    200: "#BEF43E",
    300: "#B7F32B",
    400: "#A3DE31",
    500: "#8FC837",
    600: "#7BB23D",
    700: "#669C42",
    800: "#5D8E3C",
    900: "#558137",
  },
};

const styles = {
  // global: {
  //   html: {
  //     bg: colors.boilerplate.transparent,
  //   },
  //   body: {
  //     bg: colors.boilerplate.transparent,
  //   },
  // },
};

const breakpoints = {
  sm: "30em",
  md: "48em",
  lg: "62em",
  xl: "80em",
  "2xl": "96em",
};

const components = {
  // ThemeSwitcher: {
  //   baseStyle: {
  //     p: "1em",
  //   },
  //   variants: {
  //     shadow: {
  //       boxShadow: "xl",
  //     },
  //   },
  // },
  FileUpload,
  ImageOptions,
};

const config = {
  initialColorMode: "light",
};

export const theme = extendTheme({
  config,
  fonts,
  colors,
  styles,
  breakpoints,
  components,
});
