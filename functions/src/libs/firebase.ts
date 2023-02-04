import * as admin from "firebase-admin";

admin.initializeApp();

const db = admin.firestore();
const timestamp = admin.firestore.FieldValue.serverTimestamp();

export { admin, db, timestamp };
