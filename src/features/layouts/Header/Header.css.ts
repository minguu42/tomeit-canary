import { style } from "@vanilla-extract/css";

import { color } from "@/styles/tokens.css";

export const container = style({
  display: "flex",
  gap: 4,
  alignItems: "center",
  height: 64,
  padding: "0 8px",
  backgroundColor: color.surface,
});

export const spacer = style({ flex: "1 1 0" });
