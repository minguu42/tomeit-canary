import { style } from "@vanilla-extract/css";

import { color, elevation, state } from "@/styles/tokens";

export const container = style({
  position: "relative",
  display: "flex",
  gap: "12px",
  alignItems: "center",
  paddingRight: "8px",
  fontSize: "0.875rem",
  fontWeight: 600,
  color: `rgb(${color.on.surface._})`,
  backgroundColor: `rgb(${color.surface._})`,
  border: `1px solid rgb(${color.outline})`,
  borderRadius: "2px",
  boxShadow: elevation.level1,
});

export const stateLayer = style({
  position: "absolute",
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  zIndex: 1,
  borderRadius: "inherit",
  selectors: {
    [`${container}:hover > &`]: {
      backgroundColor: `rgb(${color.on.surface._} / ${state.layer.hover})`,
    },
    [`${container}:focus-visible > &`]: {
      backgroundColor: `rgb(${color.on.surface._} / ${state.layer.focus})`,
    },
    [`${container}:active > &`]: {
      backgroundColor: `rgb(${color.on.surface._} / ${state.layer.active})`,
    },
  },
});

export const logoBackground = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 32,
  height: 32,
  backgroundColor: "#fff",
  border: "1px solid #fff",
  borderRadius: 2,
});
