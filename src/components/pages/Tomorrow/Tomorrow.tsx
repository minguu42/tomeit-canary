import { NextPage } from "next";

import TaskPage from "@/components/models/task/TaskPage";

export const Tomorrow: NextPage = () => {
  return <TaskPage title="明日 - tomeit" filter="tomorrow" />;
};

export default Tomorrow;
