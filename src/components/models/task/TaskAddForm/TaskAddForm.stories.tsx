import { Meta, Story } from "@storybook/react";

import { TaskAddForm } from "./TaskAddForm";

export default {
  component: TaskAddForm,
  title: "TaskAddForm",
} as Meta;

const Template: Story = (args) => <TaskAddForm {...args} />;

export const Default = Template.bind({});
