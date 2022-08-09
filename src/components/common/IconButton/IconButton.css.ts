import { style } from "@vanilla-extract/css";

import { stateLayerOpacity, color } from "@/styles/tokens";

export const container = style({
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "48px",
  height: "48px",
  color: `rgb(${color.on.surface.variant})`,
  backgroundColor: "transparent",

  selectors: {
    "&:disabled": {
      color: `rgb(${color.on.surface._} / 38%)`,
    },
  },
});

export const stateLayer = style({
  position: "absolute",
  top: "4px",
  right: "4px",
  bottom: "4px",
  left: "4px",
  width: "40px",
  height: "40px",
  borderRadius: "50%",

  selectors: {
    [`${container}:hover > &`]: {
      backgroundColor: `rgb(${color.on.surface.variant} / ${stateLayerOpacity.hover})`,
    },
    [`${container}:focus > &`]: {
      backgroundColor: `rgb(${color.on.surface.variant} / ${stateLayerOpacity.focus})`,
    },
    [`${container}:active > &`]: {
      backgroundColor: `rgb(${color.on.surface.variant} / ${stateLayerOpacity.pressed})`,
    },
  },
});
