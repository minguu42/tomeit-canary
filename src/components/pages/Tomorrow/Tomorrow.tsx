import { NextPage } from "next";

import TasksPage from "@/components/models/task/TasksPage";

export const Tomorrow: NextPage = () => {
  return <TasksPage title="明日 - tomeit" filter="tomorrow" />;
};

export default Tomorrow;
