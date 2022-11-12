import { style } from "@vanilla-extract/css";

import { color, typography } from "@/styles/tokens";

export const container = style({
  display: "flex",
  gap: 4,
  alignItems: "center",
  height: 64,
  padding: "0 4px",
  backgroundColor: color.surface,
});

export const heading = style({
  fontSize: typography.title.large.size,
  fontWeight: typography.title.large.weight,
  color: color.on.surface,
});

export const spacer = style({ flex: "1 1 0" });

export const space4 = style({ width: 8 });
