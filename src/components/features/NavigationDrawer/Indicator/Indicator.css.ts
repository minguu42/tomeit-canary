import { style, styleVariants } from "@vanilla-extract/css";
import { color, state, typography } from "@/styles/tokens";

const indicatorBase = style({
  position: "relative",
  display: "flex",
  gap: 12,
  alignItems: "center",
  margin: "0 12px",
  padding: "0 24px 0 16px",
  width: 336,
  height: 56,
  borderRadius: 28,
});

export const indicator = styleVariants({
  _: [indicatorBase],
  active: [
    indicatorBase,
    { backgroundColor: `rgb(${color.secondary.container})` },
  ],
});

export const stateLayer = style({
  position: "absolute",
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  borderRadius: "28px",
  selectors: {
    [`${indicator._}:hover > &`]: {
      backgroundColor: `rgb(${color.on.surface._} / ${state.layer.hover})`,
    },
    [`${indicator._}:focus-visible > &`]: {
      backgroundColor: `rgb(${color.on.surface._} / ${state.layer.focus})`,
    },
    [`${indicator._}:active > &`]: {
      backgroundColor: `rgb(${color.on.surface._} / ${state.layer.active})`,
    },
    [`${indicator.active}:hover > &`]: {
      backgroundColor: `rgb(${color.on.secondary.container} / ${state.layer.hover})`,
    },
    [`${indicator.active}:focus-visible > &`]: {
      backgroundColor: `rgb(${color.on.secondary.container} / ${state.layer.focus})`,
    },
    [`${indicator.active}:active > &`]: {
      backgroundColor: `rgb(${color.on.secondary.container} / ${state.layer.active})`,
    },
  },
});

export const icon = style({
  color: `rgb(${color.on.surface.variant})`,
  selectors: {
    [`${indicator.active} > &`]: {
      color: `rgb(${color.on.secondary.container})`,
    },
  },
});

export const labelText = style([
  typography.label.large,
  {
    flex: "1 1 0",
    color: `rgb(${color.on.surface.variant})`,
    selectors: {
      [`${indicator.active} > &`]: {
        color: `rgb(${color.on.secondary.container})`,
      },
    },
  },
]);

export const badgeLabelText = style([
  typography.label.large,
  {
    color: `rgb(${color.on.surface.variant})`,
  },
]);
