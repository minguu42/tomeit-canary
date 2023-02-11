import { Firestore } from "@google-cloud/firestore";

import { serverEnv } from "@/configs/serverEnv";
import type { Task } from "@/features/task/task";
import { procedure, router } from "@/server/trpc";

export const taskRouter = router({
  create: procedure.mutation(() => {
    const firestore = new Firestore({
      projectId: serverEnv.GCLOUD_PROJECT,
      credentials: {
        client_email: serverEnv.GCLOUD_CLIENT_EMAIL,
        private_key: serverEnv.GCLOUD_PRIVATE_KEY,
      },
    });
    firestore
      .collection("users")
      .doc("akira")
      .set({
        first: "Akira",
        last: "Furukawa",
        born: 2000,
      })
      .then(() => {
        console.log("set is success!");
      });
  }),
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
