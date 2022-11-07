import { style } from "@vanilla-extract/css";

import { color, stateLayerOpacity, typography } from "@/styles/tokens";
import { stateLayerBase } from "@/styles/utils.css";

export const container = style({
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

export const containerActive = style([
  container,
  {
    backgroundColor: color.secondaryContainer,
  },
]);

export const stateLayer = style([
  stateLayerBase,
  {
    backgroundColor: color.on.surface,

    selectors: {
      [`${container}:hover > &`]: { opacity: stateLayerOpacity.hover },
      [`${container}:focus-visible > &`]: { opacity: stateLayerOpacity.focus },
      [`${container}:active > &`]: { opacity: stateLayerOpacity.active },
    },
  },
]);

export const stateLayerActive = style([
  stateLayerBase,
  {
    backgroundColor: color.on.secondaryContainer,

    selectors: {
      [`${containerActive}:hover > &`]: { opacity: stateLayerOpacity.hover },
      [`${containerActive}:focus-visible > &`]: { opacity: stateLayerOpacity.focus },
      [`${containerActive}:active > &`]: { opacity: stateLayerOpacity.active },
    },
  },
]);

export const icon = style({
  color: color.on.surfaceVariant,
  selectors: {
    [`${containerActive} > &`]: {
      color: color.on.secondaryContainer,
    },
  },
});

export const labelText = style([
  typography.label.large,
  {
    flex: "1 1 0",
    color: color.on.surfaceVariant,
    selectors: {
      [`${containerActive} > &`]: {
        color: color.on.secondaryContainer,
      },
    },
  },
]);

export const badgeLabelText = style([
  typography.label.large,
  {
    color: color.on.surfaceVariant,
  },
]);
