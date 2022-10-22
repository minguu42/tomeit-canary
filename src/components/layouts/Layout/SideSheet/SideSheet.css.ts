import { style } from "@vanilla-extract/css";

import { color, typography } from "@/styles/tokens";

export const container = style({
  width: 400,
  backgroundColor: `rgb(${color.surface._})`,
  borderRadius: "16px 0 0 16px",
  "@media": {
    "screen and (min-width: 840px)": {
      minHeight: "calc(100vh - 64px)",
    },
  },
});

export const name = style([
  typography.title.small,
  {
    display: "flex",
    alignItems: "center",
    color: `rgb(${color.on.surface._})`,
  },
]);

export const divider = style({
  border: `1px solid rgb(${color.outline})`,
});
