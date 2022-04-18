import { NextPage } from "next";

import TaskPage from "@/components/models/task/TaskPage";

export const Someday: NextPage = () => {
  return <TaskPage title="いつか - tomeit" filter="someday" />;
};

export default Someday;
