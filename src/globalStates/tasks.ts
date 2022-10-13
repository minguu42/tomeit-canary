import { useCallback } from "react";
import { atom, useRecoilValue, useSetRecoilState } from "recoil";

import { Task } from "@/types/task";

const tasks = atom<Task[]>({
  key: "tasks",
  default: [],
});

export const useTasks = (): Task[] => useRecoilValue(tasks);

type tasksMutators = {
  addTask: (task: Task) => void;
  changeTaskTitle: (id: number, newTitle: string) => void;
  deleteTask: (id: number) => void;
};

export const useTasksMutators = (): tasksMutators => {
  const setTasks = useSetRecoilState(tasks);

  const addTask = useCallback(
    (task: Task) => {
      setTasks((prev) => [...prev, task]);
    },
    [setTasks]
  );

  const changeTaskTitle = useCallback(
    (id: number, newTitle: string) => {
      setTasks((prev) => {
        const index = prev.findIndex((task) => task.id === id);
        const newTask: Task = {
          ...prev[index],
          title: newTitle,
        };
        return [...prev.slice(0, index), newTask, ...prev.slice(index + 1)];
      });
    },
    [setTasks]
  );

  const deleteTask = useCallback(
    (id: number) => {
      setTasks((prev) => {
        const index = prev.findIndex((task) => task.id === id);
        return [...prev.slice(0, index), ...prev.slice(index + 1)];
      });
    },
    [setTasks]
  );

  return { addTask, changeTaskTitle, deleteTask };
};
