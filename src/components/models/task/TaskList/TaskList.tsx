import type { VFC } from "react";

import TaskListItem from "@/components/models/task/TaskListItem";
import { useTasksActions, useTasksAtom } from "@/globalStates/tasksAtom";
import { Task } from "@/models/task";
import { formatDate } from "@/lib/format";

type Props = {
  filter: "today" | "tomorrow" | "someday";
  featuredTask: Task | null;
  setFeaturedTask: (task: Task | null) => void;
};

const TaskList: VFC<Props> = ({ filter, featuredTask, setFeaturedTask }) => {
  const tasks = useTasksAtom();
  const { replaceTask } = useTasksActions();

  const isNotTaskCompleted = (task: Task) => !task.isCompleted;
  const isTaskDueOn = (task: Task, date: Date) =>
    task.dueOn !== null && formatDate(task.dueOn) === formatDate(date);
  let filterConditions = isNotTaskCompleted;
  if (filter === "today") {
    const today = new Date();
    filterConditions = (task: Task) =>
      isNotTaskCompleted(task) && isTaskDueOn(task, today);
  } else if (filter === "tomorrow") {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    filterConditions = (task: Task) =>
      isNotTaskCompleted(task) && isTaskDueOn(task, tomorrow);
  }

  const completeTask = (task: Task) => {
    const index = tasks.findIndex((t) => t.id === task.id);
    if (index === -1) return;
    const newTask: Task = { ...task, isCompleted: true };
    replaceTask(index, newTask);
  };

  const openInTaskSideSheet = (task: Task) => {
    setFeaturedTask(task);
  };

  const closeTaskSideSheet = () => {
    setFeaturedTask(null);
  };

  return (
    <ul>
      {tasks.filter(filterConditions).map((task) => (
        <TaskListItem
          key={task.id}
          task={task}
          featuredTask={featuredTask}
          completeTask={() => {
            completeTask(task);
          }}
          openInTaskSideSheet={() => {
            openInTaskSideSheet(task);
          }}
          closeTaskSideSheet={closeTaskSideSheet}
        />
      ))}
    </ul>
  );
};

export default TaskList;
