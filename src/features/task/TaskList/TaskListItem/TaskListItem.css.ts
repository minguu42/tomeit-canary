import { style } from "@vanilla-extract/css";

import { color, typography, stateLayerOpacity } from "@/styles/tokens.css";
import { stateLayerBase } from "@/styles/utils.css";

export const container = style({
  position: "relative",
  height: 56,
  backgroundColor: color.surface,
});

export const main = style({
  position: "absolute",
  top: 0,
  left: 0,
  flex: "1 1 0",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  width: "100%",
  height: "100%",
  padding: "0 76px 0 56px",
  backgroundColor: "transparent",
});

export const mainCompleted = style([
  main,
  {
    textDecoration: `line-through ${color.on.surface}`,
  },
]);

export const stateLayer = style([
  stateLayerBase,
  {
    backgroundColor: color.on.surface,

    selectors: {
      [`${main}:hover > &`]: { opacity: stateLayerOpacity.hover },
      [`${main}:focus-visible > &`]: { opacity: stateLayerOpacity.focus },
      [`${main}:active > &`]: { opacity: stateLayerOpacity.active },
    },
  },
]);

export const leftIconLayout = style({
  position: "absolute",
  top: 4,
  left: 4,
});

export const rightIconLayout = style({
  position: "absolute",
  top: 4,
  right: 24,
});

export const heading = style({
  fontSize: typography.body.large.size,
  fontWeight: typography.body.large.weight,
  color: color.on.surface,
});

export const flags = style({
  display: "flex",
  gap: 8,
  alignItems: "center",
});
