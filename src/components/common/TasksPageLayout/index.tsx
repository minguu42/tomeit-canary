import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { tasksFilterState, TasksFilter } from "models/task";

import TopAppBar from "components/common/TopAppBar";
import NavigationDrawer, {
  navigationDrawerExistsState,
} from "components/common/NavigationDrawer";
import TaskListHeader from "components/common/TaskListHeader";
import AddTaskForm from "components/common/AddTaskForm";
import TaskList from "components/common/TaskList";
import PomodoroPlayer from "components/common/PomodoroPlayer";
import s from "./styles.module.scss";

type Props = {
  navigationDrawerExists: boolean;
};

type ContainerProps = {
  tasksFilter: TasksFilter;
};

const TasksPageLayout = ({ navigationDrawerExists }: Props): JSX.Element => (
  <>
    <TopAppBar />
    <div className={s.ndLayout}>
      {navigationDrawerExists && <NavigationDrawer />}
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
  const navigationDrawerExists = useRecoilValue(navigationDrawerExistsState);

  useEffect(() => {
    setTasksFilter(tasksFilter);
  }, [setTasksFilter, tasksFilter]);

  return <TasksPageLayout navigationDrawerExists={navigationDrawerExists} />;
};

export default TasksPageLayoutContainer;
