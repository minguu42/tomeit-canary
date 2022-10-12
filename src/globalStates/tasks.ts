import { atom, useRecoilValue, useSetRecoilState } from "recoil";

import { Task } from "@/types/task";
import { useCallback } from "react";

const tasks = atom<Task[]>({
  key: "tasks",
  default: [],
});

export const useTasks = (): Task[] => useRecoilValue(tasks);

type tasksMutators = {
  addTask: (task: Task) => void;
};

export const useTasksMutators = (): tasksMutators => {
  const setTasks = useSetRecoilState(tasks);

  const addTask = useCallback(
    (task: Task) => {
      setTasks((prev) => [...prev, task]);
    },
    [setTasks]
  );

  return { addTask };
};
