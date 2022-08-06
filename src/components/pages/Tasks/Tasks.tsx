import { NextPage } from "next";

import TopAppBar from "@/components/features/TopAppBar";
import s from "./Tasks.module.css";

// Tasksはタスク管理ページに対応するページコンポーネント
const Tasks: NextPage = () => {
  return (
    <div className={s.background}>
      <TopAppBar />
    </div>
  );
};

export default Tasks;
