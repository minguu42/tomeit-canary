import { NextPage } from "next";

import Header from "@/components/features/Header";
import Drawer from "@/components/features/Drawer";
import TaskAddForm from "@/components/features/TaskAddForm";
import TaskList from "@/components/features/TaskList";
import SideSheet from "@/components/features/SideSheet";
import * as s from "./Tasks.css";

const Tasks: NextPage = () => {
  return (
    <div className={s.background}>
      <Header />
      <div className={s.sideLayout}>
        <Drawer />
        <main className={s.main}>
          <TaskAddForm />
          <TaskList />
        </main>
        <SideSheet />
      </div>
    </div>
  );
};

export default Tasks;
