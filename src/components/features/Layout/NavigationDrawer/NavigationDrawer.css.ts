import { style, styleVariants } from "@vanilla-extract/css";

import tokens from "@/styles/tokens.css";

export const container = style({
  width: "360px",
  backgroundColor: `rgb(${tokens.color.surface._})`,
  borderRadius: "0 16px 16px 0",
  "@media": {
    "screen and (min-width: 0) and (max-width: 839px)": {
      position: "absolute",
      top: 0,
      left: 0,
      zIndex: 2,
      minHeight: "100vh",
    },
    "screen and (min-width: 840px)": {
      minHeight: "calc(100vh - 64px)",
    },
  },
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

export const scrim = style({
  "@media": {
    "screen and (min-width: 0) and (max-width: 839px)": {
      position: "absolute",
      top: 0,
      left: 0,
      zIndex: 1,
      width: "100%",
      height: "100%",
      backgroundColor: `rgb(50 47 55 / 0.4)`,
    },
    "screen and (min-width: 840px)": {
      display: "none",
    },
  },
});
