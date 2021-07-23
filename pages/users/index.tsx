import { VFC, useState, useEffect } from "react";

import styles from "styles/pages/UserHome.module.scss";
import StatusBar from "components/modules/StatusBar";
import AddTaskForm from "components/modules/AddTaskForm";
import TaskList from "components/modules/TaskList";
import type { Task } from "components/parts/TaskCard";
import PomodoroPlayer from "components/modules/PomodoroPlayer";
import { fetchData, postData, putData } from "../../lib/fetch";
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

const UserHome: VFC<Props> = ({
  tasks,
  playingTask,
  restCount,
  todayPomodoroNum,
  addTask,
  playTask,
  completeTask,
  applyCompletePomodoro,
}) => (
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
);

const UserHomeContainer: VFC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [playingTask, setPlayingTask] = useState<Task | null>(null);
  const [restCount, setRestCount] = useState(4);
  const [todayPomodoroNum, setTodayPomodoroNum] = useState(0);
  const { currentUser } = useAuth();

  const addTask = (task: Task): void => {
    const request = {
      name: task.name,
      priority: task.priority ?? 0,
      deadline: task.deadline ?? "0001-01-01",
    };
    postData("/tasks", request, currentUser)
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
      .then((data) => {
        const tmp = tasks.filter((t) => t.id !== task.id);
        setTasks(tmp);
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
      postData("/pomodoros/logs", req, currentUser)
        .then()
        .catch((error) => {
          console.log(error);
        });
    }

    setTodayPomodoroNum((n) => n + 1);
    setRestCount((c) => (c === 1 ? 4 : c - 1));
  };

  useEffect(() => {
    fetchData("/tasks", currentUser)
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

    fetchData("/pomodoros/rest/count", currentUser)
      .then((data) => {
        setRestCount(data.countToNextRest);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [currentUser]);

  return (
    <UserHome
      tasks={tasks.filter((task) => task.isDone === false)}
      addTask={addTask}
      playingTask={playingTask}
      playTask={playTask}
      restCount={restCount}
      todayPomodoroNum={todayPomodoroNum}
      applyCompletePomodoro={applyCompletePomodoro}
      completeTask={completeTask}
    />
  );
};

export default UserHomeContainer;
