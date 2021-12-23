import NextImage from "next/image";
import { chakra } from "@chakra-ui/react";

const Image = chakra(NextImage, {
  shouldForwardProp: (prop: string): boolean =>
    ["width", "height", "src", "alt"].includes(prop),
});

export default Image;
