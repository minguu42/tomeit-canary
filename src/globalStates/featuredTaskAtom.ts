import { useCallback } from "react";
import { atom, useRecoilValue, useSetRecoilState } from "recoil";

import { Task } from "@/models/task/task";

const featuredTaskAtom = atom<Task | null>({
  key: "featuredTaskAtom",
  default: null,
});

export const useFeaturedTaskAtom = () => useRecoilValue(featuredTaskAtom);

type FeaturedTaskMutators = {
  setFeaturedTask: (task: Task) => void;
  unsetFeaturedTask: () => void;
};

export const useFeaturedTaskMutators = (): FeaturedTaskMutators => {
  const setAtom = useSetRecoilState(featuredTaskAtom);

  const setFeaturedTask = useCallback(
    (task: Task) => {
      setAtom(task);
    },
    [setAtom]
  );

  const unsetFeaturedTask = useCallback(() => {
    setAtom(null);
  }, [setAtom]);

  return { setFeaturedTask, unsetFeaturedTask };
};
