import { createContext, ReactNode, useEffect, useState } from "react";
import liff from "@line/liff";
import { LiffMockPlugin } from "@line/liff-mock";
import LIFFInspectorPlugin from "@line/liff-inspector";
import { ExtendedInit, LiffMockApi } from "@line/liff-mock";
import { getLiffEnv } from "../helpers";

declare module "@line/liff" {
  interface Liff {
    init: ExtendedInit;
    $mock: LiffMockApi;
  }
}

if (process.env.NODE_ENV !== "production") {
  liff.use(new LIFFInspectorPlugin());
  liff.use(new LiffMockPlugin());

  liff.$mock.set((p) => ({
    ...p,
    getProfile: { displayName: "Cony", userId: "1111111" },
    getAccessToken: "CUSTOM_DUMMY_TOKEN",
  }));
}

export const LiffContext = createContext<typeof liff | undefined>(undefined);

// NOTE:適当にReact.FCつけてしまうとprops指定しなくてはいけなくなるのでLiffProviderがエラーになる
export const LiffProvider = ({ children }: { children?: ReactNode }) => {
  const [liffClient, setLiffClient] = useState<typeof liff | undefined>(
    undefined
  );
  const { liffId, mock } = getLiffEnv();

  useEffect(() => {
    (async () => {
      await liff.init({ liffId, mock });
      if (!liff.isLoggedIn()) liff.login({ redirectUri: location.href });
      setLiffClient(liff);
    })();
  }, []);

  return (
    <LiffContext.Provider value={liffClient}>{children}</LiffContext.Provider>
  );
};
