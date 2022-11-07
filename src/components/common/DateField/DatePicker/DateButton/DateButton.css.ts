import { style } from "@vanilla-extract/css";

import { color, stateLayerOpacity, typography } from "@/styles/tokens";
import { stateLayerBase } from "@/styles/utils.css";

export const container = style([
  {
    position: "relative",
    display: "grid",
    placeItems: "center",
    width: 40,
    height: 40,
    borderRadius: "50%",
    color: color.on.surface,
    backgroundColor: "transparent",
  },
  typography.body.large,
]);

export const stateLayer = style([
  stateLayerBase,
  {
    backgroundColor: color.on.surfaceVariant,

    selectors: {
      [`${container}:hover > &`]: { opacity: stateLayerOpacity.hover },
      [`${container}:focus-visible > &`]: { opacity: stateLayerOpacity.focus },
      [`${container}:active > &`]: { opacity: stateLayerOpacity.active },
    },
  },
]);
