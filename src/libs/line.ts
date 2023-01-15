import liff from "@line/liff";
import { LiffMockPlugin } from "@line/liff-mock";
import LIFFInspectorPlugin from "@line/liff-inspector";

liff.use(
  new LIFFInspectorPlugin({ origin: "wss://3712-124-87-222-3.ngrok.io" })
);
liff.use(new LiffMockPlugin());

const liffId = import.meta.env.VITE_LINE_LIFF_ID ?? "";

// @ts-ignore
await liff.init({ liffId, mock: true });

if (!liff.isLoggedIn()) {
  // NOTE:未ログインユーザーの場合はLINEログイン画面にリダイレクトさせる
  await liff.login();
}

const profile = await liff.getProfile();
console.log(profile);

const accessToken = await liff.getAccessToken();
console.log({ accessToken });

export default liff;
