import type { NextPage } from "next";
import Head from "next/head";
import { Container } from "@chakra-ui/react";

import LayoutWithDrawer from "components/common/LayoutWithDrawer";
import TaskList from "components/models/task/TaskList";
import { Task } from "models/task";

const tasks: Task[] = [
  {
    id: 1,
    title: "タスク1",
    expectedPomodoroNum: 4,
    actualPomodoroNum: 2,
    dueOn: null,
    isCompleted: false,
    completedOn: null,
  },
];

const Today = (): JSX.Element => (
  <>
    <Head>
      <title>Today - tomeit</title>
    </Head>

    <LayoutWithDrawer>
      <Container maxW="container.lg">
        <TaskList tasks={tasks} />
      </Container>
    </LayoutWithDrawer>
  </>
);

const TodayContainer: NextPage = () => {
  return <Today />;
};

export default TodayContainer;
