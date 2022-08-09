import { createGlobalTheme } from "@vanilla-extract/css";

// ステートレイヤートークン
// https://m3.material.io/foundations/interaction-states
export const stateLayerOpacity = createGlobalTheme(":root", {
  hover: "0.08",
  focus: "0.12",
  pressed: "0.12",
  dragged: "0.16",
});
