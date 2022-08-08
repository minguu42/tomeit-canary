import { style } from "@vanilla-extract/css";

import tokens from "@/styles/tokens.css";

export const container = style({
  display: "flex",
  gap: "4px",
  alignItems: "center",
  height: "64px",
  padding: "0 4px",
  backgroundColor: `rgb(${tokens.color.surface._})`,
});

export const headline = style([
  tokens.typography.title.large,
  { color: `rgb(${tokens.color.on.surface._})` },
]);

export const spacer = style({ flex: "1 1 0" });
