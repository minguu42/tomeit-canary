import { createGlobalTheme } from "@vanilla-extract/css";

export const typography = createGlobalTheme(":root", {
  title: {
    large: {
      size: "1.375rem",
      weight: "400",
    },
    medium: {
      size: "1rem",
      weight: "400",
    },
  },
  body: {
    large: {
      size: "1rem",
      weight: "400",
    },
    medium: {
      size: "0.875rem",
      weight: "400",
    },
  },
  label: {
    large: {
      size: "0.875rem",
      weight: "500",
    },
    medium: {
      size: "0.75rem",
      weight: "500",
    },
  },
});
