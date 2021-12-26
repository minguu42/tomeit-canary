export const globalTypes = {
  direction: {
    name: "Direction",
    description: "Direction for layout",
    defaultValue: "LTR",
    toolbar: {
      icon: "globe",
      items: ["LTR", "RTL"],
    },
  },
};

const customViewports = {
  /* iPhone SE（第2世代） */
  iphone: {
    name: "iPhone",
    styles: {
      width: "375px",
      height: "667px",
    },
    type: "mobile",
  },
  /* iPad（第6世代） */
  ipad: {
    name: "iPad",
    styles: {
      width: "768px",
      height: "1024px",
    },
    type: "tablet",
  },
  /* MacBook Pro 13 inch */
  macbook: {
    name: "MacBook Pro",
    styles: {
      width: "1440px",
      height: "900px",
    },
    type: "desktop",
  },
};

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  viewport: {
    viewports: customViewports,
  },
};
