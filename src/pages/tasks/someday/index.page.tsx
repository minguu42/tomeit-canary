import { NextPage } from "next";
import Head from "next/head";

import TasksPageLayout from "components/TasksPageLayout";
import { useRequiredLogin } from "lib/auth";

const Someday: NextPage = () => {
  useRequiredLogin();

  return (
    <>
      <Head>
        <title>いつか - tomeit</title>
      </Head>

      <TasksPageLayout tasksFilter="Someday" />
    </>
  );
};

export default Someday;
