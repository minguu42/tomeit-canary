import { style } from "@vanilla-extract/css";

import { color, typography } from "@/styles/tokens";

export const container = style({
  flex: "1 1 0",
});

export const textbox = style([
  {
    height: 48,
    width: "100%",
    border: "0",
    paddingLeft: 4,
    color: `${color.on.surface}`,
    backgroundColor: "transparent",
  },
  typography.title.large,
]);
