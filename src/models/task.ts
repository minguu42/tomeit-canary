import { atom, selector, useRecoilValue, useSetRecoilState } from "recoil";
import { formatDate } from "../lib/format";

export type Task = {
  id: number;
  title: string;
  expectedPomodoroNum: number;
  actualPomodoroNum: number;
  dueOn: Date | null;
  isCompleted: boolean;
  completedOn: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
};

export type TaskResponse = {
  id: number;
  title: string;
  expectedPomodoroNum: number;
  actualPomodoroNum: number;
  dueOn: string;
  isCompleted: boolean;
  completedOn: string;
  createdAt: string;
  updatedAt: string;
};

export type TasksResponse = {
  tasks: TaskResponse[];
};

export const isTaskResponse = (arg: unknown): arg is TaskResponse => {
  const t = arg as TaskResponse;

  return (
    typeof t?.id === "number" &&
    typeof t?.title === "string" &&
    typeof t?.expectedPomodoroNum === "number" &&
    typeof t?.actualPomodoroNum === "number" &&
    typeof t?.dueOn === "string" &&
    typeof t?.isCompleted === "boolean" &&
    typeof t?.completedOn === "string" &&
    typeof t?.createdAt === "string" &&
    typeof t?.updatedAt === "string"
  );
};

export const isTasksResponse = (arg: unknown): arg is TasksResponse => {
  const ts = arg as TasksResponse;

  return Array.isArray(ts?.tasks) && ts?.tasks.every(isTaskResponse);
};

export const newTask = (taskResponse: TaskResponse): Task => {
  return {
    id: taskResponse.id,
    title: taskResponse.title,
    expectedPomodoroNum: taskResponse.expectedPomodoroNum,
    actualPomodoroNum: taskResponse.actualPomodoroNum,
    dueOn: taskResponse.dueOn !== "" ? new Date(taskResponse.dueOn) : null,
    isCompleted: taskResponse.isCompleted,
    completedOn:
      taskResponse.completedOn !== ""
        ? new Date(taskResponse.completedOn)
        : null,
    createdAt: new Date(taskResponse.createdAt),
    updatedAt: new Date(taskResponse.updatedAt),
  };
};

const tasksState = atom<Task[]>({
  key: "tasksState",
  default: [],
});

type TasksActions = {
  initTasks: (tasks: Task[]) => void;
  addTask: (task: Task) => void;
  replaceTask: (index: number, task: Task) => void;
  deleteTask: (index: number) => void;
};

export const useTasksActions = (): TasksActions => {
  const setTasks = useSetRecoilState(tasksState);

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

export type TasksFilter = "Today" | "Tomorrow" | "Someday";

const tasksFilterState = atom<TasksFilter>({
  key: "tasksFilterState",
  default: "Someday",
});

export const useTasksFilter = (): TasksFilter => {
  return useRecoilValue(tasksFilterState);
};

type TasksFilterActions = {
  initTasksFilter: (filter: TasksFilter) => void;
};

export const useTasksFilterActions = (): TasksFilterActions => {
  const setTasksFilter = useSetRecoilState(tasksFilterState);

  const initTasksFilter = (filter: TasksFilter) => {
    setTasksFilter(filter);
  };

  return { initTasksFilter };
};

const filteredTasksState = selector<Task[]>({
  key: "filteredTasksState",
  get: ({ get }) => {
    const filter = get(tasksFilterState);
    const tasks = get(tasksState);

    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    switch (filter) {
      case "Today":
        return tasks.filter((task) => {
          if (task.dueOn === null) {
            return false;
          } else {
            return formatDate(task.dueOn) === formatDate(today);
          }
        });
      case "Tomorrow":
        return tasks.filter((task) => {
          if (task.dueOn === null) {
            return false;
          } else {
            return formatDate(task.dueOn) === formatDate(tomorrow);
          }
        });
      case "Someday":
        return tasks;
    }
  },
});

export const useFilteredTasks = (): Task[] => {
  return useRecoilValue(filteredTasksState);
};

export const playingTaskState = atom<Task | null>({
  key: "playingTaskState",
  default: null,
});
