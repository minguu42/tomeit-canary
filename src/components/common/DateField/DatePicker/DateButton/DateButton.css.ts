import { style } from "@vanilla-extract/css";

import { color, state, typography } from "@/styles/tokens";
import { stateLayerBase } from "@/styles/utils.css";

export const container = style([
  {
    position: "relative",
    display: "grid",
    placeItems: "center",
    width: 40,
    height: 40,
    borderRadius: "50%",
    color: `rgb(${color.on.surface})`,
    backgroundColor: "transparent",
  },
  typography.body.large,
]);

export const stateLayer = style([
  stateLayerBase,
  {
    backgroundColor: `rgb(${color.on.surfaceVariant})`,

    selectors: {
      [`${container}:hover > &`]: { opacity: state.layer.hover },
      [`${container}:focus-visible > &`]: { opacity: state.layer.focus },
      [`${container}:active > &`]: { opacity: state.layer.active },
    },
  },
]);
