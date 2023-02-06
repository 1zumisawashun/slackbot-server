import * as functions from "firebase-functions";
import { db, auth } from "../libs/firebase";
import { LINE_LOGIN_CHANNEL_ID, LINE_LOGIN_CHANNEL_SECRET } from "../libs/line";
const fetch = require("node-fetch");

/**
 * 認可コードをもとにLINEアクセストークンを取得
 * @param code 認可コード
 */
const getAccessToken = async (code: string) => {
  return fetch("https://api.line.me/oauth2/v2.1/token", {
    method: "post",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      grant_type: "authorization_code",
      client_id: LINE_LOGIN_CHANNEL_ID,
      client_secret: LINE_LOGIN_CHANNEL_SECRET,
      redirect_uri: "https://slackbot-server-db4d4.web.app/login",
      // redirect_uri:
      //   "https://us-central1-slackbot-server-db4d4.cloudfunctions.net/getLineCodeWebhook",
    }),
  }).then((r: any) => r.json());
};

/**
 * アクセスコードを使ってLINEトークン＆ユーザー情報を取得
 */
export const getCustomToken = functions.https.onCall(async (data, context) => {
  if (!data) return;

  const res = await getAccessToken(data.code);

  // 認可コードを使ってアクセストークン&ユーザーを取得
  const lineUser = await fetch("https://api.line.me/oauth2/v2.1/verify", {
    method: "post",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      id_token: res.id_token,
      client_id: LINE_LOGIN_CHANNEL_ID,
    }),
  }).then((r: any) => r.json());

  // Firebaseログインに用いるUIDを管理
  let uid: string = context.auth?.uid as string;

  /**
   * https://qiita.com/suin/items/9554c70ed3571be0f08c
   * jsonに変換して標準出力すれば構造化されたログを見ることができる
   */
  console.log(JSON.stringify(context.auth), "context.auth");

  // LINE連携済みのユーザーを取得
  const connectedUser = (
    await db.collection("users").where("lineId", "==", lineUser.sub).get()
  ).docs[0];

  console.log(JSON.stringify(connectedUser), "connectedUser");

  if (uid && !connectedUser?.exists) {
    // ログイン中のユーザーにLINEを連携
    await db.doc(`users/${uid}`).set(
      {
        lineId: lineUser.sub,
      },
      { merge: true }
    );
  } else if (!uid && connectedUser?.exists) {
    // LINE連携済み既存ユーザーID
    uid = connectedUser.id;
  } else if (!uid && !connectedUser?.exists) {
    // 未ログインかつ連携済みユーザーがいなければユーザー新規作成
    uid = lineUser.sub;
    await db.doc(`users/${uid}`).set(
      {
        lineId: lineUser.sub,
        name: lineUser.name,
        photoURL: lineUser.picture,
        email: lineUser.email,
        createdAt: new Date(),
      },
      { merge: true }
    );
  }

  return await auth.createCustomToken(uid);
});
