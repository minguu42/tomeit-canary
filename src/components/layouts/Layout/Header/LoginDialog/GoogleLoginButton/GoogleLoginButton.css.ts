import { style } from "@vanilla-extract/css";

import { color, elevation, state } from "@/styles/tokens";
import { stateLayerBase } from "@/styles/utils.css";

export const container = style({
  position: "relative",
  display: "flex",
  gap: "12px",
  alignItems: "center",
  paddingRight: "8px",
  fontSize: "0.875rem",
  fontWeight: 600,
  color: `rgb(${color.on.surface})`,
  backgroundColor: `rgb(${color.surface})`,
  border: `1px solid rgb(${color.outline})`,
  borderRadius: "2px",
  boxShadow: elevation.level1,
});

export const stateLayer = style([
  stateLayerBase,
  {
    backgroundColor: `rgb(${color.on.surface})`,

    selectors: {
      [`${container}:hover > &`]: { opacity: state.layer.hover },
      [`${container}:focus-visible > &`]: { opacity: state.layer.focus },
      [`${container}:active > &`]: { opacity: state.layer.active },
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
