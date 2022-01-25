import { useCallback } from "react";
import { atom, useRecoilValue, useSetRecoilState } from "recoil";
import { User } from "firebase/auth";

type UserAtom = User | null;

type UserMutators = {
  setUser: (user: UserAtom) => void;
};

const userAtom = atom<UserAtom>({
  key: "userAtom",
  default: null,
  dangerouslyAllowMutability: true,
});

export const useUserAtom = (): UserAtom => useRecoilValue(userAtom);

export const useUserMutators = (): UserMutators => {
  const setAtom = useSetRecoilState(userAtom);

  const setUser = useCallback(
    (user: UserAtom) => {
      setAtom(user);
    },
    [setAtom]
  );

  return { setUser };
};
