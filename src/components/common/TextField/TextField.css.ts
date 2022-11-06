import { style } from "@vanilla-extract/css";

import { color, typography } from "@/styles/tokens";

export const container = style({
  position: "relative",
  display: "flex",
  alignItems: "center",
  height: 56,
  borderRadius: "4px 4px 0 0",
  paddingLeft: 12,
  color: `rgb(${color.on.surfaceVariant})`,
  backgroundColor: `rgb(${color.surfaceVariant})`,
});

export const inputText = style([
  {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    padding: "0 16px 0 52px",
    border: "0",
    borderBottom: `1px solid rgb(${color.on.surfaceVariant})`,
    color: `rgb(${color.on.surfaceVariant})`,
    backgroundColor: "transparent",

    selectors: {
      ["&:focus-visible"]: {
        outline: "0",
        color: `rgb(${color.primary})`,
        borderBottom: `2px solid rgb(${color.primary})`,
      },
    },
  },
  typography.body.large,
]);
