import { style } from "@vanilla-extract/css";

import { color, typography, stateLayerOpacity } from "@/styles/tokens";
import { stateLayerBase } from "@/styles/utils.css";

export const container = style({
  position: "relative",
  display: "flex",
  gap: 12,
  alignItems: "center",
  width: 384,
  height: 56,
  padding: "0 16px",
  borderRadius: 28,
  fontSize: typography.label.large.size,
  fontWeight: typography.label.large.weight,
  color: color.on.surfaceVariant,
  backgroundColor: color.surface,
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
