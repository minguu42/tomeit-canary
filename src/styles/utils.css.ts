import { style } from "@vanilla-extract/css";

export const stateLayerBase = style({
  position: "absolute",
  opacity: 0,
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  borderRadius: "inherit",
});
