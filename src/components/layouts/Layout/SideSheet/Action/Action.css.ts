import { style } from "@vanilla-extract/css";

import { color, state, typography } from "@/styles/tokens";
import { stateLayerBase } from "@/styles/utils.css";

export const container = style([
  {
    position: "relative",
    display: "flex",
    gap: 12,
    alignItems: "center",
    width: 384,
    height: 56,
    padding: "0 16px",
    borderRadius: 28,
    color: color.on.surfaceVariant,
    backgroundColor: color.surface,
  },
  typography.label.large,
]);

export const stateLayer = style([
  stateLayerBase,
  {
    backgroundColor: color.on.surfaceVariant,

    selectors: {
      [`${container}:hover > &`]: { opacity: state.layer.hover },
      [`${container}:focus-visible > &`]: { opacity: state.layer.focus },
      [`${container}:active > &`]: { opacity: state.layer.active },
    },
  },
]);
