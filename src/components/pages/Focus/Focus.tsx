import { NextPage } from "next";

import TaskList from "@/components/features/TaskList";
import * as s from "./Focus.css";

const Focus: NextPage = () => {
  return (
    <main className={s.main}>
      <TaskList isFocusPage={true} />
    </main>
  );
};

export default Focus;
