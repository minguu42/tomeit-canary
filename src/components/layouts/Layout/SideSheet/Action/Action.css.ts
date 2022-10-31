import { style } from "@vanilla-extract/css";

import { color, state, typography } from "@/styles/tokens";

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
    color: `rgb(${color.on.surfaceVariant})`,
    backgroundColor: `rgb(${color.surface})`,
  },
  typography.label.large,
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
      backgroundColor: `rgb(${color.on.surfaceVariant} / ${state.layer.hover})`,
    },
    [`${container}:focus-visible > &`]: {
      backgroundColor: `rgb(${color.on.surfaceVariant} / ${state.layer.focus})`,
    },
    [`${container}:active > &`]: {
      backgroundColor: `rgb(${color.on.surfaceVariant} / ${state.layer.active})`,
    },
  },
});
