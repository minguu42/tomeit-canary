import { style } from "@vanilla-extract/css";

import { color } from "@/styles/tokens";

export const container = style({
  position: "relative",
  display: "flex",
  alignItems: "center",
  height: 56,
  color: `rgb(${color.on.surfaceVariant})`,
});
