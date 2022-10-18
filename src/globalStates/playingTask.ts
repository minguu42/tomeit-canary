import { Task } from "@/types/task";
import { atom, useRecoilValue, useSetRecoilState } from "recoil";
import { useCallback } from "react";

type PlayingTask = Task | null;

const playingTask = atom<PlayingTask>({
  key: "playingTask",
  default: null,
});

export const usePlayingTask = (): PlayingTask => useRecoilValue(playingTask);

type PlayingTaskMutators = {
  setPlayingTask: (task: Task) => void;
  unsetPlayingTask: () => void;
};

export const usePlayingTaskMutators = (): PlayingTaskMutators => {
  const setAtom = useSetRecoilState(playingTask);

  const setPlayingTask = useCallback(
    (task: Task) => {
      setAtom(task);
    },
    [setAtom],
  );

  const unsetPlayingTask = useCallback(() => {
    setAtom(null);
  }, [setAtom]);

  return { setPlayingTask, unsetPlayingTask };
};
