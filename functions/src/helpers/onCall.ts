import * as functions from "firebase-functions";

export const onCallDefault = functions.https.onCall((data, context) => {
  const name = data.name;
  return `Hello, ${name}`;
});
