import { extendTheme } from "@chakra-ui/react";

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
  },
};

const styles = {
  global: {
    html: {
      bg: colors.boilerplate.transparent,
    },
    body: {
      bg: colors.boilerplate.transparent,
    },
  },
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
};

const config = {
  initialColorMode: "dark",
};

export const theme = extendTheme({
  config,
  fonts,
  colors,
  styles,
  components,
});
