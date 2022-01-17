import type { VFC } from "react";

import TaskListItem from "@/components/models/task/TaskListItem";
import { useTasksAtom } from "@/globalStates/tasksAtom";
import { Task } from "@/models/task";
import { formatDate } from "@/lib/format";

type Props = {
  filter: "today" | "tomorrow" | "someday";
  featuredTask: Task | null;
  setFeaturedTask: (task: Task | null) => void;
};

const TaskList: VFC<Props> = ({ filter, featuredTask, setFeaturedTask }) => {
  const tasks = useTasksAtom();

  let filterConditions = (task: Task) => !task.isCompleted;
  if (filter === "today") {
    const today = new Date();
    filterConditions = (task: Task) =>
      !task.isCompleted &&
      task.dueOn !== null &&
      formatDate(task.dueOn) === formatDate(today);
  } else if (filter === "tomorrow") {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    filterConditions = (task: Task) =>
      !task.isCompleted &&
      task.dueOn !== null &&
      formatDate(task.dueOn) === formatDate(tomorrow);
  }

  return (
    <ul>
      {tasks.filter(filterConditions).map((task) => (
        <TaskListItem
          key={task.id}
          task={task}
          featuredTask={featuredTask}
          setFeaturedTask={setFeaturedTask}
        />
      ))}
    </ul>
  );
};

export default TaskList;
