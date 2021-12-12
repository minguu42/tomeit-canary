import {
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
  useBreakpointValue,
} from "@chakra-ui/react";
import { MdAvTimer } from "react-icons/md";

type TaskAddFormProps = {
  isMobile: boolean;
};

const TaskAddForm = ({ isMobile }: TaskAddFormProps): JSX.Element => (
  <FormControl d="flex" p="4px 8px" borderBottom="1px" borderColor="gray.300">
    <Input
      placeholder="タスク名を入力する"
      variant="flushed"
      border="none"
      flex="0 1 100%"
    />
    <InputGroup maxW="68px" hidden={isMobile}>
      <InputLeftElement fontSize="24px" pointerEvents="none">
        {<MdAvTimer />}
      </InputLeftElement>
      <Input
        type="number"
        placeholder="0"
        defaultValue={0}
        max={6}
        min={0}
        border="none"
      />
    </InputGroup>
    <Input
      type="date"
      defaultValue="2020-01-01"
      p="4px"
      maxW="152px"
      border="none"
      hidden={isMobile}
    />
  </FormControl>
);

const TaskAddFormContainer = (): JSX.Element => {
  const isMobile = useBreakpointValue({ base: true, md: false }) ?? false;
  return <TaskAddForm isMobile={isMobile} />;
};

export default TaskAddFormContainer;
