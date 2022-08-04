import { NextPage } from "next";

import TopAppBar from "@/components/features/TopAppBar";
import s from "./TasksPage.module.css";

const TasksPage: NextPage = () => {
  return (
    <div className={s.background}>
      <TopAppBar />
    </div>
  );
};

export default TasksPage;
