import { atom, useRecoilValue, useSetRecoilState } from "recoil";
import { Task } from "@/models/task";

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
  replaceTask: (task: Task, newTask: Task) => void;
  deleteTask: (task: Task) => void;
};

export const useTasksActions = (): TasksActions => {
  const setTasks = useSetRecoilState(tasksAtom);

  const initTasks = (tasks: Task[]): void => {
    setTasks(tasks);
  };

  const addTask = (task: Task): void => {
    setTasks((prev) => [...prev, task]);
  };

  const replaceTask = (task: Task, newTask: Task): void => {
    setTasks((prev) => {
      const index = prev.findIndex((t) => t.id === task.id);
      if (index === -1) {
        return [...prev];
      }
      return [...prev.slice(0, index), newTask, ...prev.slice(index + 1)];
    });
  };

  const deleteTask = (task: Task): void => {
    setTasks((prev) => {
      const index = prev.findIndex((t) => t.id === task.id);
      if (index === -1) {
        return [...prev];
      }
      return [...prev.slice(0, index), ...prev.slice(index + 1)];
    });
  };

  return { initTasks, addTask, replaceTask, deleteTask };
};
