import { style } from "@vanilla-extract/css";
import { color, elevation, state, typography } from "@/styles/tokens";

export const container = style({
  position: "relative",
  display: "flex",
  alignItems: "center",
  height: 40,
  borderRadius: 20,
  padding: "0 24px",
  backgroundColor: `rgb(${color.secondary.container})`,
  selectors: {
    "&:hover": {
      boxShadow: elevation.level1,
    },
  },
});

export const stateLayer = style({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  borderRadius: "inherit",
  selectors: {
    [`${container}:hover > &`]: {
      backgroundColor: `rgb(${color.on.secondary.container} / ${state.layer.hover})`,
    },
    [`${container}:focus-visible > &`]: {
      backgroundColor: `rgb(${color.on.secondary.container} / ${state.layer.focus})`,
    },
    [`${container}:active > &`]: {
      backgroundColor: `rgb(${color.on.secondary.container} / ${state.layer.active})`,
    },
  },
});

export const labelText = style([
  typography.label.large,
  {
    color: `rgb(${color.on.secondary.container})`,
  },
]);
