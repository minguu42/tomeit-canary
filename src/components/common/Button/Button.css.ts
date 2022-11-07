import { style } from "@vanilla-extract/css";

import { color, elevation, stateLayerOpacity, typography } from "@/styles/tokens";
import { stateLayerBase } from "@/styles/utils.css";

const containerBase = style([
  {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    borderRadius: 20,
  },
  typography.label.large,
]);

export const containerFilled = style([
  containerBase,
  {
    padding: "0 24px",
    color: color.on.primary,
    backgroundColor: color.primary,

    ":hover": {
      boxShadow: elevation.level1,
    },
    ":disabled": {
      color: color.on.disabled,
      backgroundColor: color.disabled,
      boxShadow: "none",
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
      boxShadow: elevation.level1,
    },
    ":disabled": {
      color: color.on.disabled,
      backgroundColor: color.disabled,
      boxShadow: "none",
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
