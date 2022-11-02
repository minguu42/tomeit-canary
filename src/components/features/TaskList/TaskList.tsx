import { FC } from "react";

import TaskListItem from "@/components/features/TaskList/TaskListItem";
import { Task } from "@/types/task";

type Props = {
  tasks: Task[];
};

const TaskList: FC<Props> = ({ tasks }) => (
  <ul>
    {tasks.map((task) => (
      <TaskListItem task={task} key={task.id} />
    ))}
  </ul>
);

export default TaskList;
