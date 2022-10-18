import { style } from "@vanilla-extract/css";

import { color, typography } from "@/styles/tokens";

export const container = style({});

export const textFieldContainer = style({
  position: "relative",
  display: "flex",
  alignItems: "center",
  height: 56,
  borderRadius: "4px 4px 0 0",
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
      ["&:focus-visible"]: {
        outline: "none",
        color: `rgb(${color.primary._})`,
        borderBottom: `2px solid rgb(${color.primary._})`,
      },
    },
  },
]);

export const sub = style({
  display: "flex",
  gap: 16,
  alignItems: "center",
  height: 48,
  padding: "4px 16px 4px 12px",
  borderRadius: "0 0 4px 4px",
  backgroundColor: `rgb(${color.surface.variant})`,
});

export const dateField = style([
  typography.label.large,
  {
    border: "none",
    color: `rgb(${color.on.surface.variant})`,
    backgroundColor: "transparent",
    selectors: {
      "&:focus-visible": {
        outline: "none",
        color: `rgb(${color.primary._})`,
        borderBottom: `2px solid rgb(${color.primary._})`,
      },
    },
  },
]);

export const numberField = style([
  typography.label.large,
  {
    padding: "0 4px",
    border: "none",
    color: `rgb(${color.on.surface.variant})`,
    backgroundColor: "transparent",
    selectors: {
      "&:focus-visible": {
        outline: "none",
        color: `rgb(${color.primary._})`,
        borderBottom: `2px solid rgb(${color.primary._})`,
      },
    },
  },
]);

export const spacer = style({ flex: "1 1 0" });
