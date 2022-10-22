import { style } from "@vanilla-extract/css";

import { color } from "@/styles/tokens";

export const container = style({
  width: "360px",
  backgroundColor: `rgb(${color.surface._})`,
  borderRadius: "0 16px 16px 0",
  "@media": {
    "screen and (min-width: 0) and (max-width: 839px)": {
      position: "absolute",
      top: 0,
      left: 0,
      zIndex: 2,
      minHeight: "100vh",
    },
    "screen and (min-width: 840px)": {
      minHeight: "calc(100vh - 64px)",
    },
  },
});

export const divider = style({
  margin: "0 28px",
  border: `1px solid rgb(${color.outline})`,
});

export const scrim = style({
  "@media": {
    "screen and (min-width: 0) and (max-width: 839px)": {
      position: "absolute",
      top: 0,
      left: 0,
      zIndex: 1,
      width: "100%",
      height: "100%",
      backgroundColor: "rgb(50 47 55 / 0.4)",
    },
    "screen and (min-width: 840px)": {
      display: "none",
    },
  },
});
