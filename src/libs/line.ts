import liff from "@line/liff";
import { LiffMockPlugin } from "@line/liff-mock";
import LIFFInspectorPlugin from "@line/liff-inspector";

liff.use(new LIFFInspectorPlugin());
liff.use(new LiffMockPlugin());

const liffId = import.meta.env.VITE_LINE_LIFF_ID ?? "";

// @ts-ignore
liff.init({ liffId, mock: true });

if (!liff.isLoggedIn()) {
  // NOTE:未ログインユーザーの場合はLINEログイン画面にリダイレクトさせる
  liff.login();
}

export default liff;
