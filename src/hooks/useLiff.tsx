import { useContext } from "react";
import liff from "@line/liff";
import { LiffContext } from "../contexts/liff";

type UseLiff = {
  liff?: typeof liff;
  idToken?: string | null;
  initialized: boolean;
  isInClient: boolean;
  loggedIn: boolean;
  closeWindow?: () => void;
  isExpire: () => boolean;
  login?: () => void;
  logout?: () => void;
};

export const useLiff = (): UseLiff => {
  const liff = useContext(LiffContext);
  if (!liff) {
    return {
      initialized: false,
      isInClient: false,
      loggedIn: false,
      isExpire: () => false,
    };
  }

  const isExpire = (): boolean => {
    if (!liff.isLoggedIn()) return false;
    const expirationTime = liff.getDecodedIDToken()?.exp;
    if (!expirationTime) return false;
    return expirationTime < Date.now() / 1000;
  };

  return {
    liff: liff,
    idToken: liff.getIDToken(),
    initialized: true,
    isInClient: liff.isInClient(),
    loggedIn: liff.isLoggedIn(),
    closeWindow: liff.closeWindow,
    isExpire: isExpire,
    login: liff.login,
    logout: liff.logout,
  };
};
