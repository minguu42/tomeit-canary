import { useState, useEffect } from "react";
import Head from "next/head";

import styles from "pages/stack/Stack.module.scss";
import TopAppBar from "components/common/TopAppBar";
import StackSection from "components/StackSection";
import Footer from "components/common/Footer";
import { fetchData } from "lib/fetch";
import { useAuth } from "lib/AuthContext";
import type { Task } from "lib/task";
import type { PomodoroRecord } from "lib/pomodoro";

type Props = {
  doneTasks: Task[];
  pomodoroRecords: PomodoroRecord[];
};

const Stack = ({ doneTasks, pomodoroRecords }: Props): JSX.Element => (
  <>
    <Head>
      <title>足跡 - tomeit</title>
    </Head>

    <TopAppBar />
    <main className={styles.main}>
      <StackSection doneTasks={doneTasks} pomodoroRecords={pomodoroRecords} />
    </main>
    <Footer />
  </>
);

const StackContainer = (): JSX.Element => {
  const [doneTasks, setDoneTasks] = useState<Task[]>([]);
  const [pomodoroRecords, setPomodoroRecords] = useState<PomodoroRecord[]>([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    fetchData("/tasks/done", currentUser)
      .then((data) => {
        if (data.tasks === null) {
          setDoneTasks([]);
        } else {
          setDoneTasks(
            data.tasks.filter(
              (t: any) =>
                t.createdAt.slice(0, 10) ===
                new Date().toISOString().slice(0, 10)
            )
          );
        }
      })
      .catch((error) => {
        console.log("fetch doneTasks failed:", error);
      });

    fetchData("/pomodoros/records", currentUser)
      .then((data) => {
        if (data.pomodoroRecords === null) {
          setPomodoroRecords([]);
        } else {
          const pomodoroRecords = data.pomodoroRecords
            .map((r: any) => {
              return {
                id: r.id,
                taskName: r.task.name,
                createdAt: r.createdAt,
              };
            })
            .filter(
              (r: any) =>
                r.createdAt.slice(0, 10) ===
                new Date().toISOString().slice(0, 10)
            );
          setPomodoroRecords(pomodoroRecords);
        }
      })
      .catch((error) => {
        console.log("fetch pomodoroRecords failed:", error);
      });
  }, [currentUser]);

  return <Stack doneTasks={doneTasks} pomodoroRecords={pomodoroRecords} />;
};

export default StackContainer;
