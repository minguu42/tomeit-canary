import { style } from "@vanilla-extract/css";

import { color, state, typography } from "@/styles/tokens";

export const container = style({
  position: "relative",
  display: "flex",
  gap: 4,
  alignItems: "center",
  height: 56,
  padding: "0 24px 0 4px",
  backgroundColor: `rgb(${color.surface._})`,
});

export const zIndex1 = style({
  zIndex: 1,
});

export const mainContainer = style({
  zIndex: 1,
  flex: "1 1 0",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  height: 56,
  backgroundColor: "transparent",
});

export const stateLayer = style({
  position: "absolute",
  zIndex: 0,
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  borderRadius: "inherit",

  selectors: {
    [`${mainContainer}:hover~&`]: {
      backgroundColor: `rgb(${color.on.surface._} / ${state.layer.hover})`,
    },
    [`${mainContainer}:focus-visible~&`]: {
      backgroundColor: `rgb(${color.on.surface._} / ${state.layer.focus})`,
    },
    [`${mainContainer}:active~&`]: {
      backgroundColor: `rgb(${color.on.surface._} / ${state.layer.active})`,
    },
    [`${mainContainer}:disabled~&`]: { backgroundColor: "transparent" },
  },
});

export const heading = style([
  typography.body.large,
  {
    color: `rgb(${color.on.surface._})`,
  },
]);

export const flags = style([
  typography.body.small,
  {
    textAlign: "center",
  },
]);
