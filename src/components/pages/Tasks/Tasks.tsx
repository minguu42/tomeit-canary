import { NextPage } from "next";

import Header from "@/components/features/Header";
import NavigationDrawer from "@/components/features/NavigationDrawer";
import TaskList from "@/components/features/TaskList";
import SideSheet from "@/components/features/SideSheet";
import * as s from "./Tasks.css";

// Tasksはタスク管理ページに対応するページコンポーネント
const Tasks: NextPage = () => {
  return (
    <div className={s.background}>
      <Header />
      <div className={s.sideLayout}>
        <NavigationDrawer />
        <div className={s.body}>
          <TaskList />
        </div>
        <SideSheet />
      </div>
    </div>
  );
};

export default Tasks;
