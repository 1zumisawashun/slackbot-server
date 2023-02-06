import { useState, useCallback } from "react";
import { projectAuth } from "../libs/firebase";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  signInWithCustomToken,
} from "firebase/auth";
import { useEffect } from "react";
import { useFunctions } from "../hooks";

type Params = {
  email: string;
  password: string;
};

export const useAuth = () => {
  const { firestoreStatesCreate, getCustomToken } = useFunctions();

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

  const loginWithCustomToken = async (code: string) => {
    const customToken: any = await getCustomToken({ code });
    console.log(customToken, "customToken");

    try {
      await signInWithCustomToken(projectAuth, customToken.data);
      location.href = "/";
    } catch (error) {
      alert(error);
    }
  };

  /**
   * getLineLoginURLイベントハンドラがやりたいのは下記のようなURLの生成
   * "https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=チャンネルID&redirect_uri=https%3A%2F%2Fexample.com&state=乱数&scope=profile"
   */
  const openLineLoginURL = async () => {
    // stateを生成＆取得
    const state: any = await firestoreStatesCreate();
    const url = new URL("https://access.line.me/oauth2/v2.1/authorize");

    url.search = new URLSearchParams({
      response_type: "code", // 固定でcodeとする
      client_id: "1657869139", // チャネルのクライアントID
      state: state.data, // stateを設定
      scope: "profile openid email", // LINEから取得する情報
      bot_prompt: "aggressive", // ログイン時にBOTと連携させたい場合
      redirect_uri: "https://slackbot-server-db4d4.web.app/login",
    }).toString();

    // NOTE:URLに「code」「state」「friendship_status_changed」がついたリダイレクトが実行される
    window.open(url, "_blank");
  };

  useEffect(() => {
    onAuthStateChanged(projectAuth, (user) => {
      if (user) setUid(user.uid);
    });
  }, []);

  return { uid, signup, logout, login, loginWithCustomToken, openLineLoginURL };
};
