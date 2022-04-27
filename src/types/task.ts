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

export type TasksResponse = {
  tasks: TaskResponse[];
};

export const isTasksResponse = (arg: unknown): arg is TasksResponse => {
  const ts = arg as TasksResponse;

  return Array.isArray(ts?.tasks) && ts?.tasks.every(isTaskResponse);
};

export type Task = {
  id: number;
  title: string;
  estimatedPomoNum: number;
  completedPomoNum: number;
  dueOn: Date | null;
  completedOn: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

export const newTask = (r: TaskResponse): Task => {
  return {
    id: r.id,
    title: r.title,
    estimatedPomoNum: r.estimatedPomoNum,
    completedPomoNum: r.completedPomoNum,
    dueOn: r.dueOn !== "" ? new Date(r.dueOn) : null,
    completedOn: r.completedOn !== "" ? new Date(r.completedOn) : null,
    createdAt: new Date(r.createdAt),
    updatedAt: new Date(r.updatedAt),
  };
};
