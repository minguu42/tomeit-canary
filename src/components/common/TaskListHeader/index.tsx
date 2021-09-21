import s from "./styles.module.scss";
import { Task, filteredTasksState } from "models/task";
import { formatToLocalDate } from "lib/format";
import { useRecoilValue } from "recoil";

type Props = {
  title: string;
  tasks: Task[];
  date?: Date;
};

export const TaskListHeader = ({ title, tasks, date }: Props): JSX.Element => (
  <div className={s.container}>
    <div className={s.top}>
      <h1 className={s.title}>{title}</h1>
      <p className={s.date}>{date && formatToLocalDate(date)}</p>
    </div>
    <p className={s.taskNum}>タスク数：{tasks.length}</p>
  </div>
);

const TaskListHeaderContainer = (): JSX.Element => {
  const tasks = useRecoilValue(filteredTasksState);
  const today = new Date();

  return <TaskListHeader title="今日" tasks={tasks} date={today} />;
};

export default TaskListHeaderContainer;
