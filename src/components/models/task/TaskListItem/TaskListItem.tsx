import { Flex, Spacer, IconButton, Text } from "@chakra-ui/react";

import { CircleIcon, PlayCircleIcon } from "@/components/common/icons";
import type { Task } from "@/models/task";

export type Props = {
  task: Task;
};

export const TaskListItem = ({ task }: Props): JSX.Element => (
  <Flex alignItems="center" w="100%" p="8px 16px" borderBottom="1px" borderColor="gray.200">
    <IconButton
      aria-label="タスクを完了"
      icon={<CircleIcon />}
      bg="transparent"
    />
    <Text>{task.title}</Text>
    <Spacer />
    <IconButton
      aria-label="ポモドーロを開始"
      icon={<PlayCircleIcon />}
      bg="transparent"
    />
  </Flex>
);

export default TaskListItem;
