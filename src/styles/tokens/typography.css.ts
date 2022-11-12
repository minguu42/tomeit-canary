import { createGlobalTheme } from "@vanilla-extract/css";

export const typography = createGlobalTheme(":root", {
  title: {
    large: "400 1.375rem inherit",
    medium: "400 1rem inherit",
  },
  body: {
    large: "400 1rem inherit",
    medium: "400 0.875rem inherit",
  },
  label: {
    large: "500 0.875rem inherit",
    medium: "500 0.75rem inherit",
  },
});
