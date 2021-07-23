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

export type TaskRecord = {
  id: number;
  name: string;
  pomodoroCount: number;
  completeAt: string;
}
