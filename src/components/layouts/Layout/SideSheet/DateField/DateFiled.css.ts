import { style } from "@vanilla-extract/css";

import { color, typography } from "@/styles/tokens";

export const container = style({
  display: "flex",
  gap: 16,
  alignItems: "center",
  height: 56,
  padding: "0 24px 0 16px",
  color: `rgb(${color.on.surfaceVariant})`,
});

export const name = style([
  {
    color: `${color.on.surfaceVariant}`,
  },
  typography.body.large,
]);

export const value = style([
  {
    color: `${color.on.surface}`,
  },
  typography.body.large,
]);

export const spacer = style({
  flex: "1 1 0",
});
