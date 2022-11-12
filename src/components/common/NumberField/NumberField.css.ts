import { style } from "@vanilla-extract/css";

import { color, fontValue } from "@/styles/tokens";

export const container = style({
  position: "relative",
  display: "flex",
  alignItems: "center",
  width: 60,
  height: 36,
  marginLeft: 12,
  color: color.on.surfaceVariant,
  backgroundColor: color.surfaceVariant,
});

export const field = style({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  paddingLeft: 28,
  border: "none",
  font: fontValue.label.large,
  color: color.on.surfaceVariant,
  backgroundColor: "transparent",

  selectors: {
    "&:focus-visible": {
      outline: "none",
      color: color.primary,
      borderBottom: `1px solid ${color.primary}`,
    },
  },
});
