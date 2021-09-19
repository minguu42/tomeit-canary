import { useState } from "react";
import Head from "next/head";

import TopAppBar from "components/common/TopAppBar";
import ReportsHeading from "components/reports/ReportsHeading";
import TaskRecordList from "components/reports/TaskRecordList";
import PomodoroList from "components/reports/PomodoroRecordList";
import styles from "pages/reports/Reports.module.scss";
import { Task } from "types/task";
import { Pomodoro } from "types/pomodoro";

type Props = {
  tasks: Task[];
  pomodoros: Pomodoro[];
};

const Reports = ({ tasks, pomodoros }: Props): JSX.Element => (
  <>
    <Head>
      <title>レポート - tomeit</title>
    </Head>

    <TopAppBar />
    <main className={styles.main}>
      <ReportsHeading />
      <TaskRecordList tasks={tasks} />
      <PomodoroList pomodoros={pomodoros} />
    </main>
  </>
);

const ReportsContainer = (): JSX.Element => {
  const [tasks] = useState<Task[]>([]);
  const [pomodoros] = useState<Pomodoro[]>([]);

  // useEffect(() => {
  //   const today = new Date().toISOString();
  //   getData(`/tasks?is-completed=true&completed-on=${today}`, currentUser)
  //     .then((data) => {
  //       if (isTasksResponse(data)) {
  //         const tasks = data.tasks.map((t) => newTask(t));
  //         setTasks(tasks);
  //       }
  //     })
  //     .catch((error) => {
  //       window.alert(
  //         "タスクの読み込みに失敗しました。ページを再読み込みしてください"
  //       );
  //       console.log("getTasks failed:", error);
  //     });
  //   getData(`/pomodoros?completed-on=${today}`, currentUser)
  //     .then((data) => {
  //       if (isPomodorosResponse(data)) {
  //         const pomodoros = data.pomodoros.map((p) => newPomodoro(p));
  //         setPomodoros(pomodoros);
  //       }
  //     })
  //     .catch((error) => {
  //       window.alert(
  //         "ポモドーロ記録の読み込みに失敗しました。ページを再読み込みしてください"
  //       );
  //       console.log("getPomodoros failed:", error);
  //     });
  // }, [currentUser]);

  return <Reports tasks={tasks} pomodoros={pomodoros} />;
};

export default ReportsContainer;
