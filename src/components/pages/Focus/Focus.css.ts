import { style } from "@vanilla-extract/css";

import { color } from "@/styles/tokens";

export const background = style({
  minHeight: "100vh",
  backgroundColor: `rgb(${color.background})`,
});

export const sideLayout = style({
  display: "flex",
});

export const main = style({
  flex: "1 1 0",
  margin: "8px 16px 0 16px",
});
