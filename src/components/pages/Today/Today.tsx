import { NextPage } from "next";

import TaskPage from "@/components/models/task/TaskPage";

export const Today: NextPage = () => {
  return <TaskPage title="今日 - tomeit" filter="today" />;
};

export default Today;
