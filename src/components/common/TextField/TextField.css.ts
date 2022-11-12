import { style } from "@vanilla-extract/css";

import { color, typography } from "@/styles/tokens";

export const container = style({
  position: "relative",
  display: "flex",
  alignItems: "center",
  height: 56,
  paddingLeft: 12,
  borderRadius: "4px 4px 0 0",
  color: color.on.surfaceVariant,
  backgroundColor: color.surfaceVariant,
});

export const inputText = style({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  padding: "0 16px 0 52px",
  border: "none",
  borderBottom: `1px solid ${color.on.surfaceVariant}`,
  fontSize: typography.body.large.size,
  fontWeight: typography.body.large.weight,
  color: color.on.surfaceVariant,
  backgroundColor: "transparent",
  selectors: {
    ["&:focus-visible"]: {
      outline: "none",
      color: color.primary,
      borderBottom: `2px solid ${color.primary}`,
    },
  },
});
