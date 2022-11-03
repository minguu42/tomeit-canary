import { style } from "@vanilla-extract/css";

import { color, state } from "@/styles/tokens";

export const container = style({
  display: "grid",
  placeItems: "center",
  width: 48,
  height: 48,
  backgroundColor: "transparent",
});

export const outline = style({
  position: "relative",
  display: "grid",
  placeItems: "center",
  width: 40,
  height: 40,
  borderRadius: "50%",
  color: `rgb(${color.on.surfaceVariant})`,
});

export const stateLayer = style({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  borderRadius: "inherit",

  selectors: {
    [`${container}:hover &`]: {
      backgroundColor: `rgb(${color.on.surfaceVariant} / ${state.layer.hover})`,
    },
    [`${container}:focus-visible &`]: {
      backgroundColor: `rgb(${color.on.surfaceVariant} / ${state.layer.focus})`,
    },
    [`${container}:active &`]: {
      backgroundColor: `rgb(${color.on.surfaceVariant} / ${state.layer.active})`,
    },
  },
});
