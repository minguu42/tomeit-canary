import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { app } from "@/lib/firebase";
import { useUser, useUserMutators } from "@/stores/user";

const REDIRECT_TARGET_URL_AT_NOT_LOGIN = "/";

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

export const useAccessControl = (): void => {
  const user = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user === null && router.pathname === "/account") {
      void router.push(REDIRECT_TARGET_URL_AT_NOT_LOGIN);
    }
  }, [router, user]);
};
