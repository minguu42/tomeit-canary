import { FC } from "react";

import TaskListItem from "@/components/models/task/TaskListItem";
import { useTasksAtom } from "@/globalStates/tasksAtom";
import { Task } from "@/models/task";
import { formatDate } from "@/lib/format";

type Props = {
  filter: "today" | "tomorrow" | "someday";
  featuredTask: Task | null;
  completeTask: (task: Task) => void;
  playPomodoro: (task: Task) => void;
  openTaskInSideSheet: (task: Task) => void;
  closeTaskSideSheet: () => void;
};

const TaskList: FC<Props> = ({
  filter,
  featuredTask,
  completeTask,
  playPomodoro,
  openTaskInSideSheet,
  closeTaskSideSheet,
}) => {
  const tasks = useTasksAtom();

  const isNotTaskCompleted = (task: Task) => task.completedOn == null;
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

  return (
    <ul>
      {tasks.filter(filterConditions).map((task) => (
        <TaskListItem
          key={task.id}
          task={task}
          featuredTask={featuredTask}
          onCompleteTaskButtonClick={() => {
            completeTask(task);
          }}
          onPlayPomodoroButtonClick={() => {
            playPomodoro(task);
          }}
          openInTaskSideSheet={() => {
            openTaskInSideSheet(task);
          }}
          closeTaskSideSheet={closeTaskSideSheet}
        />
      ))}
    </ul>
  );
};

export default TaskList;
