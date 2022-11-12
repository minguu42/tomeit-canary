import { style } from "@vanilla-extract/css";

import { color } from "@/styles/tokens";

export const container = style({
  width: 400,
  borderRadius: "16px 0 0 16px",
  backgroundColor: color.surface,
  "@media": {
    "screen and (min-width: 840px)": {
      minHeight: "calc(100vh - 64px)",
    },
  },
});

export const header = style({
  display: "flex",
  alignItems: "center",
  height: 56,
  padding: "0 4px",
});
