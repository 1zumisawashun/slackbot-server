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

liff.use(new LIFFInspectorPlugin());
liff.use(new LiffMockPlugin());

const liffId = import.meta.env.VITE_LINE_LIFF_ID ?? "";

liff.init({ liffId, mock: true });

liff.$mock.set((p) => ({
  ...p,
  getProfile: { displayName: "Cony", userId: "1111111" },
  getAccessToken: "CUSTOM_DUMMY_TOKEN",
}));

if (!liff.isLoggedIn()) {
  liff.login();
}

export default liff;
