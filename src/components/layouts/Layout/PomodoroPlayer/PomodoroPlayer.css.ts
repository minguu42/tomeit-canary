import { style } from "@vanilla-extract/css";

import { color } from "@/styles/tokens";

export const container = style({
  position: "absolute",
  bottom: 0,
  left: 0,
  display: "flex",
  alignItems: "center",
  width: "100%",
  height: 64,
  padding: "0 4px",
  backgroundColor: color.primaryContainer,
});

export const mgr16 = style({
  marginRight: 16,
});
