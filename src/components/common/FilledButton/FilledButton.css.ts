import { style } from "@vanilla-extract/css";

import { state, color, elevation, typography } from "@/styles/tokens";

export const container = style({
  position: "relative",
  display: "flex",
  gap: 8,
  alignItems: "center",
  justifyContent: "center",
  height: 40,
  borderRadius: 20,
  padding: "0 24px 0 16px",
  color: `rgb(${color.on.primary._})`,
  backgroundColor: `rgb(${color.primary._})`,
  selectors: {
    "&:hover": {
      boxShadow: elevation.level1,
    },
    "&:disabled": {
      color: `rgb(${color.on.surface._} / ${state.content.disabled})`,
      backgroundColor: `rgb(${color.on.surface._} / ${state.container.disabled})`,
      boxShadow: "none",
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
      backgroundColor: `rgb(${color.on.primary._} / ${state.layer.hover})`,
    },
    [`${container}:focus-visible > &`]: {
      backgroundColor: `rgb(${color.on.primary._} / ${state.layer.focus})`,
    },
    [`${container}:active > &`]: {
      backgroundColor: `rgb(${color.on.primary._} / ${state.layer.active})`,
    },
    [`${container}:disabled > &`]: { backgroundColor: "transparent" },
  },
});

export const labelText = style([
  typography.label.large,
  {
    color: `rgb(${color.on.primary._})`,
    selectors: {
      [`${container}:disabled > &`]: {
        color: `rgb(${color.on.surface._} / ${state.content.disabled})`,
      },
    },
  },
]);
