import { NextPage } from "next";

import TasksPage from "@/components/models/task/TasksPage";

export const Today: NextPage = () => {
  return <TasksPage title="今日 - tomeit" filter="today" />;
};

export default Today;
