import { globalStyle } from "@vanilla-extract/css";

globalStyle("*", {
  boxSizing: "border-box",
  padding: "0",
  margin: "0",
  backgroundRepeat: "no-repeat",
});

globalStyle(":where(html)", {
  fontFamily: `"Roboto", "Noto Sans JP", sans-serif`,
});

globalStyle(":where(a)", {
  color: "inherit",
  textDecoration: "none",
});

globalStyle(`:where(button, [type="button"], [type="reset"], [type="submit"], [role="button"])`, {
  color: "inherit",
  cursor: "pointer",
  borderWidth: "0",
});

globalStyle(":where(nav, ol, ul, menu)", {
  listStyleType: "none",
});

globalStyle(":where(svg:not([fill]))", {
  fill: "currentcolor",
});

globalStyle(`:where([aria-hidden="false"], [disabled])`, {
  cursor: "not-allowed",
});
