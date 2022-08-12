import { style } from "@vanilla-extract/css";

import { color } from "@/styles/tokens";

export const background = style({
  minHeight: "100vh",
  backgroundColor: `rgb(${color.background})`,
});

export const sideLayout = style({
  display: "flex",
});

export const body = style({
  flex: "1 1 0",
  margin: "0 4px",
});
