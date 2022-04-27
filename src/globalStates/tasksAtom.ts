import { atom, useRecoilValue } from "recoil";

import { Task } from "@/types/task";

const tasksAtom = atom<Task[]>({
  key: "tasksAtom",
  default: [],
});

export const useTasksAtom = (): Task[] => useRecoilValue(tasksAtom);
