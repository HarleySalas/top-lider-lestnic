import { createTheme } from "@mantine/core";
import components from "./components";
import { variantColorResolver } from "./variantColorResolver";
import { futuraPt } from "./fonts";

export const theme = createTheme({
  primaryColor: "brandPrimary",
  cursorType: "pointer",
  // fontSizes: {
  //   xs: "calc(0.8rem * var(--mantine-scale))",
  //   sm: "calc(0.94rem * var(--mantine-scale))",
  //   md: "calc(1.1rem * var(--mantine-scale))",
  //   lg: "calc(1.2rem * var(--mantine-scale))",
  //   xl: "calc(1.32rem * var(--mantine-scale))",
  // },
  fontSizes: {
    xs: "calc(0.85rem * var(--mantine-scale))",
    sm: "calc(1rem * var(--mantine-scale))",
    md: "calc(1.1rem * var(--mantine-scale))",
    lg: "calc(1.2rem * var(--mantine-scale))",
    xl: "calc(1.32rem * var(--mantine-scale))",
  },
  lineHeights: {
    xs: "1.2",
    sm: "1.25",
    md: "1.30",
    lg: "1.35",
    xl: "1.4",
  },

  fontFamily: futuraPt.style.fontFamily,

  headings: {
    fontWeight: "500",
    sizes: {
      h1: {
        fontSize: "1.8rem",
        lineHeight: "1.1",
        fontWeight: "600",
      },
      h2: {
        lineHeight: "1.2",
        fontWeight: "500",
      },
      h3: {
        lineHeight: "1.25",
        fontWeight: "600",
      },
      h4: {
        lineHeight: "1.25",
      },
      h5: {
        lineHeight: "1.25",
      },
      h6: {
        lineHeight: "1.25",
      },
    },
  },
  colors: {
    // brandPrimary: [
    //   "#fffbe1",
    //   "#fff6cc",
    //   "#ffeb9b",
    //   "#ffe064",
    //   "#ffd738",
    //   "#ffd11c",
    //   "#ffce09",
    //   "#e3b600",
    //   "#c9a100",
    //   "#ae8b00",
    // ],
    dark: [
      "#696e77",
      "#5a6169",
      "#43484e",
      "#363a3f",
      "#2e3135",
      "#272a2d",
      "#212225",
      "#18191b",
      "#111113",
      "#111113",
    ],
    gray: [
      "#f9f9fb",
      "#f0f0f3",
      "#e8e8ec",
      "#e0e1e6",
      "#d9d9e0",
      "#cdced6",
      "#b9bbc6",
      "#8b8d98",
      "#80838d",
      "#60646c",
    ],

    //amber
    brandPrimary: [
      // "#fefdfb",
      // "#fefbe9",
      "#fefbe9",
      "#fff7c2",
      // "#ffee9c",
      "#fbe577",
      "#f3d673",
      "#e9c162",
      "#e2a336",
      "#ffc53d",
      "#ffba18",
      "#ffba18",
      "#ab6400",
    ],
  },

  // const slate = {
  // 	slate1: '#fcfcfd',
  // 	slate2: '#f9f9fb',
  // 	slate3: '#f0f0f3',
  // 	slate4: '#e8e8ec',
  // 	slate5: '#e0e1e6',
  // 	slate6: '#d9d9e0',
  // 	slate7: '#cdced6',
  // 	slate8: '#b9bbc6',
  // 	slate9: '#8b8d98',
  // 	slate10: '#80838d',
  // 	slate11: '#60646c',
  // 	slate12: '#1c2024',
  // }

  defaultGradient: {
    from: "brandPrimary.4",
    to: "brandPrimary.7",
    deg: 135,
  },

  components,
  variantColorResolver: variantColorResolver,
});
