import { style } from "@vanilla-extract/css";

import { color } from "@/styles/tokens";

export const container = style({
  display: "flex",
  gap: 12,
  alignItems: "center",
  height: 56,
  padding: "0 12px",
  color: `rgb(${color.on.surface._})`,
});

export const name = style({
  flex: "1 1 0",
});
