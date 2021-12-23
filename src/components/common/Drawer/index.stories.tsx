import { Story, Meta } from "@storybook/react";

import { MobileDrawer, MobileProps } from "./index";

export default {
  components: MobileDrawer,
  title: "MobileDrawer",
} as Meta<MobileProps>;

const Template: Story<MobileProps> = (args) => <MobileDrawer {...args} />;

export const Default = Template.bind({});
Default.args = {
  isOpen: true,
};
