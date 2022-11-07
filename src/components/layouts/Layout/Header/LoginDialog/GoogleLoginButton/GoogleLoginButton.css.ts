import { style } from "@vanilla-extract/css";

import { color, elevation, stateLayerOpacity } from "@/styles/tokens";
import { stateLayerBase } from "@/styles/utils.css";

export const container = style({
  position: "relative",
  display: "flex",
  gap: "12px",
  alignItems: "center",
  paddingRight: "8px",
  fontSize: "0.875rem",
  fontWeight: 600,
  color: color.on.surface,
  backgroundColor: color.surface,
  border: `1px solid ${color.outline}`,
  borderRadius: "2px",
  boxShadow: elevation.level1,
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
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 32,
  height: 32,
  backgroundColor: "#fff",
  border: "1px solid #fff",
  borderRadius: 2,
});
