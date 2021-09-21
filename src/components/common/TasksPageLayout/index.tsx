import { useEffect } from "react";
import { useSetRecoilState } from "recoil";

import { tasksFilterState, TasksFilter } from "models/task";

import TopAppBar from "components/common/TopAppBar";
import TaskListHeader from "components/common/TaskListHeader";
import AddTaskForm from "components/common/AddTaskForm";
import TaskList from "components/common/TaskList";
import PomodoroPlayer from "components/common/PomodoroPlayer";
import s from "./styles.module.scss";

type Props = {
  tasksFilter: TasksFilter;
};

const TasksPageLayout = (): JSX.Element => (
  <>
    <TopAppBar />
    <main className={s.main}>
      <TaskListHeader />
      <div className={s.listLayout}>
        <AddTaskForm />
        <TaskList />
      </div>
      <div className={s.playerLayout}>
        <PomodoroPlayer />
      </div>
    </main>
  </>
);

const TasksPageLayoutContainer = ({ tasksFilter }: Props): JSX.Element => {
  const setTasksFilter = useSetRecoilState(tasksFilterState);

  useEffect(() => {
    setTasksFilter(tasksFilter);
  }, [setTasksFilter, tasksFilter]);

  return <TasksPageLayout />;
};

export default TasksPageLayoutContainer;
