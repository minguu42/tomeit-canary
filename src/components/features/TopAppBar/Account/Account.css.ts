import { style } from "@vanilla-extract/css";

import {
  color,
  elevation,
  stateLayerOpacity,
  typography,
} from "@/styles/tokens";

export const layout = style({
  position: "relative",
});

export const container = style({
  position: "absolute",
  top: 56,
  right: 0,
  zIndex: 4,
  width: 132,
  borderRadius: 4,
  padding: "8px 0",
  backgroundColor: `rgb(${color.surface._})`,
  boxShadow: elevation.level2,
});

export const listItem = style({
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 12,
  height: 48,
  padding: "0 12px",
  backgroundColor: "transparent",
});

export const stateLayer = style({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  borderRadius: "inherit",
  selectors: {
    [`${listItem}:hover > &`]: {
      backgroundColor: `rgb(${color.on.surface._} / ${stateLayerOpacity.hover})`,
    },
    [`${listItem}:focus > &`]: {
      backgroundColor: `rgb(${color.on.surface._} / ${stateLayerOpacity.focus})`,
    },
    [`${listItem}:active > &`]: {
      backgroundColor: `rgb(${color.on.surface._} / ${stateLayerOpacity.pressed})`,
    },
  },
});

export const labelText = style([
  typography.label.large,
  { color: `rgb(${color.on.surface._})` },
]);

export const leadingIcon = style({ color: `rgb(${color.on.surface.variant})` });
