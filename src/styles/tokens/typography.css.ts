import { style } from "@vanilla-extract/css";

// タイポグラフィトークン
// https://m3.material.io/styles/typography/type-scale-tokens
export const typography = {
  display: {
    large: style({
      fontSize: "3.5625rem",
      fontWeight: "400",
    }),
    medium: style({
      fontSize: "2.8125rem",
      fontWeight: "400",
    }),
    small: style({
      fontSize: "2.25rem",
      fontWeight: "400",
    }),
  },
  headline: {
    large: style({
      fontSize: "2rem",
      fontWeight: "400",
    }),
    medium: style({
      fontSize: "1.75rem",
      fontWeight: "400",
    }),
    small: style({
      fontSize: "1.5rem",
      fontWeight: "400",
    }),
  },
  title: {
    large: style({
      fontSize: "1.375rem",
      fontWeight: "400",
    }),
    medium: style({
      fontSize: "1rem",
      fontWeight: "500",
    }),
    small: style({
      fontSize: "0.875rem",
      fontWeight: "500",
    }),
  },
  label: {
    large: style({
      fontSize: "0.875rem",
      fontWeight: "500",
    }),
    medium: style({
      fontSize: "0.75rem",
      fontWeight: "500",
    }),
    small: style({
      fontSize: "0.6875rem",
      fontWeight: "500",
    }),
  },
  body: {
    large: style({
      fontSize: "1rem",
      fontWeight: "400",
    }),
    medium: style({
      fontSize: "0.875rem",
      fontWeight: "400",
    }),
    small: style({
      fontSize: "0.75rem",
      fontWeight: "400",
    }),
  },
};
