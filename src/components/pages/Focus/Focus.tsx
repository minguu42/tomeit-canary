import { NextPage } from "next";
import useSWR from "swr";

import { TaskList } from "@/components/features/TaskList";
import * as s from "./Focus.css";
import { useTRPC } from "@/hooks/useTRPC";

export const Focus: NextPage = () => {
  const trpc = useTRPC();
  const { data } = useSWR("task/list", () => trpc.task.list.query());
  const filteredTasks = data?.filter((t) => t.hasDoToday);

  if (filteredTasks === undefined) {
    return <main>Loading Tasks...</main>;
  }

  return (
    <main className={s.main}>
      <TaskList tasks={filteredTasks} />
    </main>
  );
};
