import { ComponentStory, ComponentMeta } from "@storybook/react";

import { GoogleLoginButton } from "./GoogleLoginButton";

export default {
  title: "GoogleLoginButton",
  component: GoogleLoginButton,
} as ComponentMeta<typeof GoogleLoginButton>;

const Template: ComponentStory<typeof GoogleLoginButton> = (args) => (
  <GoogleLoginButton {...args} />
);

export const Default = Template.bind({});
