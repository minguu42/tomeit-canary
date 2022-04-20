import { atom, useRecoilValue, useSetRecoilState } from "recoil";

import { Task } from "@/models/task/task";
import { useCallback } from "react";

const featuredTaskAtom = atom<Task | null>({
  key: "featuredTaskAtom",
  default: null,
});

export const useFeaturedTaskAtom = () => useRecoilValue(featuredTaskAtom);

type FeaturedTaskMutators = {
  resetFeaturedTask: () => void;
};

export const useFeaturedTaskMutators = (): FeaturedTaskMutators => {
  const setFeaturedTask = useSetRecoilState(featuredTaskAtom);

  const resetFeaturedTask = useCallback(() => {
    setFeaturedTask(null);
  }, [setFeaturedTask]);

  return { resetFeaturedTask };
};
