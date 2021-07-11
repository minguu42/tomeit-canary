import { VFC, useState } from "react";

import styles from "styles/pages/UserHome.module.scss";
import StatusBar from "components/StatusBar";
import AddTaskForm from "components/AddTaskForm";
import TaskList from "components/TaskList";
import PomodoroPlayer from "components/PomodoroPlayer";
import type { Task } from "components/TaskCard";

type Props = {
  tasks: Task[];
  addTask: (task: Task) => void;
  playingTask: Task | null;
  // playPomodoro: (task: Task) => void;
  restCount: number;
  decreaseRestCount: () => void;
};

const UserHome: VFC<Props> = ({
  tasks,
  addTask,
  playingTask,
  restCount,
  decreaseRestCount,
}) => (
  <main className={styles.main}>
    <StatusBar
      restCount={restCount}
      undoneTaskNumber={tasks.length}
      pomodoroNumber={2}
    />
    <AddTaskForm addTask={addTask} />
    <TaskList tasks={tasks} />
    <div className={styles.playerLayout}>
      <PomodoroPlayer
        restCount={restCount}
        playingTask={playingTask}
        decreaseRestCount={decreaseRestCount}
      />
    </div>
  </main>
);

const UserHomeContainer: VFC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [playingTask, setPlayingTask] = useState<Task | null>(null);
  const [restCount, setRestCount] = useState(4);

  const addTask = (task: Task): void => {
    const tmp = tasks.slice();
    tmp.push(task);
    setTasks(tmp);
  };

  const playTask = (task: Task): void => {
    setPlayingTask(task);
  };

  const decreaseRestCount = (): void => {
    setRestCount((c) => (c === 1 ? 4 : c - 1));
  };

  return (
    <UserHome
      tasks={tasks}
      addTask={addTask}
      playingTask={playingTask}
      restCount={restCount}
      decreaseRestCount={decreaseRestCount}
    />
  );
};

export default UserHomeContainer;
