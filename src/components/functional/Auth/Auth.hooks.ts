import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { useUserAtom, useUserMutators } from "@/globalStates/userAtom";
import { app } from "@/lib/firebase";

const REDIRECT_TARGET_URL_AT_NOT_LOGIN = "/";
const REDIRECT_TARGET_URL_AT_LOGIN = "/tasks/today";

export const useAuth = (): boolean => {
  const [isLoading, setIsLoading] = useState(true);
  const { setUser } = useUserMutators();

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
