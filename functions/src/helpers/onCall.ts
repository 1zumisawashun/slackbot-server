import * as functions from "firebase-functions";
import { db, admin } from "../libs/firebase";

export const onCallDefault = functions.https.onCall((data, context) => {
  const name = data.name;
  return `Hello, ${name}`;
});

export const onCallCreateVotes = functions.https.onCall((data, context) => {
  //dataはフロントから送られる情報
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

export const onCallUpvotes = functions.https.onCall(async (data, context) => {
  //data = フロントからの情報（request.idが格納されている）
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "only authenticated users can sdd requests"
    );
  }
  //get refs for user doc & request doc
  const user = db.collection("users").doc(context.auth.uid);
  const vote = db.collection("votes").doc(data.id);

  const doc = await user.get();
  //check user hasn't already upvoted the request
  if (doc.data()!.upvoteOn.includes(data.id)) {
    throw new functions.https.HttpsError(
      "failed-precondition",
      "You can only upvote something once"
    );
  }
  //update user array
  await user.update({
    upvoteOn: [...doc.data()!.upvoteOn, data.id], //NOTE:requestのidが入る
  });
  return vote.update({
    upvotes: admin.firestore.FieldValue.increment(1),
  });
});
