import { NextPage } from "next";

import Header from "@/components/features/Header";
import Drawer from "@/components/features/Drawer";
import TaskList from "@/components/features/TaskList";
import SideSheet from "@/components/features/SideSheet";
import * as s from "./Focus.css";

const Focus: NextPage = () => {
  return (
    <div className={s.background}>
      <Header />
      <div className={s.sideLayout}>
        <Drawer />
        <main className={s.main}>
          <TaskList />
        </main>
        <SideSheet />
      </div>
    </div>
  );
};

export default Focus;
