import { style } from "@vanilla-extract/css";

import { color, state, typography } from "@/styles/tokens";

export const container = style([
  typography.label.large,
  {
    position: "relative",
    display: "flex",
    gap: 12,
    alignItems: "center",
    width: 336,
    height: 56,
    padding: "0 12px",
    color: `rgb(${color.on.surface.variant})`,
    backgroundColor: `rgb(${color.surface._})`,
  },
]);

export const stateLayer = style({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  borderRadius: "inherit",
  backgroundColor: "transparent",

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
  },
});
