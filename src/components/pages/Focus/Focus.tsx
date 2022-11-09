import { NextPage } from "next";

import { TaskList } from "@/components/features/TaskList";
import * as s from "./Focus.css";
import { useTasks } from "@/globalStates/tasks";

export const Focus: NextPage = () => {
  const tasks = useTasks();
  const filteredTasks = tasks.filter((t) => t.hasDoToday);

  return (
    <main className={s.main}>
      <TaskList tasks={filteredTasks} />
    </main>
  );
};
