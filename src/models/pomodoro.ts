import { isTaskResponse, TaskResponse } from "./task";

export type PomodoroResponse = {
  id: number;
  task: TaskResponse;
  completedOn: string;
  createdAt: string;
};

export const isPomodoroResponse = (arg: unknown): arg is PomodoroResponse => {
  const p = arg as PomodoroResponse;
  return (
    typeof p?.id === "number" &&
    isTaskResponse(p?.task) &&
    typeof p?.completedOn === "string" &&
    typeof p?.createdAt === "string"
  );
};

export type PomodorosResponse = {
  pomodoros: PomodoroResponse[];
};

export const isPomodorosResponse = (arg: unknown): arg is PomodorosResponse => {
  const ps = arg as PomodorosResponse;

  return (
    Array.isArray(ps?.pomodoros) && ps?.pomodoros.every(isPomodoroResponse)
  );
};

export type Pomodoro = {
  id: number;
  taskTitle: string;
  completedOn: Date;
  createdAt: Date;
};

export const newPomodoro = (pomodoroResponse: PomodoroResponse): Pomodoro => {
  return {
    id: pomodoroResponse.id,
    taskTitle: pomodoroResponse.task.title,
    completedOn: new Date(pomodoroResponse.completedOn),
    createdAt: new Date(pomodoroResponse.createdAt),
  };
};

export type restCountResponse = {
  restCount: number;
};

export const isRestCountResponse = (arg: unknown): arg is restCountResponse => {
  const n = arg as restCountResponse;
  return typeof n?.restCount === "number";
};

// 定数定義
export const POMODORO_TIME = 1500;
export const SHORT_REST_TIME = 300;
export const LONG_REST_TIME = 900;
export const INIT_REST_COUNT = 4;
