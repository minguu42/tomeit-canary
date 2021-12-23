import { useEffect } from "react";
import {
  ChakraProvider,
  extendTheme,
  Flex,
  Button,
  useColorMode,
} from "@chakra-ui/react";
import { StoryContext } from "@storybook/react";

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

const ColorModeToggleBar = () => {
  const { toggleColorMode } = useColorMode();

  return (
    <Flex justify="flex-end" mb={4}>
      <Button variant="outline" onClick={toggleColorMode}>
        Toggle color mode
      </Button>
    </Flex>
  );
};

const withChakra = (StoryFn: Function, context: StoryContext) => {
  const { direction } = context.globals;
  const dir = direction.toLowerCase();

  useEffect(() => {
    document.documentElement.dir = dir;
  }, [dir]);

  return (
    <ChakraProvider theme={extendTheme({ direction: dir })}>
      <div dir={dir} id="story-wrapper" style={{ minHeight: "100vh" }}>
        <ColorModeToggleBar />
        <StoryFn />
      </div>
    </ChakraProvider>
  );
};

export const decorators = [withChakra];

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
