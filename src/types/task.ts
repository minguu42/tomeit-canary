export type Task = {
  id: number;
  title: string;
  expectedPomodoroNum: number;
  actualPomodoroNum: number;
  dueOn: Date | null;
  isCompleted: boolean;
  completedAt: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
};
