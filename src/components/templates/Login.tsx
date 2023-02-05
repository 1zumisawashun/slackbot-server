import { AuthForm } from "../models";
import { useState, useEffect } from "react";
import { useFunctions } from "../../hooks";
import { useLocation } from "react-router-dom";
import { projectAuth } from "../../libs/firebase";
import { signInWithCustomToken } from "firebase/auth";
import { DottedOneLine } from "../../themes";

export const Login = () => {
  const [lineLoginURL, setLineLoginURL] = useState<string>();
  const { firestoreStatesCreate, getCustomToken } = useFunctions();
  const search = useLocation().search;
  const query = new URLSearchParams(search);
  const code = query.get("code");

  /**
   * getLineLoginURLイベントハンドラがやりたいのは下記のようなURLの生成
   * "https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=チャンネルID&redirect_uri=https%3A%2F%2Fexample.com&state=乱数&scope=profile"
   */
  const getLineLoginURL = async () => {
    // stateを生成＆取得
    const state: any = await firestoreStatesCreate();
    const url = new URL("https://access.line.me/oauth2/v2.1/authorize");

    url.search = new URLSearchParams({
      response_type: "code", // 固定でcodeとする
      client_id: import.meta.env.LINE_LOGIN_CHANNEL_ID, // チャネルのクライアントID
      state, // stateを設定
      scope: "profile openid email", // LINEから取得する情報
      bot_prompt: "aggressive", // ログイン時にBOTと連携させたい場合
      redirect_uri: "https://slackbot-server-db4d4.web.app/login",
    }).toString();

    setLineLoginURL(url.href);
  };

  const asyncFunc = async (code: string) => {
    const customToken: any = await getCustomToken({ code });
    signInWithCustomToken(projectAuth, customToken);
  };

  useEffect(() => {
    getLineLoginURL();
  }, []);

  useEffect(() => {
    if (!code) return;
    asyncFunc(code);
  }, [code]);

  return (
    <>
      <DottedOneLine>{lineLoginURL}</DottedOneLine>
      <a href={lineLoginURL} target="_blank" rel="noopenner">
        LINEでログイン
      </a>
      <AuthForm type="login" />
    </>
  );
};
