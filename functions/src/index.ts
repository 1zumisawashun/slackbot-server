import * as functions from "firebase-functions";

import * as triggers from "./triggers";
export { triggers };

import * as services from "./services";
export { services };

import * as webhooks from "./webhooks";
export { webhooks };

export const webhook = functions.https.onRequest(
  (request: functions.https.Request, response: any) => {
    const event = request.body;

    switch (
      event.type // イベントのタイプに応じて処理を行う
    ) {
      case "payment_intent.succeeded": {
        // 例）PaymentIntentによる決済成功時
        const paymentIntent = event.data.object; // PaymentIntentのインスタンスを取得
        console.log(paymentIntent);
        response.json({ received: true }); // ステータス200でレスポンスを返却
        break;
      }
      case "payment_method.attached": {
        // 例）PaymentMethodがカスタマーに紐づけられた時
        const paymentMethod = event.data.object; // PaymentMethodのインスタンスを取得
        console.log(paymentMethod);
        response.json({ received: true }); // ステータス200でレスポンスを返却
        break;
      }
      default: {
        // 想定していないイベントが通知された場合
        return response.status(400).end(); // ステータス400でレスポンスを返却
      }
    }
  }
);

// NOTE:onCallをトリガーにする

export const onCallTemplate = functions.https.onCall((data, context) => {
  const name = data.name;
  return `Hello, ${name}`;
});

const cors = require("cors")({ origin: true });

// NOTE:http通信をトリガーにする

export const onRequestTemplate = functions.https.onRequest(
  (request, response) => {
    functions.logger.info("Hello logs!", { structuredData: true });
    response.send("Hello from Firebase!");
  }
);

export const onRequestWithCors = functions.https.onRequest(
  (request, response) => {
    cors(request, response, async () => {
      const params = { data: "yo some text" };
      response.send(params);
    });
  }
);

export const onRequestRandomNumber = functions.https.onRequest(
  (request, response) => {
    const number = Math.round(Math.random() * 100);
    response.send(number.toString());
  }
);

export const onRequestWithRedirect = functions.https.onRequest(
  (request, response) => {
    response.redirect("https://www.thenetninja.co.uk");
  }
);
