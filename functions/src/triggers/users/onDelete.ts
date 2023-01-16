import * as functions from "firebase-functions";
import { db } from "../../libs/firebase";

export const onDelete = functions.auth.user().onDelete((user) => {
  const doc = db.collection("users").doc(user.uid);
  return doc.delete();
});
