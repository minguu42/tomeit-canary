import { ComponentStory, ComponentMeta } from "@storybook/react";

import { TopAppBar } from "./TopAppBar";

export default {
  title: "TopAppBar",
  component: TopAppBar,
} as ComponentMeta<typeof TopAppBar>;

const Template: ComponentStory<typeof TopAppBar> = () => <TopAppBar />;

export const Default = Template.bind({});
