import { NextPage } from "next";

import TaskAddForm from "@/components/features/TaskAddForm";
import TaskList from "@/components/features/TaskList";
import * as s from "./Tasks.css";

const Tasks: NextPage = () => {
  return (
    <main className={s.main}>
      <TaskAddForm />
      <TaskList />
    </main>
  );
};

export default Tasks;
