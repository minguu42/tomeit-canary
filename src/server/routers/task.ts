import type { Task } from "@/features/task/task";
import { procedure, router } from "@/server/trpc";

export const taskRouter = router({
  list: procedure.query(() => {
    const ts: Task[] = [
      {
        id: 1,
        title: "タスク1",
        estimatedCount: 4,
        actualCount: 2,
        dueOn: new Date(),
        hasDoToday: true,
        completedOn: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        title: "タスク2",
        estimatedCount: 0,
        actualCount: 0,
        dueOn: new Date(),
        hasDoToday: false,
        completedOn: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    return {
      tasks: ts,
    };
  }),
});
