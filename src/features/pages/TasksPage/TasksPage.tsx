import { TaskAddForm } from "@/features/task/TaskAddForm/TaskAddForm";
import { TaskList } from "@/features/task/TaskList/TaskList";
import { Task } from "@/features/task/task";
import * as s from "./TasksPage.css"

const ts: Task[] = [
  {
    id: 1,
    title: "タスク1",
    estimatedCount: 4,
    actualCount: 2,
    dueOn: new Date(),
    hasDoToday: true,
    completedOn: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    title: "タスク2",
    estimatedCount: 0,
    actualCount: 0,
    dueOn: new Date(),
    hasDoToday: false,
    completedOn: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const TasksPage = (): JSX.Element => {
  return (
    <main className={s.container}>
      <TaskAddForm />
      <TaskList tasks={ts} />
    </main>
  );
};
