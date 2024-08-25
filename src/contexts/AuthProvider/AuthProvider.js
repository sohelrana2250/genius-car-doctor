import React from "react";
import { createContext } from "react";
import {
  createUserWithEmailAndPassword,
  deleteUser,
  EmailAuthProvider,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  reauthenticateWithCredential,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import app from "../../firebase/firebase.config";
import { useState } from "react";
import { useEffect } from "react";

export const AuthContext = createContext();
const auth = getAuth(app);
const GoogleProvider = new GoogleAuthProvider();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  const googleLogin = () => {
    return signInWithPopup(auth, GoogleProvider);
  };

  const UpdatePassword = async (currentPassword, newPassword) => {
    const user = auth.currentUser;
    const credential = EmailAuthProvider.credential(
      user.email,
      currentPassword
    );
    const varification = await reauthenticateWithCredential(user, credential);

    if (!varification?.user) {
      throw new Error("Validation Error");
    }

    await updatePassword(user, newPassword);

    return "Successfully Reset";
  };

  const DeleteAccount = () => {
    return deleteUser(auth.currentUser);
  };

  const EmailVarification = () => {
    return sendEmailVerification(auth.currentUser);
  };

  const ResetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };
  const updateUser = (userInfo) => {
    return updateProfile(auth.currentUser, userInfo);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    loading,
    createUser,
    login,
    logOut,
    UpdatePassword,
    ResetPassword,
    updateUser,
    DeleteAccount,
    EmailVarification,
    googleLogin,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
