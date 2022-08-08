import { style } from "@vanilla-extract/css";

// タイポグラフィトークン
// https://m3.material.io/styles/typography/type-scale-tokens
export const typography = {
  display: {
    large: style({
      lineHeight: "4rem",
      fontSize: "3.5625rem",
      letterSpacing: "0",
      fontWeight: "400",
    }),
    medium: style({
      lineHeight: "3.25rem",
      fontSize: "2.8125rem",
      letterSpacing: "0",
      fontWeight: "400",
    }),
    small: style({
      lineHeight: "2.75rem",
      fontSize: "2.25rem",
      letterSpacing: "0",
      fontWeight: "400",
    }),
  },
  headline: {
    large: style({
      lineHeight: "2.5rem",
      fontSize: "2rem",
      letterSpacing: "0",
      fontWeight: "400",
    }),
    medium: style({
      lineHeight: "2.25rem",
      fontSize: "1.75rem",
      letterSpacing: "0",
      fontWeight: "400",
    }),
    small: style({
      lineHeight: "2rem",
      fontSize: "1.5rem",
      letterSpacing: "0",
      fontWeight: "400",
    }),
  },
  title: {
    large: style({
      lineHeight: "1.75rem",
      fontSize: "1.375rem",
      letterSpacing: "0",
      fontWeight: "400",
    }),
    medium: style({
      lineHeight: "1.5rem",
      fontSize: "1rem",
      letterSpacing: "0.009375rem",
      fontWeight: "500",
    }),
    small: style({
      lineHeight: "1.25rem",
      fontSize: "0.875rem",
      letterSpacing: "0.00625.rem",
      fontWeight: "500",
    }),
  },
  label: {
    large: style({
      lineHeight: "1.25rem",
      fontSize: "0.875rem",
      letterSpacing: "0.00625rem",
      fontWeight: "500",
    }),
    medium: style({
      lineHeight: "1rem",
      fontSize: "0.75rem",
      letterSpacing: "0.03125rem",
      fontWeight: "500",
    }),
    small: style({
      lineHeight: "1rem",
      fontSize: "0.6875rem",
      letterSpacing: "0.03125rem",
      fontWeight: "500",
    }),
  },
  body: {
    large: style({
      lineHeight: "1.5rem",
      fontSize: "1rem",
      letterSpacing: "0.03125rem",
      fontWeight: "400",
    }),
    medium: style({
      lineHeight: "1.25rem",
      fontSize: "0.875rem",
      letterSpacing: "0.015625rem",
      fontWeight: "400",
    }),
    small: style({
      lineHeight: "1rem",
      fontSize: "0.75rem",
      letterSpacing: "0.025rem",
      fontWeight: "400",
    }),
  },
};
