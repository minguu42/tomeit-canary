import { style } from "@vanilla-extract/css";

import { color, elevation, stateLayerOpacity, typography } from "@/styles/tokens";
import { stateLayerBase } from "@/styles/utils.css";

const containerBase = style({
  position: "relative",
  display: "grid",
  placeItems: "center",
  height: 40,
  borderRadius: 20,
  fontSize: typography.label.large.size,
  fontWeight: typography.label.large.weight,
});

export const containerFilled = style([
  containerBase,
  {
    padding: "0 24px",
    color: color.on.primary,
    backgroundColor: color.primary,
    ":hover": {
      zIndex: 1,
      boxShadow: elevation.level1,
    },
    ":disabled": {
      zIndex: "initial",
      boxShadow: "none",
      color: color.on.disabled,
      backgroundColor: color.disabled,
    },
  },
]);

export const containerTonal = style([
  containerBase,
  {
    padding: "0 24px",
    color: color.on.secondaryContainer,
    backgroundColor: color.secondaryContainer,
    ":hover": {
      zIndex: 1,
      boxShadow: elevation.level1,
    },
    ":disabled": {
      zIndex: "initial",
      boxShadow: "none",
      color: color.on.disabled,
      backgroundColor: color.disabled,
    },
  },
]);

export const stateLayerFilled = style([
  stateLayerBase,
  {
    backgroundColor: color.on.primary,
    selectors: {
      [`${containerFilled}:hover > &`]: { opacity: stateLayerOpacity.hover },
      [`${containerFilled}:focus-visible > &`]: { opacity: stateLayerOpacity.focus },
      [`${containerFilled}:active > &`]: { opacity: stateLayerOpacity.active },
      [`${containerFilled}:disabled > &`]: { opacity: 0 },
    },
  },
]);

export const stateLayerTonal = style([
  stateLayerBase,
  {
    backgroundColor: color.on.secondaryContainer,
    selectors: {
      [`${containerTonal}:hover > &`]: { opacity: stateLayerOpacity.hover },
      [`${containerTonal}:focus-visible > &`]: { opacity: stateLayerOpacity.focus },
      [`${containerTonal}:active > &`]: { opacity: stateLayerOpacity.active },
      [`${containerTonal}:disabled > &`]: { opacity: 0 },
    },
  },
]);
