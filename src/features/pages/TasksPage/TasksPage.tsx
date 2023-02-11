import React from "react";
import useSWR from "swr";

import { TaskAddForm } from "@/features/task/TaskAddForm/TaskAddForm";
import { TaskList } from "@/features/task/TaskList/TaskList";
import { useTRPC } from "@/hooks/useTRPC";
import * as s from "./TasksPage.css";

export const TasksPage: React.FC = () => {
  const trpc = useTRPC();
  const { data } = useSWR("task/list", () => trpc.task.list.query());
  if (!data) {
    return <div>Loading...</div>;
  }
  return (
    <main className={s.container}>
      <TaskAddForm />
      <TaskList tasks={data.tasks} />
    </main>
  );
};
