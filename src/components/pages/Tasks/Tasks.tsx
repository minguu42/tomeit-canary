import type { NextPage } from "next";
import Head from "next/head";

import TaskList from "@/components/models/task/TaskList";

export const Tasks: NextPage = () => (
  <>
    <Head>
      <title>Tasks - tomeit</title>
    </Head>

    <main>
      <TaskList />
    </main>
  </>
);

export default Tasks;
