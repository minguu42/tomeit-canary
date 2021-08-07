export type Task = {
  id: number;
  name: string;
  priority: number;
  deadline: string;
  isDone: boolean;
  pomodoroCount: number;
  createdAt?: string;
  updatedAt?: string;
};
