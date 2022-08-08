import { createTheme, createThemeContract } from "@vanilla-extract/css";

/*
 * ベースラインカラースキーマトークン
 * https://m3.material.io/styles/color/the-color-system/tokens
 * rgb関数で透過した色を使うので全てRGB色の値で定義している。
 */
export const colors = createThemeContract({
  primary: {
    _: null,
    container: null,
  },
  secondary: {
    _: null,
    container: null,
  },
  tertiary: {
    _: null,
    container: null,
  },
  surface: {
    _: null,
    variant: null,
    tint: null,
  },
  background: null,
  error: {
    _: null,
    container: null,
  },
  on: {
    primary: {
      _: null,
      container: null,
    },
    secondary: {
      _: null,
      container: null,
    },
    tertiary: {
      _: null,
      container: null,
    },
    surface: {
      _: null,
      variant: null,
    },
    background: null,
    error: {
      _: null,
      container: null,
    },
  },
  outline: null,
  shadow: null,
  inverse: {
    surface: null,
    on: {
      surface: null,
    },
    primary: null,
  },
});

export const lightTheme = createTheme(colors, {
  primary: {
    _: "103 80 164",
    container: "234 221 255",
  },
  secondary: {
    _: "98 91 113",
    container: "232 222 248",
  },
  tertiary: {
    _: "125 82 96",
    container: "255 216 228",
  },
  surface: {
    _: "255 251 254",
    variant: "231 224 236",
    tint: "103 80 164",
  },
  background: "255 251 254",
  error: {
    _: "179 38 30",
    container: "249 222 220",
  },
  on: {
    primary: {
      _: "255 255 255",
      container: "33 0 94",
    },
    secondary: {
      _: "255 255 255",
      container: "30 25 43",
    },
    tertiary: {
      _: "255 255 255",
      container: "55 11 30",
    },
    surface: {
      _: "28 27 31",
      variant: "73 69 78",
    },
    background: "28 27 31",
    error: {
      _: "255 255 255",
      container: "55 11 30",
    },
  },
  outline: "121 116 126",
  shadow: "0 0 0",
  inverse: {
    surface: "49 48 51",
    on: {
      surface: "244 239 244",
    },
    primary: "208 188 255",
  },
});

export const darkTheme = createTheme(colors, {
  primary: {
    _: "208 188 255",
    container: "79 55 139",
  },
  secondary: {
    _: "204 194 220",
    container: "74 68 88",
  },
  tertiary: {
    _: "239 184 200",
    container: "99 59 72",
  },
  surface: {
    _: "28 27 31",
    variant: "73 69 79",
    tint: "208 188 255",
  },
  background: "28 27 31",
  error: {
    _: "242 184 181",
    container: "140 29 24",
  },
  on: {
    primary: {
      _: "55 30 115",
      container: "234 221 255",
    },
    secondary: {
      _: "51 45 65",
      container: "232 222 248",
    },
    tertiary: {
      _: "73 37 50",
      container: "255 216 228",
    },
    surface: {
      _: "230 225 229",
      variant: "202 196 208",
    },
    background: "230 225 229",
    error: {
      _: "96 20 16",
      container: "249 222 220",
    },
  },
  outline: "147 143 153",
  shadow: "0 0 0",
  inverse: {
    surface: "230 225 229",
    on: {
      surface: "49 48 51",
    },
    primary: "103 80 164",
  },
});
