import { createGlobalTheme } from "@vanilla-extract/css";

export const state = createGlobalTheme(":root", {
  layer: {
    hover: "0.08",
    focus: "0.12",
    active: "0.12",
  },
  content: {
    disabled: "0.38",
  },
  container: {
    disabled: "0.12",
  },
});
