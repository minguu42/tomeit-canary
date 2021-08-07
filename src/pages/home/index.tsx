import { useState, useEffect } from "react";
import Head from "next/head";

import Header from "components/common/Header";
import StatusBar from "components/StatusBar";
import AddTaskForm from "components/AddTaskForm";
import TaskList from "components/TaskList";
import PomodoroPlayer from "components/PomodoroPlayer";
import Footer from "components/common/Footer";
import styles from "pages/home/Home.module.scss";
import { Task } from "lib/task";
import { fetchData, postData, putData } from "lib/fetch";
import { useAuth } from "lib/AuthContext";

type Props = {
  tasks: Task[];
  playingTask: Task | null;
  restCount: number;
  todayPomodoroNum: number;
  addTask: (task: Task) => void;
  playTask: (task: Task) => void;
  completeTask: (task: Task) => void;
  applyCompletePomodoro: (task: Task | null) => void;
};

const Index = ({
  tasks,
  playingTask,
  restCount,
  todayPomodoroNum,
  addTask,
  playTask,
  completeTask,
  applyCompletePomodoro,
}: Props): JSX.Element => (
  <>
    <Head>
      <title>ホーム - tomeit</title>
    </Head>

    <Header />
    <main className={styles.main}>
      <StatusBar
        restCount={restCount}
        undoneTaskNumber={tasks.length}
        pomodoroNumber={todayPomodoroNum}
      />
      <AddTaskForm addTask={addTask} />
      <TaskList
        tasks={tasks}
        playingTask={playingTask}
        playTask={playTask}
        completeTask={completeTask}
      />
      <div className={styles.playerLayout}>
        <PomodoroPlayer
          restCount={restCount}
          playingTask={playingTask}
          applyCompletePomodoro={applyCompletePomodoro}
        />
      </div>
    </main>
    <Footer />
  </>
);

const HomeContainer = (): JSX.Element => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [playingTask, setPlayingTask] = useState<Task | null>(null);
  const [restCount, setRestCount] = useState(4);
  const [todayPomodoroCount, setTodayPomodoroCount] = useState(0);
  const { currentUser } = useAuth();

  const addTask = (task: Task): void => {
    const reqBody = {
      name: task.name,
      priority: task.priority ?? 0,
      deadline: task.deadline ?? "0001-01-01",
    };
    postData("/tasks", reqBody, currentUser)
      .then((data) => {
        const tmp = tasks.slice();
        tmp.push(data);
        setTasks(tmp);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const playTask = (task: Task): void => {
    setPlayingTask(task);
  };

  const completeTask = (task: Task): void => {
    putData("/tasks/done/" + String(task.id), {}, currentUser)
      .then(() => {
        const tmp = tasks.filter((t) => t.id !== task.id);
        setTasks(tmp);

        if (playingTask?.id === task.id) {
          setPlayingTask(null);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const applyCompletePomodoro = (task: Task | null): void => {
    if (task !== null) {
      task.pomodoroCount += 1;
      const tmp = tasks.slice();
      const index = tasks.findIndex((t) => t.id === task.id);
      tmp[index] = task;
      setTasks(tmp);

      const req = { taskID: task.id };
      postData("/pomodoros/records", req, currentUser)
        .then()
        .catch((error) => {
          console.log(error);
        });
    }

    setTodayPomodoroCount((n) => n + 1);
    setRestCount((c) => (c === 1 ? 4 : c - 1));
  };

  useEffect(() => {
    fetchData("/tasks/undone", currentUser)
      .then((data) => {
        if (data.tasks === null) {
          setTasks([]);
        } else {
          setTasks(data.tasks);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    fetchData("/pomodoros/rest-count", currentUser)
      .then((data) => {
        console.log(data.restCount);
        setRestCount(data.restCount);
      })
      .catch((error) => {
        console.log("fetch restCount", error);
      });

    fetchData("/pomodoros/records/count/today", currentUser)
      .then((data) => {
        setTodayPomodoroCount(data.todayPomodoroCount);
      })
      .catch((error) => {
        console.log("fetch todayPomodoroCount error:", error);
      });
  }, [currentUser]);

  return (
    <Index
      tasks={tasks.filter((task) => !task.isDone)}
      addTask={addTask}
      playingTask={playingTask}
      playTask={playTask}
      restCount={restCount}
      todayPomodoroNum={todayPomodoroCount}
      applyCompletePomodoro={applyCompletePomodoro}
      completeTask={completeTask}
    />
  );
};

export default HomeContainer;
