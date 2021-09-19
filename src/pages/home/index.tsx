import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import TopAppBar from "components/common/TopAppBar";
import HomeHeading from "components/home/HomeHeading";
import AddTaskForm from "components/home/AddTaskForm";
import TaskList from "components/home/TaskList";
import PomodoroPlayer from "components/home/PomodoroPlayer";
import styles from "./styles.module.scss";
import { Task } from "models/task";
import { useAuth } from "contexts/AuthContext";

type Props = {
  playingTask: Task | null;
  nextRestCount: number;
  setTask: (task: Task) => void;
  completePomodoro: (task: Task) => void;
};

const Home = ({
  playingTask,
  nextRestCount,
  setTask,
  completePomodoro,
}: Props): JSX.Element => (
  <>
    <Head>
      <title>ホーム - tomeit</title>
    </Head>

    <TopAppBar />
    <main className={styles.main}>
      <HomeHeading />
      <div className={styles.taskListLayout}>
        <AddTaskForm />
        <TaskList playingTask={playingTask} setTask={setTask} />
      </div>
      <div className={styles.playerLayout}>
        <PomodoroPlayer
          playingTask={playingTask}
          nextRestCount={nextRestCount}
          completePomodoro={completePomodoro}
        />
      </div>
    </main>
  </>
);

const HomeContainer = (): JSX.Element => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [playingTask, setPlayingTask] = useState<Task | null>(null);
  const [nextRestCount, setNextRestCount] = useState(4);
  const router = useRouter();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser === null) {
      router.push("/").catch((error) => {
        console.error(error);
        window.alert("エラーが発生しました.");
      });
    }
  });

  // useEffect(() => {
  //   getData("/tasks?is-completed=false", currentUser)
  //     .then((data) => {
  //       if (isTasksResponse(data)) {
  //         const tasks = data.tasks.map((task) => newTask(task));
  //         setTasks(tasks);
  //       }
  //     })
  //     .catch((error) => {
  //       window.alert(
  //         "タスクの読み込みに失敗しました。ページを再読み込みしてください"
  //       );
  //       console.log("getTasks failed:", error);
  //     });
  //   getData("/pomodoros/next-rest-count", currentUser)
  //     .then((data) => {
  //       if (isNextRestCountResponse(data)) {
  //         setNextRestCount(data.nextRestCount);
  //       }
  //     })
  //     .catch((error) => {
  //       window.alert(
  //         "次の15分休憩までのカウントの読み込みに失敗しました。ページを再読み込みしてください"
  //       );
  //       console.log("getNextRestCount failed:", error);
  //     });
  // }, [currentUser]);

  const setTask = (task: Task): void => {
    setPlayingTask(task);
  };

  const completePomodoro = (task: Task): void => {
    // もっとシンプルにできるよ
    // const reqBody = { taskID: task.id };
    // postData("/pomodoros", reqBody, currentUser)
    //   .then(() => {
    //     task.actualPomodoroNumber += 1;
    //     const tmp = tasks.slice();
    //     const index = tasks.findIndex((t) => t.id === task.id);
    //     tmp[index] = task;
    //     setTasks(tmp);
    //     setNextRestCount((c) => (c === 1 ? 4 : c - 1));
    //   })
    //   .catch((error) => {
    //     window.alert("ポモドーロの記録に失敗しました。もう一度お試しください");
    //     console.log("postPomodoros failed:", error);
    //   });
    const index = tasks.findIndex((t) => t.id === task.id);
    task.actualPomodoroNumber += 1;
    setTasks((prev) => [
      ...prev.slice(0, index),
      task,
      ...prev.slice(index + 1),
    ]);
    setNextRestCount((c) => (c === 1 ? 4 : c - 1));
  };

  return (
    <Home
      playingTask={playingTask}
      nextRestCount={nextRestCount}
      setTask={setTask}
      completePomodoro={completePomodoro}
    />
  );
};

export default HomeContainer;
