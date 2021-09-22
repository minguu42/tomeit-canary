import { NextPage } from "next";
import Head from "next/head";

import TasksPageLayout from "components/common/TasksPageLayout";
import { useRequiredLogin } from "lib/auth";

const Tomorrow: NextPage = () => {
  useRequiredLogin();

  return (
    <>
      <Head>
        <title>明日 - tomeit</title>
      </Head>

      <TasksPageLayout tasksFilter="Tomorrow" />
    </>
  );
};

export default Tomorrow;
