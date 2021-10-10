import { useEffect } from "react";
import { useSetRecoilState } from "recoil";

import TopAppBar from "components/common/DrawerLayout/TopAppBar";
import Drawer from "components/common/DrawerLayout/Drawer";
import TaskListHeader from "components/common/TaskListHeader";
import AddTaskForm from "components/common/AddTaskForm";
import TaskList from "components/common/TaskList";
import PomodoroPlayer from "components/common/PomodoroPlayer";
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
  <>
    <TopAppBar />
    <div className={s.ndLayout}>
      <Drawer />
      <main className={s.main}>
        <TaskListHeader />
        <div className={s.list}>
          <AddTaskForm />
          <TaskList />
        </div>
        <div className={s.player}>
          <PomodoroPlayer />
        </div>
      </main>
    </div>
  </>
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
