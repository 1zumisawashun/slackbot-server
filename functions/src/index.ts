import * as functions from "firebase-functions";
import { pushToSlack } from "./helpers/pushToSlack";

// // Start writing functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", { structuredData: true });
  const message = `〇〇さんが挨拶をしました。`;
  const url =
    "";
  pushToSlack(message, url);
  response.send("Hello from Firebase!");
});
