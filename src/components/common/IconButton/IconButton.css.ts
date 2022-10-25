import { style } from "@vanilla-extract/css";

import { state, color } from "@/styles/tokens";

export const container = style({
  position: "relative",
  display: "grid",
  placeItems: "center",
  width: 48,
  height: 48,
  color: `rgb(${color.on.surfaceVariant})`,
  backgroundColor: "transparent",

  selectors: {
    "&:disabled": {
      color: `rgb(${color.on.surface} / ${state.content.disabled})`,
    },
  },
});

export const stateLayer = style({
  position: "absolute",
  top: 4,
  left: 4,
  width: 40,
  height: 40,
  borderRadius: "50%",

  selectors: {
    [`${container}:hover > &`]: {
      backgroundColor: `rgb(${color.on.surfaceVariant} / ${state.layer.hover})`,
    },
    [`${container}:focus-visible > &`]: {
      backgroundColor: `rgb(${color.on.surfaceVariant} / ${state.layer.focus})`,
    },
    [`${container}:active > &`]: {
      backgroundColor: `rgb(${color.on.surfaceVariant} / ${state.layer.active})`,
    },
    [`${container}:disabled > &`]: { backgroundColor: "transparent" },
  },
});
