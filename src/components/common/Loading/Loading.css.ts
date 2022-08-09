import { style } from "@vanilla-extract/css";

import { color, typography } from "@/styles/tokens";

export const background = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  backgroundColor: color.background,
});

export const message = style([
  typography.title.large,
  { color: color.on.background },
]);
