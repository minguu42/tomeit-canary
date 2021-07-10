import { VFC, createContext, useState, useEffect, useContext } from "react";
// @ts-ignore
import { User } from "firebase";

// @ts-ignore
import firebase, { auth } from "/lib/firebase";

type AuthContextType = {
  currentUser: User | null;
  login?: () => void;
  logout?: () => void;
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
  const [loading, setLoading] = useState(true);

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
      setLoading(false);
    });
  }, []);

  const value: AuthContextType = {
    currentUser,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? <p>loading...</p> : children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
