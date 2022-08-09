import { NextPage } from "next";

import TopAppBar from "@/components/features/TopAppBar";
import * as s from "./Tasks.css";

// Tasksはタスク管理ページに対応するページコンポーネント
const Tasks: NextPage = () => {
  return (
    <div className={s.background}>
      <TopAppBar />
      <div className={s.sideLayout}>
        NavigationDrawer
        <div className={s.body}>body</div>
      </div>
    </div>
  );
};

export default Tasks;
