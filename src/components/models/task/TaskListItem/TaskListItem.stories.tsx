import { Meta, Story } from "@storybook/react";

import { TaskListItem, Props } from "./TaskListItem";

export default {
  component: TaskListItem,
  title: "TaskListItem",
} as Meta;

const Template: Story<Props> = (args) => <TaskListItem {...args} />;

export const Default = Template.bind({});
Default.args = {
  task: {
    id: 1,
    title: "タスク1",
    expectedPomodoroNum: 0,
    actualPomodoroNum: 0,
    dueOn: null,
    isCompleted: false,
    completedOn: null,
  },
};

export const Expected = Template.bind({});
Expected.args = {
  task: {
    ...Default.args.task,
    expectedPomodoroNum: 4,
  },
};

export const Actual = Template.bind({});
Actual.args = {
  task: {
    ...Default.args.task,
    actualPomodoroNum: 2,
  },
};

export const ExpectedActual = Template.bind({});
ExpectedActual.args = {
  task: {
    ...Default.args.task,
    expectedPomodoroNum: 4,
    actualPomodoroNum: 2,
  },
};
