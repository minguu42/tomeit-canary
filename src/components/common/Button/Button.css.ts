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
    color: `rgb(${color.on.primary._})`,
    backgroundColor: `rgb(${color.primary._})`,

    ":hover": {
      boxShadow: elevation.level1,
    },
    ":disabled": {
      color: `rgb(${color.on.surface._} / ${state.content.disabled})`,
      backgroundColor: `rgb(${color.on.surface._} / ${state.container.disabled})`,
      boxShadow: "none",
    },
  },
]);

export const containerTonal = style([
  containerBase,
  {
    padding: "0 24px",
    color: `rgb(${color.on.secondary.container})`,
    backgroundColor: `rgb(${color.secondary.container})`,

    ":hover": {
      boxShadow: elevation.level1,
    },
    ":disabled": {
      color: `rgb(${color.on.surface._} / ${state.content.disabled})`,
      backgroundColor: `rgb(${color.on.surface._} / ${state.container.disabled})`,
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
        backgroundColor: `rgb(${color.on.primary._} / ${state.layer.hover})`,
      },
      [`${containerFilled}:focus-visible > &`]: {
        backgroundColor: `rgb(${color.on.primary._} / ${state.layer.focus})`,
      },
      [`${containerFilled}:active > &`]: {
        backgroundColor: `rgb(${color.on.primary._} / ${state.layer.active})`,
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
        backgroundColor: `rgb(${color.on.secondary.container} / ${state.layer.hover})`,
      },
      [`${containerTonal}:focus-visible > &`]: {
        backgroundColor: `rgb(${color.on.secondary.container} / ${state.layer.focus})`,
      },
      [`${containerTonal}:active > &`]: {
        backgroundColor: `rgb(${color.on.secondary.container} / ${state.layer.active})`,
      },
      [`${containerTonal}:disabled > &`]: {
        backgroundColor: "transparent",
      },
    },
  },
]);
