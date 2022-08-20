export type Task = {
  id: number;
  title: string;
  estimatedCount: number;
  actualCount: number;
  dueOn: Date | null;
  hasDoToday: boolean;
  completedOn: Date | null;
  createdAt: Date;
  updatedAt: Date;
};
