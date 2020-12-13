import React, { useState, useEffect } from "react";
import * as H from "history";
import { auth } from "../firebase";

interface Props {
  signup: (
    email: string,
    password: string,
    username: string,
    history: H.History
  ) => void;
  signin: (email: string, password: string, history: H.History) => void;
  currentUser: any;
}

const AuthContext = React.createContext<Props>({
  signup: async (
    email: string,
    password: string,
    username: string,
    history: H.History
  ) => {},
  signin: async (email: string, password: string, history: H.History) => {},
  currentUser: null,
});

const AuthProvider: React.FC = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<null | object>(null);

  //signup関数
  const signup = async (
    email: string,
    password: string,
    username: string,
    history: H.History
  ) => {
    try {
      await auth
        .createUserWithEmailAndPassword(email, password)
        .then((tempAuth) => {
          tempAuth.user?.updateProfile({
            displayName: username,
          });
        });
      auth.onAuthStateChanged((user) => setCurrentUser(user));
      history.push("/");
    } catch (error) {
      alert(error);
    }
  };

  //signin関数
  const signin = async (
    email: string,
    password: string,
    history: H.History
  ) => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
      auth.onAuthStateChanged((user) => setCurrentUser(user));
      history.push("/");
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    auth.onAuthStateChanged(setCurrentUser);
  }, []);

  return (
    <AuthContext.Provider value={{ signup, signin, currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
