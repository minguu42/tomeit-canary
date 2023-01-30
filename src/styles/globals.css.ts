import { globalStyle } from "@vanilla-extract/css";

globalStyle("*", {
  boxSizing: "border-box",
  padding: "0",
  margin: "0",
});

globalStyle(":where(html)", {
  fontFamily: '-apple-system, BlinkMacSystemFont, "Hiragino Kaku Gothic ProN", Meiryo, sans-serif',
});

globalStyle(":where(a)", {
  textDecoration: "none",
  color: "inherit",
});

globalStyle(`:where(button, [type="button"], [type="reset"], [type="submit"], [role="button"])`, {
  cursor: "pointer",
  border: "none",
  color: "inherit",
});

globalStyle(":where(nav, ol, ul, menu)", {
  listStyleType: "none",
});

globalStyle(`:where([aria-hidden="false"], [disabled])`, {
  cursor: "not-allowed",
});
