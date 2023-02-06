import { AuthForm } from "../models";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../hooks";

export const Login = () => {
  const { loginWithCustomToken, openLineLoginURL } = useAuth();

  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const code = query.get("code");

  useEffect(() => {
    if (!code) return;
    loginWithCustomToken(code);
  }, [code]);

  return <AuthForm type="login" handleLine={openLineLoginURL} />;
};
