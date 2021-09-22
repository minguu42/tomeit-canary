import { NextPage } from "next";
import Head from "next/head";

import TasksPageLayout from "components/common/TasksPageLayout";
import { useRequiredLogin } from "lib/auth";

const Today: NextPage = () => {
  useRequiredLogin();

  return (
    <>
      <Head>
        <title>今日 - tomeit</title>
      </Head>

      <TasksPageLayout tasksFilter="Today" />
    </>
  );
};

export default Today;
