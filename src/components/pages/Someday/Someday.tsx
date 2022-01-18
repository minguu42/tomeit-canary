import { NextPage } from "next";

import TasksPage from "@/components/models/task/TasksPage";

export const Someday: NextPage = () => {
  return <TasksPage title="いつか - tomeit" filter="someday" />;
};

export default Someday;
