import { NextPage } from "next";

import { TaskAddForm } from "@/components/features/TaskAddForm";
import { TaskList } from "@/components/features/TaskList";
import * as s from "./Tasks.css";
import { useTasks } from "@/globalStates/tasks";

export const Tasks: NextPage = () => {
  const tasks = useTasks();
  const filteredTasks = tasks.filter((t) => t.completedOn === null);

  return (
    <main className={s.main}>
      <TaskAddForm />
      <TaskList tasks={filteredTasks} />
    </main>
  );
};
