import { style } from "@vanilla-extract/css";

import { state, color, elevation, typography } from "@/styles/tokens";

export const container = style({
  position: "relative",
  display: "flex",
  gap: 8,
  justifyContent: "center",
  alignItems: "center",
  height: "40px",
  borderRadius: "20px",
  padding: "0 24px 0 16px",
  backgroundColor: `rgb(${color.primary._})`,
  selectors: {
    "&:disabled": {
      backgroundColor: `rgb(${color.on.surface._} / 0.12)`,
    },
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
  borderRadius: "20px",
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
  },
});

export const icon = style({
  color: `rgb(${color.on.primary._})`,
  selectors: {
    [`${container}:disabled > &`]: {
      color: `rgb(${color.on.surface._} / ${state.content.disabled})`,
    },
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
