import { style } from "@vanilla-extract/css";

import { color, typography } from "@/styles/tokens";

export const container = style({
  position: "absolute",
  zIndex: 3,
  top: 48,
  left: 4,
  width: 328,
  height: 428,
  padding: "0 12px",
  borderRadius: 16,
  backgroundColor: color.surface3,
});

export const header = style({
  display: "flex",
  alignItems: "center",
  height: 56,
  color: color.on.surfaceVariant,
});

export const menuButton = style([
  {
    padding: "0 4px",
    border: "0",
    color: color.on.surfaceVariant,
    backgroundColor: "transparent",
  },
  typography.label.large,
]);

export const spacer = style({
  flex: "1 1 0",
});

export const weekdays = style({
  display: "flex",
  gap: 4,
});

export const dateList = style({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(40px, 1fr))",
  gap: "0 4px",
});

export const weekdaysItem = style([
  {
    display: "grid",
    placeItems: "center",
    width: 40,
    height: 40,
    color: color.on.surface,
  },
  typography.body.large,
]);
