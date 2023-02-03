import { style } from "@vanilla-extract/css";

import { color } from "@/styles/tokens.css";

export const background = style({
  minHeight: "100dvh",
  backgroundColor: color.background,
});
