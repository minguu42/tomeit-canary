import { useCallback } from "react";
import { atom, useRecoilValue, useSetRecoilState } from "recoil";

import { Task } from "@/types/task";

type RemarkedTask = Task | null;

const remarkedTask = atom<RemarkedTask>({
  key: "remarkedTask",
  default: null,
});

export const useRemarkedTask = (): RemarkedTask => useRecoilValue(remarkedTask);

type RemarkedTaskMutators = {
  setRemarkedTask: (task: Task) => void;
  unsetRemarkedTask: () => void;
};

export const useRemarkedTaskMutators = (): RemarkedTaskMutators => {
  const setAtom = useSetRecoilState(remarkedTask);

  const setRemarkedTask = useCallback(
    (task: Task) => {
      setAtom(task);
    },
    [setAtom],
  );

  const unsetRemarkedTask = useCallback(() => {
    setAtom(null);
  }, [setAtom]);

  return { setRemarkedTask, unsetRemarkedTask };
};
