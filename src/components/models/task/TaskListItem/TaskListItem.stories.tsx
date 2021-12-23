import { ComponentStory, ComponentMeta } from "@storybook/react";

import { TaskListItem } from "./TaskListItem";

export default {
  title: "TaskListItem",
  component: TaskListItem,
} as ComponentMeta<typeof TaskListItem>;

const Template: ComponentStory<typeof TaskListItem> = (args) => (
  <TaskListItem {...args} />
);

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
    id: 1,
    title: "タスク1",
    expectedPomodoroNum: 4,
    actualPomodoroNum: 0,
    dueOn: null,
    isCompleted: false,
    completedOn: null,
  },
};

export const Actual = Template.bind({});
Actual.args = {
  task: {
    id: 1,
    title: "タスク1",
    expectedPomodoroNum: 0,
    actualPomodoroNum: 2,
    dueOn: null,
    isCompleted: false,
    completedOn: null,
  },
};

export const ExpectedActual = Template.bind({});
ExpectedActual.args = {
  task: {
    id: 1,
    title: "タスク1",
    expectedPomodoroNum: 4,
    actualPomodoroNum: 2,
    dueOn: null,
    isCompleted: false,
    completedOn: null,
  },
};
