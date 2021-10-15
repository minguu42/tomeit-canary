import { useEffect } from "react";

import DrawerLayout from "components/DrawerLayout";
import TaskListHeader from "components/TaskListHeader";
import AddTaskForm from "components/AddTaskForm";
import TaskList from "components/TaskList";
import PomodoroPlayer from "components/PomodoroPlayer";
import s from "./styles.module.scss";
import {
  isTasksResponse,
  newTask,
  useTasksActions,
  TasksFilter,
  useTasksFilterActions,
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
  const { initTasksFilter } = useTasksFilterActions();
  const { initTasks } = useTasksActions();
  const user = useUser();

  useEffect(() => {
    getData("/tasks?isCompleted=false", user)
      .then((data) => {
        if (isTasksResponse(data)) {
          initTasks(data.tasks.map((t) => newTask(t)));
        }
      })
      .catch((error) => console.error(error));
    initTasksFilter(tasksFilter);
  }, [user, tasksFilter, initTasks, initTasksFilter]);

  return <TasksPageLayout />;
};

export default TasksPageLayoutContainer;
