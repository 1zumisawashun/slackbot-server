import * as functions from "firebase-functions";
import { client } from "../../libs/line";
import { WebhookEvent, TemplateMessage } from "@line/bot-sdk";
import * as ButtonTemplate from "../../constants/buttonTemplate.json";

export const message = functions.https.onRequest((req, res) => {
  const events = req.body.events;

  events.map(async (event: WebhookEvent) => {
    if (event.type !== "message" || event.message.type !== "text") {
      return;
    }

    if (event.message.text === "いでよ") {
      const result = await client.replyMessage(
        event.replyToken,
        ButtonTemplate as TemplateMessage
      );
      res.json(result);
      return;
    }

    const result = await client.replyMessage(event.replyToken, {
      type: "text",
      text: event.message.text,
    });
    res.json(result);
  });
});
