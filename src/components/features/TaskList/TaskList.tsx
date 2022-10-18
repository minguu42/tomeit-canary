import { FC } from "react";

import TaskListItem from "@/components/features/TaskList/TaskListItem";
import { useTasks } from "@/globalStates/tasks";

type Props = {
  isFocusPage?: boolean;
};

const TaskList: FC<Props> = ({ isFocusPage }) => {
  let tasks = useTasks();
  if (isFocusPage) {
    tasks = tasks.filter((t) => t.hasDoToday);
  }

  return (
    <ul>
      {tasks.map((task) => (
        <TaskListItem task={task} key={task.id} isFocusPage={isFocusPage} />
      ))}
    </ul>
  );
};

export default TaskList;
