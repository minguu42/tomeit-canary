import { style } from "@vanilla-extract/css";

import { color, typography } from "@/styles/tokens";

export const textFieldContainer = style({
  position: "relative",
  display: "flex",
  alignItems: "center",
  height: 56,
  borderRadius: "4px 4px 0 0",
  paddingLeft: 12,
  color: `rgb(${color.on.surfaceVariant})`,
  backgroundColor: `rgb(${color.surfaceVariant})`,
});

export const textField = style([
  typography.body.large,
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
]);

export const sub = style({
  display: "flex",
  gap: 16,
  alignItems: "center",
  height: 56,
  padding: "4px 16px 4px 12px",
  borderRadius: "0 0 4px 4px",
  backgroundColor: `rgb(${color.surfaceVariant})`,
});

export const spacer = style({ flex: "1 1 0" });
