import * as functions from "firebase-functions";
import { db } from "../libs/firebase";

export const getLineCodeWebhook = functions.https.onRequest(
  async (req, res) => {
    const code = req.query.code;
    const state = req.query.state;
    const isValidState = (await db.doc(`states/${state}`).get()).exists;
    if (!isValidState) return;

    if (code) {
      res.redirect(`https://slackbot-server-db4d4.web.app/login?code=${code}`);
    } else {
      res.redirect(`https://slackbot-server-db4d4.web.app`);
    }
  }
);
