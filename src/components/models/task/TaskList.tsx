import { VStack } from "@chakra-ui/react";

import TaskListItem from "@/components/models/task/TaskListItem";
import type { Task } from "@/models/task";

type Props = {
  tasks: Task[];
};

const TaskList = ({ tasks }: Props): JSX.Element => (
  <VStack>
    {tasks.map((t) => (
      <TaskListItem key={t.id} task={t} />
    ))}
  </VStack>
);

export default TaskList;
