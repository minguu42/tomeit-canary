import { useCallback } from "react";
import { atom, useRecoilValue, useSetRecoilState } from "recoil";

import { Task } from "@/models/task/task";

type TasksMutators = {
  initTasks: (tasks: Task[]) => void;
  addTask: (task: Task) => void;
  replaceTask: (task: Task, newTask: Task) => void;
  destroyTask: (task: Task) => void;
};

const tasksAtom = atom<Task[]>({
  key: "tasksAtom",
  default: [],
});

export const useTasksAtom = (): Task[] => useRecoilValue(tasksAtom);

export const useTasksMutators = (): TasksMutators => {
  const setTasks = useSetRecoilState(tasksAtom);

  const initTasks = useCallback(
    (tasks: Task[]): void => {
      setTasks(tasks);
    },
    [setTasks]
  );

  const addTask = useCallback(
    (task: Task): void => {
      setTasks((prev) => [...prev, task]);
    },
    [setTasks]
  );

  const replaceTask = useCallback(
    (task: Task, newTask: Task): void => {
      setTasks((prev) => {
        const index = prev.findIndex((t) => t.id === task.id);
        if (index === -1) {
          return [...prev];
        }
        return [...prev.slice(0, index), newTask, ...prev.slice(index + 1)];
      });
    },
    [setTasks]
  );

  const destroyTask = useCallback(
    (task: Task): void => {
      setTasks((prev) => {
        const index = prev.findIndex((t) => t.id === task.id);
        if (index === -1) {
          return [...prev];
        }
        return [...prev.slice(0, index), ...prev.slice(index + 1)];
      });
    },
    [setTasks]
  );

  return { initTasks, addTask, replaceTask, destroyTask };
};
