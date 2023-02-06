import { AuthForm } from "../models";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { BaseText } from "../../themes";
import { Button } from "../uis";
import { useAuth } from "../../hooks";

export const Login = () => {
  const { loginWithCustomToken, openLineLoginURL } = useAuth();

  const search = useLocation().search;
  const query = new URLSearchParams(search);
  const code = query.get("code");

  useEffect(() => {
    if (!code) return;
    loginWithCustomToken(code);
  }, [code]);

  return (
    <>
      <BaseText>client_id: {import.meta.env.LINE_LOGIN_CHANNEL_ID}</BaseText>
      <Button onClick={openLineLoginURL}>LINEでログイン</Button>
      <AuthForm type="login" />
    </>
  );
};
