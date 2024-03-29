import { style } from "@vanilla-extract/css";

import { color, typography, stateLayerOpacity } from "@/styles/tokens";
import { stateLayerBase } from "@/styles/utils.css";

export const container = style({
  position: "relative",
  display: "flex",
  gap: 12,
  alignItems: "center",
  width: 336,
  height: 56,
  padding: "0 24px 0 16px",
  margin: "0 12px",
  borderRadius: 28,
});

export const containerActive = style([
  container,
  {
    backgroundColor: color.primaryContainer,
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
    backgroundColor: color.on.primaryContainer,
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
      color: color.on.primaryContainer,
    },
  },
});

export const labelText = style({
  flex: "1 1 0",
  fontSize: typography.label.large.size,
  fontWeight: typography.label.large.weight,
  color: color.on.surfaceVariant,
  selectors: {
    [`${containerActive} > &`]: {
      color: color.on.primaryContainer,
    },
  },
});

export const badgeLabelText = style({
  fontSize: typography.label.large.size,
  fontWeight: typography.label.large.weight,
  color: color.on.surfaceVariant,
});
