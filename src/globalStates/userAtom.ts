import { useCallback } from "react";
import { atom, useRecoilValue, useSetRecoilState } from "recoil";
import { User } from "firebase/auth";

type UserAtom = User | null;

const userAtom = atom<UserAtom>({
  key: "userAtom",
  default: null,
  dangerouslyAllowMutability: true,
});

export const useUserAtom = (): UserAtom => useRecoilValue(userAtom);

type UserMutators = {
  setUser: (user: User) => void;
  unsetUser: () => void;
};

export const useUserMutators = (): UserMutators => {
  const setAtom = useSetRecoilState(userAtom);

  const setUser = useCallback(
    (user: UserAtom) => {
      setAtom(user);
    },
    [setAtom]
  );

  const unsetUser = useCallback(() => setAtom(null), [setAtom]);

  return { setUser, unsetUser };
};
