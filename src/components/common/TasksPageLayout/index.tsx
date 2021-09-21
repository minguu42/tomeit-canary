import TopAppBar from "components/common/TopAppBar";
import TaskListHeader from "components/common/TaskListHeader";
import AddTaskForm from "components/common/AddTaskForm";
import TaskList from "components/common/TaskList";
import PomodoroPlayer from "components/home/PomodoroPlayer";
import s from "./styles.module.scss";

const TasksPageLayout = (): JSX.Element => (
  <>
    <TopAppBar />
    <main className={s.main}>
      <TaskListHeader />
      <div>
        <AddTaskForm />
        <TaskList />
      </div>
      <div className={s.playerLayout}>
        <PomodoroPlayer />
      </div>
    </main>
  </>
);

export default TasksPageLayout;
