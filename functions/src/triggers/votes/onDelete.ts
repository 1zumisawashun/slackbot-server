import * as functions from "firebase-functions";
import { db } from "../../libs/firebase";
import { User } from "../../types/User";

export const onDelete = functions.firestore
  .document("/{collection}/{id}")
  .onDelete(async (snap, context) => {
    const collection = context.params.collection;
    const id = context.params.id;

    if (collection === "votes") {
      const usersQuerySnapshot = await db
        .collection("users")
        .where("upvoteOn", "array-contains", id)
        .get();

      const data = usersQuerySnapshot.docs.map(async (doc) => {
        const userRef = db.collection("users").doc(doc.id);
        const userQuerySnapshot = await userRef.get();

        const newUpvoteOn = (userQuerySnapshot.data() as User).upvoteOn.filter(
          (item) => {
            return item !== id;
          }
        );

        const res = await userRef.set({ ...doc.data(), upvoteOn: newUpvoteOn });
        console.log(res);
      });
      console.log(data);
    }

    return null;
  });
