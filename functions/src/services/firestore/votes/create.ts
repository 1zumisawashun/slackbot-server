import * as functions from "firebase-functions";
import { db } from "../../../libs/firebase";

export const create = functions.https.onCall((data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "only authenticated users can sdd requests"
    );
  }
  if (data.text.length > 30) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "request must be no more than 30 characters long"
    );
  }
  //onCallはreturnをする
  return db.collection("votes").add({
    text: data.text,
    upvotes: 0,
  });
});
