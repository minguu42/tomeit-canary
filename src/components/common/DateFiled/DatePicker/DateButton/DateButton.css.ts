import { style } from "@vanilla-extract/css";

import { color, state, typography } from "@/styles/tokens";

export const container = style([
  {
    position: "relative",
    display: "grid",
    placeItems: "center",
    width: 40,
    height: 40,
    color: `rgb(${color.on.surface})`,
    backgroundColor: "transparent",
  },
  typography.body.large,
]);

export const stateLayer = style({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  borderRadius: "50%",

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
