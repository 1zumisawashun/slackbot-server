import * as functions from "firebase-functions";
import { db } from "../../libs/firebase";

export const onCreate = functions.firestore
  .document("/{collection}/{id}")
  .onCreate((snap, context) => {
    console.log(snap.data());
    const collection = context.params.collection;
    // const id = context.params.id;
    const activities = db.collection("activities");

    if (collection === "votes") {
      return activities.add({
        text: "a new tutorial request was added",
      });
    }
    if (collection === "users") {
      return activities.add({
        text: "a new user signed up",
      });
    }
    return null;
  });
