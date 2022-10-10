import { style } from "@vanilla-extract/css";

import { state, color } from "@/styles/tokens";

export const container = style({
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 48,
  height: 48,
  color: `rgb(${color.on.surface.variant})`,
  backgroundColor: "transparent",

  selectors: {
    "&:disabled": {
      color: `rgb(${color.on.surface._} / ${state.content.disabled})`,
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
      backgroundColor: `rgb(${color.on.surface.variant} / ${state.layer.hover})`,
    },
    [`${container}:focus-visible > &`]: {
      backgroundColor: `rgb(${color.on.surface.variant} / ${state.layer.focus})`,
    },
    [`${container}:active > &`]: {
      backgroundColor: `rgb(${color.on.surface.variant} / ${state.layer.active})`,
    },
    [`${container}:disabled > &`]: { backgroundColor: "transparent" },
  },
});
