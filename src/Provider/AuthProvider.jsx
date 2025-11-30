import React, { createContext, useEffect, useState } from "react";
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

  // Register Function
  const registerWithEmailPassword = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Login Function
  const loginWithEmailPassword = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Google Signin / Signup
  const googleSignin = () => {
    return signInWithPopup(auth, provider);
  };

  // Admin users (fixed)
  const adminList = [
    { email: "adminminhaz@gmail.com", uid: "pGsRJnQC69YhN5r72niCmW9eTX93" },
    { email: "adminmuntasir@gmail.com", uid: "KGPbHN4R3tP95naDckPv5TNBW232" },
  ];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        let role = "user"; // default role

        // Check if user is in admin list
        const isAdmin = adminList.some(
          (admin) =>
            admin.uid === firebaseUser.uid || admin.email === firebaseUser.email
        );
        if (isAdmin) {
          role = "admin";
        } else {
          // If not in fixed admin list, try fetching role from Firestore
          try {
            const docRef = doc(db, "users", firebaseUser.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists() && docSnap.data().role) {
              role = docSnap.data().role; // override if Firestore has role
            }
          } catch (err) {
            console.error("Error fetching user role:", err);
          }
        }

        // Set user object including role
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
  }, []);

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
