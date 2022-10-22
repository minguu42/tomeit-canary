import { NextPage } from "next";

import Header from "@/components/layouts/Layout/Header";
import Drawer from "@/components/layouts/Layout/Drawer";
import TaskList from "@/components/features/TaskList";
import SideSheet from "@/components/features/SideSheet";
import PomodoroPlayer from "@/components/features/PomodoroPlayer";
import * as s from "./Focus.css";

const Focus: NextPage = () => {
  return (
    <div className={s.background}>
      <Header />
      <div className={s.sideLayout}>
        <Drawer />
        <main className={s.main}>
          <TaskList isFocusPage={true} />
        </main>
        <SideSheet />
      </div>
      <PomodoroPlayer />
    </div>
  );
};

export default Focus;
