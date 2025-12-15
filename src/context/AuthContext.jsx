/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useEffect, useState } from "react";
import axiosSecure from "../api/axiosSecure";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import app from "./../utils/firebaseConfig";

export const AuthContext = createContext(null);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem("token");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      if (user) localStorage.setItem("token", user.accessToken);
      else localStorage.removeItem("token");
    } catch (e) {
      console.log(e);
    }
  }, [user]);

  const login = (userData) => {
    setUser(userData || null);
  };

  // google login with firebase
  const googleSignin = () => {
    return signInWithPopup(auth, provider);
  };

  const logout = async () => {
    try {
      // notify server if endpoint exists
      await axiosSecure.post("/auth/logout");
    } catch (e) {
      console.log(e);
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser: login, logout, googleSignin }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
