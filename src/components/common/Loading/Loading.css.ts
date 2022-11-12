import { style } from "@vanilla-extract/css";

import { color, typography } from "@/styles/tokens";

export const background = style({
  display: "grid",
  placeItems: "center",
  height: "100vh",
  backgroundColor: color.background,
});

export const message = style({
  fontSize: typography.title.large.size,
  fontWeight: typography.title.large.weight,
  color: color.on.background,
});
