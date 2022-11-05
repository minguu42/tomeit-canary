import { style } from "@vanilla-extract/css";

import { color, state, typography } from "@/styles/tokens";

export const container = style({
  position: "absolute",
  zIndex: 3,
  top: 48,
  left: 4,
  width: 328,
  height: 428,
  borderRadius: 16,
  backgroundColor: `rgb(${color.surface})`,
});

export const surfaceTint = style({
  width: "100%",
  height: "100%",
  borderRadius: "inherit",
  backgroundColor: `rgb(${color.primary} / 0.11)`, // surface3
});

export const header = style({
  display: "flex",
  alignItems: "center",
  padding: "0 12px 0 16px",
  height: 56,
  color: `rgb(${color.on.surfaceVariant})`,
});

export const selector = style([
  {
    border: "0",
    color: `rgb(${color.on.surfaceVariant})`,
    backgroundColor: "transparent",
  },
  typography.label.large,
]);

export const spacer = style({
  flex: "1 1 0",
});

export const calendarContainer = style({
  padding: "0 12px",
});

export const weekdaysLabelContainer = style({
  display: "flex",
  gap: 4,
});

export const dateListContainer = style({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(40px, 1fr))",
  gap: "0 4px",
});

export const calendarItem = style([
  {
    display: "grid",
    placeItems: "center",
    width: 40,
    height: 40,
    color: `rgb(${color.on.surface})`,
  },
  typography.body.large,
]);

export const dateContainer = style([
  {
    position: "relative",
    display: "grid",
    placeItems: "center",
    width: 40,
    height: 40,
    color: `rgb(${color.on.surface})`,
    backgroundColor: "transparent",
  },
  typography.body.large,
]);

export const dateStateLayer = style({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  borderRadius: "50%",

  selectors: {
    [`${dateContainer}:hover &`]: {
      backgroundColor: `rgb(${color.on.surfaceVariant} / ${state.layer.hover})`,
    },
    [`${dateContainer}:focus-visible &`]: {
      backgroundColor: `rgb(${color.on.surfaceVariant} / ${state.layer.focus})`,
    },
    [`${dateContainer}:active &`]: {
      backgroundColor: `rgb(${color.on.surfaceVariant} / ${state.layer.active})`,
    },
  },
});
