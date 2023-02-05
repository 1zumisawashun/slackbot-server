import * as functions from "firebase-functions";
import { db } from "../../../libs/firebase";

export const onCreate = functions.https.onCall(async (data, context) => {
  // NOTE:ランダム文字列を生成
  const state: string = db.collection("_").doc().id;
  await db.doc(`states/${state}`).set({ state });

  return state;
});
