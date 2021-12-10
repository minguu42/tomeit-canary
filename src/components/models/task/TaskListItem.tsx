import { HStack, Spacer, IconButton, Text } from "@chakra-ui/react";
import { BsCircle, BsPlayCircle } from "react-icons/bs";

import type { Task } from "models/task";

type Props = {
  task: Task;
};

const TaskListItem = ({ task }: Props): JSX.Element => (
  <HStack w="100%" p="8px 16px" borderBottom="1px" borderColor="gray.200">
    <IconButton
      aria-label="タスクを完了する"
      icon={<BsCircle />}
      fontSize="24px"
      bg="transparent"
    />
    <Text>{task.title}</Text>
    <Spacer />
    <IconButton
      aria-label="ポモドーロを開始する"
      icon={<BsPlayCircle />}
      fontSize="24px"
      bg="transparent"
    />
  </HStack>
);

export default TaskListItem;
