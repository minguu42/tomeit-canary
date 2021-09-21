import { NextPage } from "next";
import Head from "next/head";

import TasksPageLayout from "components/common/TasksPageLayout";

const Today: NextPage = () => (
  <>
    <Head>
      <title>明日 - tomeit</title>
    </Head>

    <TasksPageLayout tasksFilter="Tomorrow" />
  </>
);

export default Today;
