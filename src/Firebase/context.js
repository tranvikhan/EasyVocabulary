import React, { useContext, useEffect, useState } from "react";
import { auth } from "./firebase";

const AuthContext = React.createContext();
export function useAuth() {
  return useContext(AuthContext);
}
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [process, setProcess] = useState(true);

  async function signUp(email, password) {
    return await auth.createUserWithEmailAndPassword(email, password);
  }
  async function signIn(email, password) {
    return await auth.signInWithEmailAndPassword(email, password);
  }
  async function signOut() {
    return await auth.signOut();
  }
  async function resetPassword(email) {
    return await auth.sendPasswordResetEmail(email);
  }

  async function updateEmail(email) {
    return await currentUser.updateEmail(email);
  }

  async function updatePassword(password) {
    return await currentUser.updatePassword(password);
  }
  function setProcessAuth(value) {
    setProcess(value);
  }
  useEffect(() => {
    const unSubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unSubscribe;
  }, []);

  const value = {
    currentUser: process === true ? null : currentUser,
    signUp,
    signIn,
    signOut,
    resetPassword,
    updateEmail,
    updatePassword,
    setProcessAuth,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
