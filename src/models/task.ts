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
