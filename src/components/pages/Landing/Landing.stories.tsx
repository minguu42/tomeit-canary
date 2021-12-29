import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Landing } from "./Landing";

export default {
  title: "Page/Landing",
  component: Landing,
} as ComponentMeta<typeof Landing>;

const Template: ComponentStory<typeof Landing> = (args) => (
  <Landing {...args} />
);

export const Default = Template.bind({});
