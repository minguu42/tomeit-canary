import { style } from "@vanilla-extract/css";

import { color, elevation, state, typography } from "@/styles/tokens";
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
    color: `rgb(${color.on.primary})`,
    backgroundColor: `rgb(${color.primary})`,

    ":hover": {
      boxShadow: elevation.level1,
    },
    ":disabled": {
      color: `rgb(${color.on.surface} / ${state.content.disabled})`,
      backgroundColor: `rgb(${color.on.surface} / ${state.container.disabled})`,
      boxShadow: "none",
    },
  },
]);

export const containerTonal = style([
  containerBase,
  {
    padding: "0 24px",
    color: `rgb(${color.on.secondaryContainer})`,
    backgroundColor: `rgb(${color.secondaryContainer})`,

    ":hover": {
      boxShadow: elevation.level1,
    },
    ":disabled": {
      color: `rgb(${color.on.surface} / ${state.content.disabled})`,
      backgroundColor: `rgb(${color.on.surface} / ${state.container.disabled})`,
      boxShadow: "none",
    },
  },
]);

export const stateLayerFilled = style([
  stateLayerBase,
  {
    backgroundColor: `rgb(${color.on.primary})`,

    selectors: {
      [`${containerFilled}:hover > &`]: { opacity: state.layer.hover },
      [`${containerFilled}:focus-visible > &`]: { opacity: state.layer.focus },
      [`${containerFilled}:active > &`]: { opacity: state.layer.active },
      [`${containerFilled}:disabled > &`]: { opacity: 0 },
    },
  },
]);

export const stateLayerTonal = style([
  stateLayerBase,
  {
    backgroundColor: `rgb(${color.on.secondaryContainer})`,

    selectors: {
      [`${containerTonal}:hover > &`]: { opacity: state.layer.hover },
      [`${containerTonal}:focus-visible > &`]: { opacity: state.layer.focus },
      [`${containerTonal}:active > &`]: { opacity: state.layer.active },
      [`${containerTonal}:disabled > &`]: { opacity: 0 },
    },
  },
]);
