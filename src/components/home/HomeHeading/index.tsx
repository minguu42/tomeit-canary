import styles from "./styles.module.scss";
import { Task } from "types/task";

type Props = {
  headingText: string;
  tasks: Task[];
};

export const HomeHeading = ({ headingText, tasks }: Props): JSX.Element => (
  <div className={styles.container}>
    <h1 className={styles.heading}>{headingText}</h1>
    <p className={styles.taskNum}>タスク数：{tasks.length}</p>
  </div>
);

export default HomeHeading;
