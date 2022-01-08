import type { VFC } from "react";

import TaskListItem from "@/components/models/task/TaskListItem";

const TaskList: VFC = () => {
  const tasks = [
    {
      id: 1,
      title: "タスク1",
      expectedPomodoroNum: 4,
      actualPomodoroNum: 2,
      dueOn: new Date(),
      isCompleted: false,
      completedOn: null,
    },
    {
      id: 2,
      title: "ベリーベリーロングネームタスク ~ 宇宙を添えて ~",
      expectedPomodoroNum: 0,
      actualPomodoroNum: 6,
      dueOn: null,
      isCompleted: false,
      completedOn: null,
    },
    {
      id: 3,
      title:
        "ポケットモンスター ルビィ&サファイア ~ はじまりの海、おわりの大地 ~",
      expectedPomodoroNum: 4,
      actualPomodoroNum: 0,
      dueOn: null,
      isCompleted: false,
      completedOn: null,
    },
    {
      id: 4,
      title: "持つもの、持たざるもの",
      expectedPomodoroNum: 0,
      actualPomodoroNum: 0,
      dueOn: null,
      isCompleted: false,
      completedOn: null,
    },
  ];

  return (
    <ul>
      {tasks.map((task) => (
        <TaskListItem key={task.id} task={task} />
      ))}
    </ul>
  );
};

export default TaskList;
