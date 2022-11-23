import { procedure, router } from "@/server/trpc";
import type { Task } from "@/types/task";

export const taskRouter = router({
  list: procedure.query((req): Task[] => {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9].map((id) => ({
      id: id,
      title: `タスク${id}`,
      estimatedCount: 4,
      actualCount: 2,
      dueOn: null,
      hasDoToday: false,
      completedOn: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));
  }),
});
