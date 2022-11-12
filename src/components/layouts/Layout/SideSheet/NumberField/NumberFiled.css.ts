import { style } from "@vanilla-extract/css";

import { color, fontValue } from "@/styles/tokens";

export const container = style({
  display: "flex",
  gap: 16,
  alignItems: "center",
  height: 56,
  padding: "0 24px 0 16px",
  color: color.on.surfaceVariant,
});

export const name = style({
  font: fontValue.body.large,
  color: `${color.on.surfaceVariant}`,
});

export const value = style({
  font: fontValue.body.large,
  color: `${color.on.surface}`,
});

export const spacer = style({
  flex: "1 1 0",
});
