import { VFC, useState } from "react";

import styles from "styles/pages/UserHome.module.scss";
import StatusBar from "components/StatusBar";
import AddTaskForm from "components/AddTaskForm";
import TaskList from "components/TaskList";
import PomodoroPlayer from "components/PomodoroPlayer";
import type { Task } from "components/TaskCard";

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

  const addTask = (task: Task): void => {
    const tmp = tasks.slice();
    tmp.push(task);
    setTasks(tmp);
  };

  const playTask = (task: Task): void => {
    setPlayingTask(task);
  };

  const completeTask = (task: Task): void => {
    const tmp = tasks.filter((t) => t.id !== task.id);
    setTasks(tmp);
  };

  const applyCompletePomodoro = (task: Task | null): void => {
    if (task !== null) {
      task.pomodoroCount += 1;
      const tmp = tasks.slice();
      const index = tasks.findIndex((t) => t.id === task.id);
      tmp[index] = task;
      setTasks(tmp);
    }

    setTodayPomodoroNum((n) => n + 1);
    setRestCount((c) => (c === 1 ? 4 : c - 1));
  };

  return (
    <UserHome
      tasks={tasks}
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
