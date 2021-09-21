import { useEffect } from "react";
import { useSetRecoilState } from "recoil";

import TaskList from "components/common/TaskList";
import { tasksFilterState } from "models/task";

const TaskListContainer = (): JSX.Element => {
  const setTasksFilter = useSetRecoilState(tasksFilterState);

  useEffect(() => {
    setTasksFilter("Today");
  }, [setTasksFilter]);

  return <TaskList />;
};

export default TaskListContainer;
