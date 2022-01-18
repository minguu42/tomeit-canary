import { atom, useRecoilValue, useSetRecoilState } from "recoil";
import { User } from "firebase/auth";

type UserAtom = User | null;

const userAtom = atom<UserAtom>({
  key: "userAtom",
  default: null,
  dangerouslyAllowMutability: true,
});

export const useUserAtom = (): UserAtom => {
  return useRecoilValue(userAtom);
};

export const useSetUserAtom = () => {
  return useSetRecoilState(userAtom);
};
