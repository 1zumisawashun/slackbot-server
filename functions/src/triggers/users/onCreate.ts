import * as functions from "firebase-functions";
import { db } from "../../libs/firebase";

export const onCreate = functions.auth.user().onCreate((user) => {
  return db.collection("users").doc(user.uid).set({
    email: user.email,
    upvoteOn: [],
  });
});
