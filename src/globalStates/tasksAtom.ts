import { useCallback } from "react";
import { atom, useRecoilValue, useSetRecoilState } from "recoil";
import { User } from "firebase/auth";

import { Task } from "@/models/task";
import { postTasks } from "@/lib/fetch";

type TasksMutators = {
  initTasks: (tasks: Task[]) => void;
  addTask: (user: User, task: Task) => void;
  replaceTask: (task: Task, newTask: Task) => void;
  deleteTask: (task: Task) => void;
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
    (user: User, task: Task): void => {
      setTasks((prev) => [...prev, task]);
      user
        .getIdToken(true)
        .then((idToken) => {
          postTasks(idToken);
        })
        .catch((error) => {
          console.error(error);
        });
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

  const deleteTask = useCallback(
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

  return { initTasks, addTask, replaceTask, deleteTask };
};
