import { createContext, useState, useEffect, useContext } from "react";
import { User } from "@firebase/auth-types";

import Loading from "pages/loading";
import firebase, { auth } from "lib/firebase";

type AuthContextType = {
  currentUser: User | null;
};

const AuthContext = createContext<AuthContextType>({ currentUser: null });

export const useAuth = (): AuthContextType => {
  return useContext(AuthContext);
};

type Props = {
  children?: JSX.Element;
};

const AuthProvider = ({ children }: Props): JSX.Element => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    return auth.onAuthStateChanged((user: User | null) => {
      setCurrentUser(user);
      setIsLoading(false);
    });
  }, []);

  const value: AuthContextType = {
    currentUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {isLoading ? <Loading /> : children}
    </AuthContext.Provider>
  );
};

export const login = (): Promise<void> => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return auth.signInWithRedirect(provider);
};

export const logout = (): Promise<void> => {
  return auth.signOut();
};

export default AuthProvider;
