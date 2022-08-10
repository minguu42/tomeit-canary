import { NextPage } from "next";

import TopAppBar from "@/components/features/TopAppBar";
import NavigationDrawer from "@/components/features/NavigationDrawer";
import LoginDialog from "@/components/features/LoginDialog";
import * as s from "./Tasks.css";

// Tasksはタスク管理ページに対応するページコンポーネント
const Tasks: NextPage = () => {
  return (
    <div className={s.background}>
      <TopAppBar />
      <div className={s.sideLayout}>
        <NavigationDrawer />
        <div className={s.body}>body</div>
      </div>
      <LoginDialog />
    </div>
  );
};

export default Tasks;
