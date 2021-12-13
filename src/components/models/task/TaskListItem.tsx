import { HStack, Spacer, IconButton, Text } from "@chakra-ui/react";

import { CircleIcon, PlayCircleIcon } from "components/common/icons";
import type { Task } from "models/task";

type Props = {
  task: Task;
};

const TaskListItem = ({ task }: Props): JSX.Element => (
  <HStack w="100%" p="8px 16px" borderBottom="1px" borderColor="gray.200">
    <IconButton
      aria-label="タスクを完了する"
      icon={<CircleIcon w="24px" h="24px" />}
      bg="transparent"
    />
    <Text>{task.title}</Text>
    <Spacer />
    <IconButton
      aria-label="ポモドーロを開始する"
      icon={<PlayCircleIcon w="24px" h="24px" />}
      bg="transparent"
    />
  </HStack>
);

export default TaskListItem;
