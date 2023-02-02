import * as functions from "firebase-functions";
import { db } from "../../../libs/firebase";

export const onDelete = functions.https.onCall((data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "only authenticated users can sdd requests"
    );
  }

  if (!data.id) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "request must be no more than 30 characters long"
    );
  }

  return db.collection("votes").doc(data.id).delete();
});
