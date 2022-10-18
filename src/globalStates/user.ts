import { atom, useRecoilValue, useSetRecoilState } from "recoil";
import { User as FirebaseUser } from "firebase/auth";

type User = FirebaseUser | null;

const user = atom<User>({
  key: "user",
  default: null,
  dangerouslyAllowMutability: true,
});

export const useUser = (): User => useRecoilValue(user);

type UserMutators = {
  setUser: (user: User) => void;
};

export const useUserMutators = (): UserMutators => {
  const setUser = useSetRecoilState(user);
  return { setUser };
};
