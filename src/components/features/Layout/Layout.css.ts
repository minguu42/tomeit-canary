import { style } from "@vanilla-extract/css";

import tokens from "@/styles/tokens.css";

export const background = style({
  minHeight: "100vh",
  backgroundColor: `rgb(${tokens.color.background})`,
});

export const sideLayout = style({
  display: "flex",
});

export const main = style({
  flex: "1 1 0",
});
