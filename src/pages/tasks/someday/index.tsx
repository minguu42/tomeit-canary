import { NextPage } from "next";
import Head from "next/head";

import TasksPageLayout from "components/common/TasksPageLayout";

const Today: NextPage = () => (
  <>
    <Head>
      <title>いつか - tomeit</title>
    </Head>

    <TasksPageLayout tasksFilter="Someday" />
  </>
);

export default Today;
