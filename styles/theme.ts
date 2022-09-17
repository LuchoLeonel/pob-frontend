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
