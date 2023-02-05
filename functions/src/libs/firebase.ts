import * as admin from "firebase-admin";

admin.initializeApp();

const db = admin.firestore();
const auth = admin.auth();
const timestamp = admin.firestore.FieldValue.serverTimestamp();

export { admin, db, auth, timestamp };
