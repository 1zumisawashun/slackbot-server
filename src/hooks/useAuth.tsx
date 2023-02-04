import { useState, useCallback } from "react";
import { projectAuth } from "../libs/firebase";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useEffect } from "react";

type Params = {
  email: string;
  password: string;
};

export const useAuth = () => {
  const [uid, setUid] = useState<string>("");

  const signup = useCallback(async (params: Params) => {
    const { email, password } = params;
    try {
      await createUserWithEmailAndPassword(projectAuth, email, password);
      location.href = "/";
    } catch (error) {
      alert(error);
    }
  }, []);

  const login = useCallback(async (params: Params) => {
    const { email, password } = params;
    try {
      await signInWithEmailAndPassword(projectAuth, email, password);
      location.href = "/";
    } catch (error) {
      alert(error);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await signOut(projectAuth);
      location.href = "/";
    } catch (error) {
      alert(error);
    }
  }, []);

  useEffect(() => {
    onAuthStateChanged(projectAuth, (user) => {
      if (user) setUid(user.uid);
    });
  }, []);

  return { uid, signup, login, logout };
};
