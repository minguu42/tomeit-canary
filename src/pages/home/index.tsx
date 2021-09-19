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
  tasks: Task[];
  playingTask: Task | null;
  nextRestCount: number;
  addTask: (task: Task) => void;
  completeTask: (task: Task) => void;
  setTask: (task: Task) => void;
  completePomodoro: (task: Task) => void;
};

const Home = ({
  tasks,
  playingTask,
  nextRestCount,
  addTask,
  completeTask,
  setTask,
  completePomodoro,
}: Props): JSX.Element => (
  <>
    <Head>
      <title>ホーム - tomeit</title>
    </Head>

    <TopAppBar />
    <main className={styles.main}>
      <HomeHeading headingText="いつか" tasks={tasks} />
      <div className={styles.taskListLayout}>
        <AddTaskForm addTask={addTask} />
        <TaskList
          tasks={tasks}
          playingTask={playingTask}
          completeTask={completeTask}
          setTask={setTask}
        />
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

  const addTask = (task: Task): void => {
    // もっとシンプルにできるよ
    // const reqBody = {
    //   title: task.title,
    //   expectedPomodoroNumber: task.expectedPomodoroNumber ?? 0,
    //   dueOn: task.dueOn ?? "0001-01-01T00:00:00Z",
    // };
    // postData("/tasks", reqBody, currentUser)
    //   .then((data) => {
    //     if (isTaskResponse(data)) {
    //       const tmp = tasks.slice();
    //       tmp.push(newTask(data));
    //       setTasks(tmp);
    //     }
    //   })
    //   .catch((error) => {
    //     window.alert("タスクの作成に失敗しました。もう一度お試しください");
    //     console.log("postTask failed:", error);
    //   });
    setTasks((prev) => [...prev, task]);
  };

  const completeTask = (task: Task): void => {
    // もっとシンプルに実装しよう
    // const reqBody = {
    //   isCompleted: true,
    // };
    // patchData("/tasks/" + String(task.id), reqBody, currentUser)
    //   .then(() => {
    //     const tmp = tasks.filter((t) => t.id !== task.id);
    //     setTasks(tmp);
    //   })
    //   .catch((error) => {
    //     window.alert("タスクの完了に失敗しました。もう一度お試しください");
    //     console.log("patchTask failed:", error);
    //   });
    const index = tasks.findIndex((t) => t.id == task.id);
    setTasks((prev) => [...prev.slice(0, index), ...prev.slice(index + 1)]);
  };

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
      tasks={tasks}
      playingTask={playingTask}
      nextRestCount={nextRestCount}
      addTask={addTask}
      completeTask={completeTask}
      setTask={setTask}
      completePomodoro={completePomodoro}
    />
  );
};

export default HomeContainer;
