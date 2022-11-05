import { style } from "@vanilla-extract/css";

import { color, typography } from "@/styles/tokens";

export const container = style({
  position: "relative",
  display: "flex",
  alignItems: "center",
  width: 60,
  height: 28,
  color: `rgb(${color.on.surfaceVariant})`,
  backgroundColor: `rgb(${color.surfaceVariant})`,
});

export const field = style([
  {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    paddingLeft: 28,
    border: "0",
    color: `rgb(${color.on.surfaceVariant})`,
    backgroundColor: "transparent",

    selectors: {
      "&:focus-visible": {
        outline: "0",
        color: `rgb(${color.primary})`,
        borderBottom: `2px solid rgb(${color.primary})`,
      },
    },
  },
  typography.label.large,
]);
