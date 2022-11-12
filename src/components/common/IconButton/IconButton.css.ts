import { style } from "@vanilla-extract/css";

import { stateLayerOpacity, color } from "@/styles/tokens";
import { stateLayerBase } from "@/styles/utils.css";

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
  color: color.on.surfaceVariant,
  selectors: {
    [`${container}:disabled > &`]: { color: color.on.disabled },
  },
});

export const stateLayer = style([
  stateLayerBase,
  {
    backgroundColor: color.on.surfaceVariant,
    selectors: {
      [`${container}:hover &`]: { opacity: stateLayerOpacity.hover },
      [`${container}:focus-visible &`]: { opacity: stateLayerOpacity.focus },
      [`${container}:active &`]: { opacity: stateLayerOpacity.active },
      [`${container}:disabled &`]: { opacity: 0 },
    },
  },
]);
