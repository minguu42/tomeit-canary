export type Task = {
  id: number;
  title: string;
  estimatedPomoNum: number;
  completedPomoNum: number;
  dueOn: Date | null;
  completedOn: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
};

export type TaskResponse = {
  id: number;
  title: string;
  estimatedPomoNum: number;
  completedPomoNum: number;
  dueOn: string;
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
    typeof t?.estimatedPomoNum === "number" &&
    typeof t?.completedPomoNum === "number" &&
    typeof t?.dueOn === "string" &&
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
    estimatedPomoNum: taskResponse.estimatedPomoNum,
    completedPomoNum: taskResponse.completedPomoNum,
    dueOn: taskResponse.dueOn !== "" ? new Date(taskResponse.dueOn) : null,
    completedOn:
      taskResponse.completedOn !== ""
        ? new Date(taskResponse.completedOn)
        : null,
    createdAt: new Date(taskResponse.createdAt),
    updatedAt: new Date(taskResponse.updatedAt),
  };
};
