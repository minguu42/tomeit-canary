import { useCallback } from "react";
import { atom, useRecoilValue, useSetRecoilState } from "recoil";

import { Task } from "@/types/task";

type TasksMutators = {
  setTasks: (tasks: Task[]) => void;
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
  const setAtom = useSetRecoilState(tasksAtom);

  const setTasks = useCallback(
    (tasks: Task[]): void => {
      setAtom(tasks);
    },
    [setAtom]
  );

  const addTask = useCallback(
    (task: Task): void => {
      setAtom((prev) => [...prev, task]);
    },
    [setAtom]
  );

  const replaceTask = useCallback(
    (task: Task, newTask: Task): void => {
      setAtom((prev) => {
        const index = prev.findIndex((t) => t.id === task.id);
        if (index === -1) {
          return [...prev];
        }
        return [...prev.slice(0, index), newTask, ...prev.slice(index + 1)];
      });
    },
    [setAtom]
  );

  const destroyTask = useCallback(
    (task: Task): void => {
      setAtom((prev) => {
        const index = prev.findIndex((t) => t.id === task.id);
        if (index === -1) {
          return [...prev];
        }
        return [...prev.slice(0, index), ...prev.slice(index + 1)];
      });
    },
    [setAtom]
  );

  return { setTasks, addTask, replaceTask, destroyTask };
};
