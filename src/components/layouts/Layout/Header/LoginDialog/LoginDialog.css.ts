import { style } from "@vanilla-extract/css";

import { color, elevation, typography } from "@/styles/tokens";

export const container = style({
  position: "absolute",
  top: "40%",
  left: "50%",
  zIndex: 5,
  minWidth: 280,
  maxWidth: 560,
  padding: 24,
  borderRadius: 28,
  boxShadow: elevation.level3,
  backgroundColor: color.surface,
  transform: "translate(-50%, -50%)",
});

export const headline = style({
  marginBottom: 16,
  fontSize: typography.title.large.size,
  fontWeight: typography.title.large.weight,
  color: color.on.surface,
});

export const supportingText = style({
  marginBottom: 24,
  fontSize: typography.body.medium.size,
  fontWeight: typography.body.medium.weight,
  color: color.on.surfaceVariant,
});

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
