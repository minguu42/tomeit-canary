import { style } from "@vanilla-extract/css";

import tokens from "@/styles/tokens.css";

export const container = style({
  position: "relative",
  display: "flex",
  gap: 8,
  justifyContent: "center",
  alignItems: "center",
  height: "40px",
  borderRadius: "20px",
  padding: "0 24px 0 16px",
  backgroundColor: `rgb(${tokens.color.primary._})`,
  selectors: {
    "&:disabled": {
      backgroundColor: `rgb(${tokens.color.on.surface._} / 0.12)`,
    },
    "&:hover": {
      boxShadow: tokens.elevation.level1,
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
      backgroundColor: `rgb(${tokens.color.on.primary._} / ${tokens.stateLayerOpacity.hover})`,
    },
    [`${container}:focus > &`]: {
      backgroundColor: `rgb(${tokens.color.on.primary._} / ${tokens.stateLayerOpacity.focus})`,
    },
    [`${container}:active > &`]: {
      backgroundColor: `rgb(${tokens.color.on.primary._} / ${tokens.stateLayerOpacity.pressed})`,
    },
  },
});

export const icon = style({
  color: `rgb(${tokens.color.on.primary._})`,
  selectors: {
    [`${container}:disabled > &`]: {
      color: `rgb(${tokens.color.on.surface._} / 0.38)`,
    },
  },
});

export const labelText = style([
  tokens.typography.label.large,
  {
    color: `rgb(${tokens.color.on.primary._})`,
    selectors: {
      [`${container}:disabled > &`]: {
        color: `rgb(${tokens.color.on.surface._} / 0.38)`,
      },
    },
  },
]);
