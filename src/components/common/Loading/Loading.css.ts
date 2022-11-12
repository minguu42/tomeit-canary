import { style } from "@vanilla-extract/css";

import { color, typography } from "@/styles/tokens";

export const background = style({
  display: "grid",
  placeItems: "center",
  height: "100vh",
  backgroundColor: color.background,
});

export const message = style({
  font: typography.title.large,
  color: color.on.background,
});
