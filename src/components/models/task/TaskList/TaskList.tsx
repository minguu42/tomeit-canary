import type { VFC } from "react";

import TaskListItem from "@/components/models/task/TaskListItem";
import { useTasksAtom } from "@/globalStates/tasksAtom";
import { formatDate } from "@/lib/format";

type Props = {
  filter: "today" | "tomorrow" | "someday";
};

const TaskList: VFC<Props> = ({ filter }) => {
  const tasks = useTasksAtom();

  if (filter === "someday") {
    return (
      <ul>
        {tasks
          .filter((task) => !task.isCompleted)
          .map((task) => (
            <TaskListItem key={task.id} task={task} />
          ))}
      </ul>
    );
  }

  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  const filterDate = filter === "today" ? today : tomorrow;
  const filteredTasks = tasks.filter(
    (task) =>
      task.dueOn !== null && formatDate(task.dueOn) === formatDate(filterDate)
  );

  return (
    <ul>
      {filteredTasks
        .filter((task) => !task.isCompleted)
        .map((task) => (
          <TaskListItem key={task.id} task={task} />
        ))}
    </ul>
  );
};

export default TaskList;
