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
  toggleHasDoToday: (id: number) => void;
  doneTask: (id: number) => void;
  undoneTask: (id: number) => void;
  deleteTask: (id: number) => void;
};

export const useTasksMutators = (): tasksMutators => {
  const setTasks = useSetRecoilState(tasks);

  const addTask = useCallback(
    (task: Task) => {
      setTasks((prev) => [...prev, task]);
    },
    [setTasks],
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
    [setTasks],
  );

  const toggleHasDoToday = useCallback(
    (id: number) => {
      setTasks((prev) => {
        const index = prev.findIndex((task) => task.id === id);
        const newTask: Task = {
          ...prev[index],
          hasDoToday: !prev[index].hasDoToday,
        };
        return [...prev.slice(0, index), newTask, ...prev.slice(index + 1)];
      });
    },
    [setTasks],
  );

  const doneTask = (id: number) => {
    setTasks((prev) => {
      const index = prev.findIndex((t) => t.id === id);
      const newTask: Task = {
        ...prev[index],
        completedOn: new Date(),
      };
      return [...prev.slice(0, index), newTask, ...prev.slice(index + 1)];
    });
  };

  const undoneTask = (id: number) => {
    setTasks((prev) => {
      const index = prev.findIndex((t) => t.id === id);
      const newTask: Task = {
        ...prev[index],
        completedOn: null,
      };
      return [...prev.slice(0, index), newTask, ...prev.slice(index + 1)];
    });
  };

  const deleteTask = useCallback(
    (id: number) => {
      setTasks((prev) => {
        const index = prev.findIndex((task) => task.id === id);
        return [...prev.slice(0, index), ...prev.slice(index + 1)];
      });
    },
    [setTasks],
  );

  return { addTask, changeTaskTitle, toggleHasDoToday, doneTask, undoneTask, deleteTask };
};
