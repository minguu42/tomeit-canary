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
  backgroundColor: `rgb(${color.surface._})`,
  boxShadow: elevation.level3,
});

export const headline = style([
  typography.headline.small,
  { marginBottom: 16, color: `rgb(${color.on.surface._})` },
]);

export const supportingText = style([
  typography.body.medium,
  {
    marginBottom: 24,
    color: `rgb(${color.on.surface.variant})`,
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
  backgroundColor: "rgb(50 47 55 / 0.4)",
});
