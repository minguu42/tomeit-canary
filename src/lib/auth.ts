import {
  getAuth,
  GoogleAuthProvider,
  signInWithRedirect,
  signOut,
} from "firebase/auth";

import { app } from "@/lib/firebase";

export const login = (): Promise<void> => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth(app);
  return signInWithRedirect(auth, provider);
};

export const logout = (): Promise<void> => {
  const auth = getAuth(app);
  return signOut(auth);
};

export const getIDToken = async (forceRefresh?: boolean): Promise<string> => {
  const auth = getAuth(app);
  const user = auth.currentUser;

  if (user) {
    return await user.getIdToken(forceRefresh);
  } else {
    throw new Error("User not found");
  }
};
