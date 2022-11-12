import { style } from "@vanilla-extract/css";

import { color, fontValue } from "@/styles/tokens";

export const container = style({
  display: "flex",
  gap: 4,
  alignItems: "center",
  height: 64,
  padding: "0 4px",
  backgroundColor: color.surface,
});

export const heading = style({
  font: fontValue.title.large,
  color: color.on.surface,
});

export const spacer = style({ flex: "1 1 0" });

export const space4 = style({ width: 8 });
