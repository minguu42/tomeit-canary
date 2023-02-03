import { style } from "@vanilla-extract/css";

import { color, typography, stateLayerOpacity } from "@/styles/tokens.css";
import { stateLayerBase } from "@/styles/utils.css";

export const container = style({
  position: "relative",
  display: "grid",
  placeItems: "center",
  width: 40,
  height: 40,
  borderRadius: "50%",
  fontSize: typography.label.large.size,
  fontWeight: typography.label.large.weight,
  color: color.on.surface,
  backgroundColor: "transparent",
});

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
