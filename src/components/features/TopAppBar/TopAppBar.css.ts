import { style } from "@vanilla-extract/css";

import { color, typography } from "@/styles/tokens";

export const container = style({
  display: "flex",
  gap: "4px",
  alignItems: "center",
  height: "64px",
  padding: "0 4px",
  backgroundColor: `rgb(${color.surface._})`,
});

export const headline = style([
  typography.title.large,
  { color: `rgb(${color.on.surface._})` },
]);

export const spacer = style({ flex: "1 1 0" });
