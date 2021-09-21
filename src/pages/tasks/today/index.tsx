import { useEffect } from "react";
import { NextPage } from "next";
import Head from "next/head";
import { useSetRecoilState } from "recoil";

import TasksPageLayout from "components/common/TasksPageLayout";
import { tasksFilterState } from "models/task";

const Today: NextPage = () => {
  const setTasksFilter = useSetRecoilState(tasksFilterState);

  useEffect(() => {
    setTasksFilter("Today");
  }, [setTasksFilter]);

  return (
    <>
      <Head>
        <title>今日 - tomeit</title>
      </Head>

      <TasksPageLayout />
    </>
  );
};

export default Today;
