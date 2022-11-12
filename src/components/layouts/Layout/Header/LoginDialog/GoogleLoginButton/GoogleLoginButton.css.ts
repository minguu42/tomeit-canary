import { style } from "@vanilla-extract/css";

import { color, elevation, stateLayerOpacity } from "@/styles/tokens";
import { stateLayerBase } from "@/styles/utils.css";

export const container = style({
  position: "relative",
  display: "flex",
  gap: "12px",
  alignItems: "center",
  paddingRight: "8px",
  border: `1px solid ${color.outline}`,
  borderRadius: "2px",
  boxShadow: elevation.level1,
  fontSize: "0.875rem",
  fontWeight: 600,
  color: color.on.surface,
  backgroundColor: color.surface,
});

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

export const logoBackground = style({
  display: "grid",
  placeItems: "center",
  width: 32,
  height: 32,
  border: "1px solid #fff",
  borderRadius: 2,
  backgroundColor: "#fff",
});
