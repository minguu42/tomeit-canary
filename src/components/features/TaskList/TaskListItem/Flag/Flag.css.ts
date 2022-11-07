import { style } from "@vanilla-extract/css";

import { color, typography } from "@/styles/tokens";

export const container = style([
  {
    display: "flex",
    alignItems: "center",
    color: color.on.surfaceVariant,
  },
  typography.body.medium,
]);
