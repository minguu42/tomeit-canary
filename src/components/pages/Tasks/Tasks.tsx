import { NextPage } from "next";

import TopAppBar from "@/components/features/TopAppBar";
import NavigationDrawer from "@/components/features/NavigationDrawer";
import TaskList from "@/components/features/TaskList";
import * as s from "./Tasks.css";

// Tasksはタスク管理ページに対応するページコンポーネント
const Tasks: NextPage = () => {
  return (
    <div className={s.background}>
      <TopAppBar />
      <div className={s.sideLayout}>
        <NavigationDrawer />
        <div className={s.body}>
            <TaskList />
        </div>
      </div>
    </div>
  );
};

export default Tasks;
