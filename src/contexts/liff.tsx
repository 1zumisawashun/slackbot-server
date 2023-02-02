import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import liff from "@line/liff";
import { LiffMockPlugin } from "@line/liff-mock";
import LIFFInspectorPlugin from "@line/liff-inspector";
import { ExtendedInit, LiffMockApi } from "@line/liff-mock";

declare module "@line/liff" {
  interface Liff {
    init: ExtendedInit;
    $mock: LiffMockApi;
  }
}

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

liff.use(new LIFFInspectorPlugin());
liff.use(new LiffMockPlugin());

liff.$mock.set((p) => ({
  ...p,
  getProfile: { displayName: "Cony", userId: "1111111" },
  getAccessToken: "CUSTOM_DUMMY_TOKEN",
}));

const LiffContext = createContext<typeof liff | undefined>(undefined);

// NOTE:適当にReact.FCつけてしまうとprops指定しなくてはいけなくなるのでLiffProviderがエラーになる
export const LiffProvider = ({ children }: { children?: ReactNode }) => {
  const [liffClient, setLiffClient] = useState<typeof liff | undefined>(
    undefined
  );

  useEffect(() => {
    (async () => {
      await liff.init({
        liffId: import.meta.env.VITE_LINE_LIFF_ID || "",
        mock: true,
      });

      if (!liff.isLoggedIn()) liff.login();
      setLiffClient(liff);
    })();
  }, []);

  return (
    <LiffContext.Provider value={liffClient}>{children}</LiffContext.Provider>
  );
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
