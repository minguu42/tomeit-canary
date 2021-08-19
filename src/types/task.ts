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

export type JsonTask = {
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

export type JsonTasks = {
  tasks: JsonTask[];
};

export const isJsonTask = (arg: unknown): arg is JsonTask => {
  const t = arg as JsonTask;

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

export const isJsonTasks = (arg: unknown): arg is JsonTasks => {
  const ts = arg as JsonTasks;

  return Array.isArray(ts?.tasks) && ts?.tasks.every(isJsonTask);
};

export const newTask = (jsonTask: JsonTask): Task => {
  return {
    id: jsonTask.id,
    title: jsonTask.title,
    expectedPomodoroNumber: jsonTask.expectedPomodoroNumber,
    actualPomodoroNumber: jsonTask.actualPomodoroNumber,
    dueOn:
      jsonTask.dueOn !== "0001-01-01T00:00:00Z"
        ? new Date(jsonTask.dueOn)
        : null,
    isCompleted: jsonTask.isCompleted,
    completedOn:
      jsonTask.completedOn !== "0001-01-01T00:00:00Z"
        ? new Date(jsonTask.completedOn)
        : null,
    createdAt: new Date(jsonTask.createdAt),
    updatedAt: new Date(jsonTask.updatedAt),
  };
};
