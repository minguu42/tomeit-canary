import { TaskListItem } from "@/features/task/TaskList/TaskListItem";
import { Task } from "@/features/task/task";

type Props = {
  tasks: Task[];
};

export const TaskList = ({ tasks }: Props): JSX.Element => (
  <ul>
    {tasks.map((task) => (
      <TaskListItem task={task} key={task.id} />
    ))}
  </ul>
);
