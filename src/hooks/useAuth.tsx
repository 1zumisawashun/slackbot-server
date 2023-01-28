import { projectAuth } from "../libs/firebase";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useEffect } from "react";

type Params = {
  email: string;
  password: string;
};

export const useAuth = () => {
  const loginWithEmailandPassword = async (params: Params) => {
    const { email, password } = params;
    const res = await createUserWithEmailAndPassword(
      projectAuth,
      email,
      password
    );
    console.log(res);
  };

  const loginWithGoogle = async () => {
    const googleProvider = new GoogleAuthProvider();
    googleProvider.addScope(
      "https://www.googleapis.com/auth/contacts.readonly"
    );
    const res = await signInWithPopup(projectAuth, googleProvider);
    console.log(res);
  };

  useEffect(() => {
    onAuthStateChanged(projectAuth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log(uid);
      } else {
        console.log("user not found");
      }
    });
  }, []);

  return { loginWithEmailandPassword, loginWithGoogle };
};
