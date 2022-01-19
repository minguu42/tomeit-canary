import { VFC } from "react";

import TaskListItem from "@/components/models/task/TaskListItem";
import { useTasksAtom } from "@/globalStates/tasksAtom";
import { Task } from "@/models/task";
import { formatDate } from "@/lib/format";

type Props = {
  filter: "today" | "tomorrow" | "someday";
  featuredTask: Task | null;
  onCompleteTaskButtonClick: (task: Task) => void;
  onPlayPomodoroButtonClick: (task: Task) => void;
  openTaskInSideSheet: (task: Task) => void;
  closeTaskSideSheet: () => void;
};

const TaskList: VFC<Props> = ({
  filter,
  featuredTask,
  onCompleteTaskButtonClick,
  onPlayPomodoroButtonClick,
  openTaskInSideSheet,
  closeTaskSideSheet,
}) => {
  const tasks = useTasksAtom();

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

  return (
    <ul>
      {tasks.filter(filterConditions).map((task) => (
        <TaskListItem
          key={task.id}
          task={task}
          featuredTask={featuredTask}
          completeTask={() => {
            onCompleteTaskButtonClick(task);
          }}
          playPomodoro={() => {
            onPlayPomodoroButtonClick(task);
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
