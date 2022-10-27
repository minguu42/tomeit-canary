import { NextPage } from "next";

import TaskList from "@/components/features/TaskList";
import * as s from "./Focus.css";

const Focus: NextPage = () => {
  return (
    <main className={s.main}>
      <TaskList />
    </main>
  );
};

export default Focus;
