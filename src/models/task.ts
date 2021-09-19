import { atom } from "recoil";

export type Task = {
  id: number;
  title: string;
  expectedPomodoroNumber: number;
  actualPomodoroNumber: number;
  dueOn: Date | null;
  isCompleted: boolean;
  completedOn: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
};

export type TaskResponse = {
  id: number;
  title: string;
  expectedPomodoroNumber: number;
  actualPomodoroNumber: number;
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
    typeof t?.expectedPomodoroNumber === "number" &&
    typeof t?.actualPomodoroNumber === "number" &&
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
    expectedPomodoroNumber: taskResponse.expectedPomodoroNumber,
    actualPomodoroNumber: taskResponse.actualPomodoroNumber,
    dueOn:
      taskResponse.dueOn !== "0001-01-01T00:00:00Z"
        ? new Date(taskResponse.dueOn)
        : null,
    isCompleted: taskResponse.isCompleted,
    completedOn:
      taskResponse.completedOn !== "0001-01-01T00:00:00Z"
        ? new Date(taskResponse.completedOn)
        : null,
    createdAt: new Date(taskResponse.createdAt),
    updatedAt: new Date(taskResponse.updatedAt),
  };
};

export const tasksState = atom<Task[]>({
  key: "tasksState",
  default: [],
});
