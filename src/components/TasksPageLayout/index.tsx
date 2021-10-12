import { useEffect } from "react";
import { useSetRecoilState } from "recoil";

import DrawerLayout from "components/DrawerLayout";
import TaskListHeader from "components/TaskListHeader";
import AddTaskForm from "components/AddTaskForm";
import TaskList from "components/TaskList";
import PomodoroPlayer from "components/PomodoroPlayer";
import s from "./styles.module.scss";
import {
  tasksFilterState,
  TasksFilter,
  isTasksResponse,
  tasksState,
  newTask,
} from "models/task";
import { getData } from "lib/fetch";
import { useUser } from "lib/auth";

type ContainerProps = {
  tasksFilter: TasksFilter;
};

const TasksPageLayout = (): JSX.Element => (
  <DrawerLayout>
    <div className={s.mainLayout}>
      <TaskListHeader />
      <div className={s.listLayout}>
        <AddTaskForm />
        <TaskList />
      </div>
      <div className={s.playerLayout}>
        <PomodoroPlayer />
      </div>
    </div>
  </DrawerLayout>
);

const TasksPageLayoutContainer = ({
  tasksFilter,
}: ContainerProps): JSX.Element => {
  const setTasksFilter = useSetRecoilState(tasksFilterState);
  const setTasks = useSetRecoilState(tasksState);
  const user = useUser();

  useEffect(() => {
    getData("/tasks?isCompleted=false", user)
      .then((data) => {
        if (isTasksResponse(data)) {
          setTasks(data.tasks.map((taskResponse) => newTask(taskResponse)));
        }
      })
      .catch((error) => console.error(error));
    setTasksFilter(tasksFilter);
  }, [user, setTasksFilter, tasksFilter, setTasks]);

  return <TasksPageLayout />;
};

export default TasksPageLayoutContainer;
