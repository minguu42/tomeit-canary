import { atom, useRecoilValue, useSetRecoilState } from "recoil";
import type { Task } from "@/models/task";

const tasksAtom = atom<Task[]>({
  key: "tasksAtom",
  default: [],
});

export const useTasksAtom = (): Task[] => {
  return useRecoilValue(tasksAtom);
};

type TasksActions = {
  initTasks: (tasks: Task[]) => void;
  addTask: (task: Task) => void;
  replaceTask: (index: number, task: Task) => void;
  deleteTask: (index: number) => void;
};

export const useTasksActions = (): TasksActions => {
  const setTasks = useSetRecoilState(tasksAtom);

  const initTasks = (tasks: Task[]): void => {
    setTasks(tasks);
  };

  const addTask = (task: Task): void => {
    setTasks((prev) => [...prev, task]);
  };

  const replaceTask = (index: number, newTask: Task): void => {
    setTasks((prev) => [
      ...prev.slice(0, index),
      newTask,
      ...prev.slice(index + 1),
    ]);
  };

  const deleteTask = (index: number): void => {
    setTasks((prev) => [...prev.slice(0, index), ...prev.slice(index + 1)]);
  };

  return { initTasks, addTask, replaceTask, deleteTask };
};
