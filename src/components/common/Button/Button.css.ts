import { style } from "@vanilla-extract/css";

import { color, elevation, state, typography } from "@/styles/tokens";

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

const stateLayerBase = style({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  borderRadius: "inherit",
  backgroundColor: "transparent",
});

export const stateLayerFilled = style([
  stateLayerBase,
  {
    selectors: {
      [`${containerFilled}:hover > &`]: {
        backgroundColor: `rgb(${color.on.primary} / ${state.layer.hover})`,
      },
      [`${containerFilled}:focus-visible > &`]: {
        backgroundColor: `rgb(${color.on.primary} / ${state.layer.focus})`,
      },
      [`${containerFilled}:active > &`]: {
        backgroundColor: `rgb(${color.on.primary} / ${state.layer.active})`,
      },
      [`${containerFilled}:disabled > &`]: { backgroundColor: "transparent" },
    },
  },
]);

export const stateLayerTonal = style([
  stateLayerBase,
  {
    selectors: {
      [`${containerTonal}:hover > &`]: {
        backgroundColor: `rgb(${color.on.secondaryContainer} / ${state.layer.hover})`,
      },
      [`${containerTonal}:focus-visible > &`]: {
        backgroundColor: `rgb(${color.on.secondaryContainer} / ${state.layer.focus})`,
      },
      [`${containerTonal}:active > &`]: {
        backgroundColor: `rgb(${color.on.secondaryContainer} / ${state.layer.active})`,
      },
      [`${containerTonal}:disabled > &`]: {
        backgroundColor: "transparent",
      },
    },
  },
]);
