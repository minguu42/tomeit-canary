import { style, styleVariants } from "@vanilla-extract/css";

import tokens from "@/styles/tokens.css";

export const scrim = style({
  zIndex: 1,
});

export const container = style({
  backgroundColor: `rgb(${tokens.color.surface._})`,
  zIndex: 2,
  width: "360px",
  minHeight: "100vh",
  borderRadius: "0 16px 16px 0",
});

export const indicatorBase = style({
  position: "relative",
  display: "flex",
  gap: "12px",
  alignItems: "center",
  margin: "0 12px",
  padding: "0 24px 0 16px",
  width: "336px",
  height: "56px",
  borderRadius: "28px",
});

export const indicator = styleVariants({
  _: [indicatorBase],
  active: [
    indicatorBase,
    { backgroundColor: `rgb(${tokens.color.secondary.container})` },
  ],
});

export const stateLayer = style({
  position: "absolute",
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  width: "336px",
  height: "56px",
  borderRadius: "28px",
  selectors: {
    [`${indicator._}:hover > &`]: {
      backgroundColor: `rgb(${tokens.color.on.surface._} / ${tokens.stateLayerOpacity.hover})`,
    },
    [`${indicator._}:focus > &`]: {
      backgroundColor: `rgb(${tokens.color.on.surface._} / ${tokens.stateLayerOpacity.focus})`,
    },
    [`${indicator._}:active > &`]: {
      backgroundColor: `rgb(${tokens.color.on.surface._} / ${tokens.stateLayerOpacity.pressed})`,
    },
    [`${indicator.active}:hover > &`]: {
      backgroundColor: `rgb(${tokens.color.on.secondary.container} / ${tokens.stateLayerOpacity.hover})`,
    },
    [`${indicator.active}:focus > &`]: {
      backgroundColor: `rgb(${tokens.color.on.secondary.container} / ${tokens.stateLayerOpacity.focus})`,
    },
    [`${indicator.active}:active > &`]: {
      backgroundColor: `rgb(${tokens.color.on.secondary.container} / ${tokens.stateLayerOpacity.pressed})`,
    },
  },
});

export const icon = style({
  color: `rgb(${tokens.color.on.surface.variant})`,
  selectors: {
    [`${indicator.active} > &`]: {
      color: `rgb(${tokens.color.on.secondary.container})`,
    },
  },
});

export const labelText = style([
  tokens.typography.label.large,
  {
    flex: "1 1 0",
    color: `rgb(${tokens.color.on.surface.variant})`,
    selectors: {
      [`${indicator.active} > &`]: {
        color: `rgb(${tokens.color.on.secondary.container})`,
      },
    },
  },
]);

export const badgeLabelText = style([
  tokens.typography.label.large,
  {
    color: `rgb(${tokens.color.on.surface.variant})`,
  },
]);

export const divider = style({
  margin: "0 28px",
  border: `1px solid rgb(${tokens.color.outline})`,
});
