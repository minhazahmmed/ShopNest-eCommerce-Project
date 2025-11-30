
import React, { createContext, useEffect, useMemo, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import auth, { db } from "../firebase/firebase.config";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const provider = new GoogleAuthProvider();

  // --- single admin definition ---
  const adminList = useMemo(
    () => [
      {
    email: import.meta.env.VITE_ADMIN_EMAIL,
    uid: import.meta.env.VITE_ADMIN_UID,
  },
    ],
    []
  );

  // Auth helpers
  const registerWithEmailPassword = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  const loginWithEmailPassword = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const googleSignin = () => signInWithPopup(auth, provider);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        let role = "user";

        // check fixed admin list
        const isAdmin = adminList.some(
          (a) => a.uid === firebaseUser.uid || a.email === firebaseUser.email
        );

        if (isAdmin) {
          role = "admin";
        } else {
          // try Firestore users/{uid} role fallback (optional)
          try {
            const docRef = doc(db, "users", firebaseUser.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists() && docSnap.data().role) {
              role = docSnap.data().role;
            }
          } catch (err) {
            console.error("Error fetching user role:", err);
          }
        }

        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
          role,
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [adminList]);

  const authdata = {
    registerWithEmailPassword,
    loginWithEmailPassword,
    googleSignin,
    user,
    setUser,
    loading,
  };

  return (
    <AuthContext.Provider value={authdata}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
