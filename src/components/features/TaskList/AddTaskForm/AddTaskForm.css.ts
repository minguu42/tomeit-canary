import { style } from "@vanilla-extract/css";

import { color, typography } from "@/styles/tokens";

export const container = style({});

export const textFieldContainer = style({
  position: "relative",
  display: "flex",
  alignItems: "center",
  height: 56,
  borderRadius: 4,
  backgroundColor: `rgb(${color.surface.variant})`,
});

export const leadingIcon = style({
  position: "absolute",
  marginLeft: 12,
  color: `rgb(${color.on.surface.variant})`,
  zIndex: 1,
  backgroundColor: "transparent",
});

export const textField = style([
  typography.body.large,
  {
    position: "absolute",
    width: "100%",
    height: 56,
    padding: "0 16px 0 52px",
    border: "none",
    borderBottom: `1px solid rgb(${color.on.surface.variant})`,
    color: `rgb(${color.on.surface.variant})`,
    backgroundColor: "transparent",
    selectors: {
      [`&:focus-visible`]: {
        outline: "none",
        color: `rgb(${color.primary._})`,
        borderBottom: `2px solid rgb(${color.primary._})`,
      },
    },
  },
]);

export const sub = style({
  display: "flex",
  alignItems: "center",
  height: 52,
  backgroundColor: `rgb(${color.surface.variant})`,
});
