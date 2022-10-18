import { style } from "@vanilla-extract/css";

import { color, typography } from "@/styles/tokens";

export const container = style({
  display: "flex",
  gap: 4,
  alignItems: "center",
  height: 56,
  borderBottom: `1px solid rgb(${color.outline})`,
  backgroundColor: `rgb(${color.surface._})`,
});

export const main = style({
  display: "flex",
  flexDirection: "column",
  gap: 4,
});

export const title = style([
  typography.body.large,
  {
    color: `rgb(${color.on.surface._})`,
  },
]);

export const flags = style([
  typography.body.small,
  {
    display: "flex",
    gap: 4,
    alignItems: "end",
    color: `rgb(${color.on.surface._})`,
  },
]);

export const flag = style({
  display: "flex",
  alignItems: "end",
});

export const actualCountFlag = style([
  flag,
  {
    color: `rgb(${color.primary._})`,
  },
]);

export const estimatedCountFlag = style([
  flag,
  {
    color: `rgb(${color.primary._} / 0.8)`,
  },
]);
