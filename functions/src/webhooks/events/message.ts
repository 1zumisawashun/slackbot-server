import * as functions from "firebase-functions";
import { client } from "../../libs/line";
import { WebhookEvent } from "@line/bot-sdk";

export const message = functions.https.onRequest((req, res) => {
  const events = req.body.events;

  events.map(async (event: WebhookEvent) => {
    if (event.type !== "message" || event.message.type !== "text") {
      return;
    }
    const result = await client.replyMessage(event.replyToken, {
      type: "text",
      text: event.message.text,
    });
    res.json(result);
  });
});
