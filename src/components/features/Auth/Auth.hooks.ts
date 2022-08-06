import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { useUserAtom, useUserMutators } from "@/globalStates/userAtom";
import { app } from "@/lib/firebase";

const REDIRECT_TARGET_URL_AT_NOT_LOGIN = "/";

export const useAuth = (): boolean => {
  const [isLoading, setIsLoading] = useState(true);
  const { setUser, unsetUser } = useUserMutators();

  useEffect(() => {
    const auth = getAuth(app);
    return onAuthStateChanged(auth, (user) => {
      user != null ? setUser(user) : unsetUser();
      setIsLoading(false);
    });
  }, [setUser, unsetUser]);

  return isLoading;
};

export const useAccessControl = (): void => {
  const user = useUserAtom();
  const router = useRouter();

  useEffect(() => {
    if (user === null && router.pathname === "/account")
      void router.push(REDIRECT_TARGET_URL_AT_NOT_LOGIN);
  }, [router, user]);
};
