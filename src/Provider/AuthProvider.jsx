import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase.config";
import { GoogleAuthProvider } from "firebase/auth";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const provider = new GoogleAuthProvider();

  //   Register Function
  const registerWithEmailPassword = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //   Login Function
  const loginWithEmailPassword = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Google Signin / Signup
  const googleSignin = () => {
    return signInWithPopup(auth, provider);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const authdata = {
    registerWithEmailPassword,
    user,
    setUser,
    loginWithEmailPassword,
    googleSignin,
    loading
  };

  return (
    <AuthContext.Provider value={authdata}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
