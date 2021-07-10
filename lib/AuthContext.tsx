import { VFC, createContext, useState, useEffect, useContext } from "react";
import { User } from "@firebase/auth-types";

import Loading from "components/Loading";
// @ts-ignore
import firebase, { auth } from "/lib/firebase";

type AuthContextType = {
  currentUser: User | null;
  login?: () => Promise<void>;
  logout?: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({ currentUser: null });

export const useAuth = () => {
  return useContext(AuthContext);
};

type Props = {
  children?: JSX.Element;
};

const AuthProvider: VFC<Props> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const login = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    return auth.signInWithRedirect(provider);
  };

  const logout = () => {
    return auth.signOut();
  };

  useEffect(() => {
    return auth.onAuthStateChanged((user: User | null) => {
      setCurrentUser(user);
      setIsLoading(false);
    });
  }, []);

  const value: AuthContextType = {
    currentUser,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {isLoading ? <Loading /> : children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
