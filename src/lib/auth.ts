import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  getAuth,
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
} from "firebase/auth";

import { useSetUserAtom, useUserAtom } from "@/globalStates/userAtom";
import { app } from "@/lib/firebase";

const REDIRECT_TARGET_URL_AT_NOT_LOGIN = "/";
const REDIRECT_TARGET_URL_AT_LOGIN = "/tasks/today";

export const login = (): Promise<void> => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth(app);
  return signInWithRedirect(auth, provider);
};

export const logout = (): Promise<void> => {
  const auth = getAuth(app);
  return signOut(auth);
};

export const useAuth = (): boolean => {
  const [isLoading, setIsLoading] = useState(true);
  const setUser = useSetUserAtom();

  useEffect(() => {
    const auth = getAuth(app);
    return onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsLoading(false);
    });
  }, [setUser]);

  return isLoading;
};

export const useRequiredLogin = () => {
  const user = useUserAtom();
  const router = useRouter();

  useEffect(() => {
    if (user === null) void router.push(REDIRECT_TARGET_URL_AT_NOT_LOGIN);
  }, [router, user]);
};

export const useLoggedInAlready = () => {
  const user = useUserAtom();
  const router = useRouter();

  useEffect(() => {
    if (user !== null) void router.push(REDIRECT_TARGET_URL_AT_LOGIN);
  }, [router, user]);
};
