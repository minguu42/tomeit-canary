import { useEffect } from "react";
import { useSetRecoilState } from "recoil";

import { tasksFilterState, TasksFilter } from "models/task";

import TopAppBar from "components/common/TopAppBar";
import NavigationDrawer from "components/common/NavigationDrawer";
import TaskListHeader from "components/common/TaskListHeader";
import AddTaskForm from "components/common/AddTaskForm";
import TaskList from "components/common/TaskList";
import PomodoroPlayer from "components/common/PomodoroPlayer";
import s from "./styles.module.scss";

type Props = {
  tasksFilter: TasksFilter;
};

const TasksPageLayout = (): JSX.Element => (
  <div className={s.container}>
    <div className={s.header}>
      <TopAppBar />
    </div>
    <div className={s.drawer}>
      <NavigationDrawer />
    </div>
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
);

const TasksPageLayoutContainer = ({ tasksFilter }: Props): JSX.Element => {
  const setTasksFilter = useSetRecoilState(tasksFilterState);

  useEffect(() => {
    setTasksFilter(tasksFilter);
  }, [setTasksFilter, tasksFilter]);

  return <TasksPageLayout />;
};

export default TasksPageLayoutContainer;
