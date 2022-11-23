import { NextPage } from "next";
import useSWR from "swr";

import { TaskAddForm } from "@/components/features/TaskAddForm";
import { TaskList } from "@/components/features/TaskList";
import * as s from "./Tasks.css";
import { useTRPC } from "@/hooks/useTRPC";

export const Tasks: NextPage = () => {
  const trpc = useTRPC();
  const { data } = useSWR("task/list", () => trpc.task.list.query());
  const filteredTasks = data?.filter((t) => t.completedOn === null);

  if (filteredTasks === undefined) {
    return <main>Loading Tasks...</main>;
  }

  return (
    <main className={s.main}>
      <TaskAddForm />
      <TaskList tasks={filteredTasks} />
    </main>
  );
};
