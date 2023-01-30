import { createGlobalTheme, createTheme, createThemeContract } from "@vanilla-extract/css";

export const theme = createThemeContract({
  color: {
    primary: null,
    primaryContainer: null,
    surface: null,
    surfaceVariant: null,
    background: null,
    error: null,
    errorContainer: null,
    disabled: null,
    on: {
      primary: null,
      primaryContainer: null,
      surface: null,
      surfaceVariant: null,
      background: null,
      error: null,
      errorContainer: null,
      disabled: null,
    },
    outline: null,
    outlineVariant: null,
    scrim: null,
    surface1: null,
    surface2: null,
    surface3: null,
    surface4: null,
    surface5: null,
  },
  elevation: {
    level1: null,
    level2: null,
    level3: null,
    level4: null,
    level5: null,
  },
});

export const lightTheme = createTheme(theme, {
  color: {
    primary: "#6750A4",
    primaryContainer: "#EADDFF",
    surface: "#FFFBFE",
    surfaceVariant: "#E7E0EC",
    background: "#FFFBFE",
    error: "#B3261E",
    errorContainer: "#F9DEDC",
    disabled: "#1C1B1F61",
    on: {
      primary: "#FFFFFF",
      primaryContainer: "#21005E",
      surface: "#1C1B1F",
      surfaceVariant: "#49454E",
      background: "#1C1B1F",
      error: "#FFFFFF",
      errorContainer: "#410E0B",
      disabled: "#1C1B1F1F",
    },
    outline: "#79747E",
    outlineVariant: "#C4C7C5",
    scrim: "#00000066",
    surface1: "#F7F2F9",
    surface2: "#F3EDF7",
    surface3: "#EEE8F4",
    surface4: "#ECE6F3",
    surface5: "#E9E3F1",
  },
  elevation: {
    level1: "0 1px 2px rgb(0 0 0 / 0.3), 0 1px 3px 1px rgb(0 0 0 / 0.15)",
    level2: "0 1px 2px rgb(0 0 0 / 0.3), 0 2px 6px 2px rgb(0 0 0 / 0.15)",
    level3: "0 4px 8px 3px rgb(0 0 0 / 0.15), 0 1px 3px rgb(0 0 0 / 0.3)",
    level4: "0 6px 10px 4px rgb(0 0 0 / 0.15), 0 2px 3px rgb(0 0 0 / 0.3)",
    level5: "0 8px 12px 6px rgb(0 0 0 / 0.15), 0 4px 4px rgb(0 0 0 / 0.3)",
  },
});

export const darkTheme = createTheme(theme, {
  color: {
    primary: "#D0BCFF",
    primaryContainer: "#4F378B",
    surface: "#1C1B1F",
    surfaceVariant: "#49454F",
    background: "#1C1B1F",
    error: "#F2B8B5",
    errorContainer: "#8C1D18",
    disabled: "#E6E1E561",
    on: {
      primary: "#371E73",
      primaryContainer: "#EADDFF",
      surface: "#E6E1E5",
      surfaceVariant: "#CAC4D0",
      background: "#E6E1E5",
      error: "#601410",
      errorContainer: "#F9DEDC",
      disabled: "#E6E1E51F",
    },
    outline: "#938F99",
    outlineVariant: "#444746",
    scrim: "#00000066",
    surface1: "#25232A",
    surface2: "#2B2831",
    surface3: "#302D38",
    surface4: "#322F3A",
    surface5: "#35313F",
  },
  elevation: {
    level1: "0 1px 3px 1px rgb(0 0 0 / 0.15), 0 1px 2px rgb(0 0 0 / 0.3)",
    level2: "0 2px 6px 2px rgb(0 0 0 / 0.15), 0 1px 2px rgb(0 0 0 / 0.3)",
    level3: "0 4px 8px 3px rgb(0 0 0 / 0.15), 0 1px 3px rgb(0 0 0 / 0.3)",
    level4: "0 6px 10px 4px rgb(0 0 0 / 0.15), 0 2px 3px rgb(0 0 0 / 0.3)",
    level5: "0 8px 12px 6px rgb(0 0 0 / 0.15), 0 4px 4px rgb(0 0 0 / 0.3)",
  },
});

export const typography = createGlobalTheme(":root", {
  title: {
    large: {
      size: "1.375rem",
      weight: "400",
    },
    medium: {
      size: "1rem",
      weight: "700",
    },
  },
  body: {
    large: {
      size: "1rem",
      weight: "400",
    },
    medium: {
      size: "0.875rem",
      weight: "400",
    },
  },
  label: {
    large: {
      size: "0.875rem",
      weight: "700",
    },
    medium: {
      size: "0.75rem",
      weight: "700",
    },
  },
});

export const stateLayerOpacity = createGlobalTheme(":root", {
  hover: "0.08",
  focus: "0.12",
  active: "0.12",
});
