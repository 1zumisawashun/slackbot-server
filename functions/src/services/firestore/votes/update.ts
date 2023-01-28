import * as functions from "firebase-functions";
import { db, admin } from "../../../libs/firebase";

export const update = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "only authenticated users can sdd requests"
    );
  }

  const usersRef = db.collection("users").doc(context.auth.uid);
  const votesRef = db.collection("votes").doc(data.id);

  const usersSnapshot = await usersRef.get();

  // NOTE:check user hasn't already upvoted the request
  if (usersSnapshot.data()!.upvoteOn.includes(data.id)) {
    throw new functions.https.HttpsError(
      "failed-precondition",
      "You can only upvote something once"
    );
  }

  await usersRef.update({
    upvoteOn: [...usersSnapshot.data()!.upvoteOn, data.id],
  });

  return votesRef.update({
    upvotes: admin.firestore.FieldValue.increment(1),
  });
});
