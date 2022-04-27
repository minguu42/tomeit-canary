import { FC } from "react";

import TaskListItem from "@/components/models/task/TaskListItem";
import { useTasks } from "@/hooks/fetch";
import { formatDate } from "@/lib/format";
import { Task } from "@/types/task";

type Props = {
  filter: "today" | "tomorrow" | "someday";
};

const TaskList: FC<Props> = ({ filter }) => {
  const { tasks, isLoading, isError } = useTasks();

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

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;
  return (
    <ul>
      {tasks.filter(filterConditions).map((t) => (
        <TaskListItem key={t.id} task={t} />
      ))}
    </ul>
  );
};

export default TaskList;
