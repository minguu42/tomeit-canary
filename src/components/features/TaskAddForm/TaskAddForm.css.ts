import { style } from "@vanilla-extract/css";

import { color } from "@/styles/tokens";

export const sub = style({
  display: "flex",
  alignItems: "center",
  height: 56,
  paddingRight: 16,
  borderRadius: "0 0 4px 4px",
  backgroundColor: color.surfaceVariant,
});

export const spacer = style({ flex: "1 1 0" });
