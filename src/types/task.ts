export type Task = {
  id: number;
  title: string;
  expectedPomodoroNum: number;
  actualPomodoroNum: number;
  dueOn: Date;
  isCompleted: boolean;
  completedAt: Date;
  createdAt: Date;
  updatedAt: Date;
};
