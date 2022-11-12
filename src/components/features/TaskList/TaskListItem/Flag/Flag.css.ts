import { style } from "@vanilla-extract/css";

import { color, typography } from "@/styles/tokens";

export const container = style({
  display: "flex",
  alignItems: "center",
  fontSize: typography.body.medium.size,
  fontWeight: typography.body.medium.weight,
  color: color.on.surfaceVariant,
});
