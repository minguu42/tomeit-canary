import { useRecoilValue } from "recoil";

import styles from "./styles.module.scss";
import { Task, tasksState } from "models/task";

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

const HomeHeadingContainer = (): JSX.Element => {
  const tasks = useRecoilValue(tasksState);

  return <HomeHeading headingText="いつか" tasks={tasks} />;
};

export default HomeHeadingContainer;
