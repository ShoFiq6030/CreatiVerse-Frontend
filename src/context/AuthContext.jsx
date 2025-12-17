import React, { createContext, useEffect, useState } from "react";
import axiosSecure from "../api/axiosSecure";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import app from "./../utils/firebaseConfig";

export const AuthContext = createContext(null);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  // On mount → check localStorage token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUserProfile(token);
    } else {
      setAuthLoading(false);
    }
  }, []);

  const fetchUserProfile = async (token) => {
    try {
      const res = await axiosSecure.get(`/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data.data);
    } catch (err) {
      console.error("Failed to fetch user profile:", err);
      logout();
    } finally {
      setAuthLoading(false);
    }
  };

  const login = (userData, token) => {
    localStorage.setItem("token", token);
    setUser(userData || null);
  };

  // google login with firebase
  const googleSignin = () => {
    return signInWithPopup(auth, provider);
  };

  const logout = async () => {
    const token = localStorage.getItem("token");
    try {
      localStorage.removeItem("token");
      // notify server if endpoint exists
      await axiosSecure.post("/auth/logout", {
        headers: { Authorization: `Bearer ${token}` },
      });
      localStorage.removeItem("token");
      setUser(null);
    } catch (e) {
      console.log(e);
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, login, logout, googleSignin, authLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
