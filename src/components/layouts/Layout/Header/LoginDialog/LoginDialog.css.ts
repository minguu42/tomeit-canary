import { style } from "@vanilla-extract/css";

import { color, elevation, typography } from "@/styles/tokens";

export const container = style({
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  zIndex: 6,
  minWidth: 280,
  maxWidth: 560,
  padding: 24,
  borderRadius: 28,
  backgroundColor: color.surface,
  boxShadow: elevation.level3,
});

export const headline = style([
  typography.headline.small,
  { marginBottom: 16, color: color.on.surface },
]);

export const supportingText = style([
  typography.body.medium,
  {
    marginBottom: 24,
    color: color.on.surfaceVariant,
  },
]);

export const alignCenter = style({
  display: "flex",
  justifyContent: "center",
});

export const scrim = style({
  position: "absolute",
  top: 0,
  left: 0,
  zIndex: 5,
  height: "100vh",
  width: "100vw",
  backgroundColor: color.scrim,
});
