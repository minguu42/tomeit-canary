import { useRecoilValue } from "recoil";

import s from "./styles.module.scss";
import { Task, filteredTasksState, useTasksFilter } from "models/task";
import { formatDateToJP } from "lib/format";

type Props = {
  title: string;
  tasks: Task[];
  date?: Date;
};

export const TaskListHeader = ({ title, tasks, date }: Props): JSX.Element => (
  <div className={s.container}>
    <div className={s.top}>
      <h1 className={s.title}>{title}</h1>
      <p className={s.date}>{date && formatDateToJP(date)}</p>
    </div>
    <p className={s.taskNum}>タスク数：{tasks.length}</p>
  </div>
);

const TaskListHeaderContainer = (): JSX.Element => {
  const tasksFilter = useTasksFilter();
  const filteredTasks = useRecoilValue(filteredTasksState);
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  switch (tasksFilter) {
    case "Today":
      return (
        <TaskListHeader title={"今日"} tasks={filteredTasks} date={today} />
      );
    case "Tomorrow":
      return (
        <TaskListHeader title={"明日"} tasks={filteredTasks} date={tomorrow} />
      );
    case "Someday":
      return <TaskListHeader title="いつか" tasks={filteredTasks} />;
  }
};

export default TaskListHeaderContainer;
