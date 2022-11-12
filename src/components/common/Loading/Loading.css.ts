import { style } from "@vanilla-extract/css";

import { color, fontValue } from "@/styles/tokens";

export const background = style({
  display: "grid",
  placeItems: "center",
  height: "100vh",
  backgroundColor: color.background,
});

export const message = style({
  font: fontValue.title.large,
  color: color.on.background,
});
