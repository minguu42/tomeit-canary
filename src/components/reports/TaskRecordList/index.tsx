import TaskListItem from "components/common/TaskListItem";
import styles from "components/reports/TaskRecordList/TaskRecordList.module.scss";
import { Task } from "types/task";

type Props = {
  tasks: Task[];
};

export const TaskRecordList = ({ tasks }: Props): JSX.Element => (
  <div>
    <div className={styles.label}>
      <h3>タスク</h3>
      <p>タスク数：{tasks.length}</p>
    </div>
    <ul>
      {tasks.map((task) => (
        <TaskListItem key={task.id} task={task} />
      ))}
    </ul>
  </div>
);

const tasks: Task[] = [
  {
    id: 1,
    title: "タスク1",
    expectedPomodoroNum: 0,
    actualPomodoroNum: 0,
    dueOn: new Date("0001-01-01T00:00:00Z"),
    isCompleted: true,
    completedAt: new Date("2021-08-31T00:00:00Z"),
    createdAt: new Date("0001-01-01T00:00:00Z"),
    updatedAt: new Date("0001-01-01T00:00:00Z"),
  },
  {
    id: 2,
    title: "タスク2",
    expectedPomodoroNum: 4,
    actualPomodoroNum: 2,
    dueOn: new Date("2021-01-01T00:00:00Z"),
    isCompleted: true,
    completedAt: new Date("2021-08-31T01:00:00Z"),
    createdAt: new Date("0001-01-01T00:00:00Z"),
    updatedAt: new Date("0001-01-01T00:00:00Z"),
  },
];

const TaskRecordListContainer = (): JSX.Element => {
  return <TaskRecordList tasks={tasks} />;
};

export default TaskRecordListContainer;
