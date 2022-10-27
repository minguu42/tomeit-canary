import { FC } from "react";

import TaskListItem from "@/components/features/TaskList/TaskListItem";
import { useTasks } from "@/globalStates/tasks";

const TaskList: FC = () => {
  let tasks = useTasks();

  return (
    <ul>
      {tasks.map((task) => (
        <TaskListItem task={task} key={task.id} />
      ))}
    </ul>
  );
};

export default TaskList;
