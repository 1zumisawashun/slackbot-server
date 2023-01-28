import * as functions from "firebase-functions";

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
