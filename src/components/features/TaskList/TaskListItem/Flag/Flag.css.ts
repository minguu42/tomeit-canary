import { style } from "@vanilla-extract/css";

import { color, fontValue } from "@/styles/tokens";

export const container = style({
  display: "flex",
  alignItems: "center",
  font: fontValue.body.medium,
  color: color.on.surfaceVariant,
});
