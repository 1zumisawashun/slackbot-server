import { useState, useCallback } from "react";
import { projectAuth } from "../libs/firebase";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useEffect } from "react";

type Params = {
  email: string;
  password: string;
};

export const useAuth = () => {
  const [uid, setUid] = useState<string>("");

  const login = useCallback(async (params: Params) => {
    const { email, password } = params;
    const res = await createUserWithEmailAndPassword(
      projectAuth,
      email,
      password
    );
    return res;
  }, []);

  const logout = useCallback(async () => {
    const res = await signOut(projectAuth);
    return res;
  }, []);

  useEffect(() => {
    onAuthStateChanged(projectAuth, (user) => {
      if (user) setUid(user.uid);
    });
  }, []);

  return { uid, login, logout };
};
