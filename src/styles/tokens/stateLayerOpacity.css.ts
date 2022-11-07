import { createGlobalTheme } from "@vanilla-extract/css";

export const stateLayerOpacity = createGlobalTheme(":root", {
  hover: "0.08",
  focus: "0.12",
  active: "0.12",
});
