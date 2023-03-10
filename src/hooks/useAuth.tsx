import { useState, useCallback } from "react";
import { projectAuth } from "../libs/firebase";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  signInWithCustomToken,
  updateEmail,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
  User,
} from "firebase/auth";
import { useEffect } from "react";
import { useFunctions } from "../hooks";

type Params = {
  email: string;
  password: string;
};

type UpdateEmailParams = {
  email: string;
  newEmail: string;
  password: string;
};

type UpdatePasswordParams = {
  email: string;
  newPassword: string;
  password: string;
};

type CredentialParams = {
  email: string;
  password: string;
  currentUser: User;
};

export const useAuth = () => {
  const { firestoreStatesCreate, getCustomToken } = useFunctions();
  const [uid, setUid] = useState<string>("");
  const currentUser = projectAuth.currentUser;

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

  const handleCredential = useCallback(async (params: CredentialParams) => {
    const { email, password, currentUser } = params;
    const credential = await EmailAuthProvider.credential(email, password);
    await reauthenticateWithCredential(currentUser, credential);
  }, []);

  const handleUpdateEmail = useCallback(async (params: UpdateEmailParams) => {
    const { email, newEmail, password } = params;
    if (!currentUser) return;

    await handleCredential({ email, password, currentUser });

    try {
      await updateEmail(currentUser, newEmail);
    } catch (error) {
      const copiedError = error as any;
      console.log(copiedError);
    }
  }, []);

  const handleUpdatePassword = useCallback(
    async (params: UpdatePasswordParams) => {
      const { email, newPassword, password } = params;
      if (!currentUser) return;

      await handleCredential({ email, password, currentUser });

      try {
        await updatePassword(currentUser, newPassword);
      } catch (error) {
        const copiedError = error as any;
        console.log(copiedError);
      }
    },
    []
  );

  const loginWithCustomToken = useCallback(async (code: string) => {
    const customToken: any = await getCustomToken({ code });
    console.log(customToken, "customToken");

    try {
      await signInWithCustomToken(projectAuth, customToken.data);
      location.href = "/";
    } catch (error) {
      alert(error);
    }
  }, []);

  /**
   * openLineLoginURL???????????????????????????????????????????????????????????????URL?????????????????????
   * "https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=???????????????ID&redirect_uri=https%3A%2F%2Fexample.com&state=??????&scope=profile"
   */
  const openLineLoginURL = useCallback(async () => {
    const state: any = await firestoreStatesCreate();
    const url = new URL("https://access.line.me/oauth2/v2.1/authorize");

    url.search = new URLSearchParams({
      response_type: "code", // ?????????code?????????
      client_id: "1657869139", // ?????????????????????????????????ID
      state: state.data, // NOTE:csrf???????????????state????????????????????????
      scope: "profile openid email", // LINE????????????????????????
      bot_prompt: "aggressive", // ??????????????????BOT???????????????????????????
      redirect_uri: "https://slackbot-server-db4d4.web.app/login", // NOTE:URL???redirect_uri???code???state???friendship_status_changed??????????????????
    }).toString();

    window.open(url, "_blank");
  }, []);

  useEffect(() => {
    onAuthStateChanged(projectAuth, (user) => {
      if (user) setUid(user.uid);
    });
  }, []);

  return {
    uid,
    signup,
    logout,
    login,
    loginWithCustomToken,
    openLineLoginURL,
    handleUpdateEmail,
    handleUpdatePassword,
  };
};
