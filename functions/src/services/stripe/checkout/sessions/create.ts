import { stripe } from "../../../../libs/stripe";
import * as functions from "firebase-functions";

export const create = functions.https.onCall(async (data, context) => {
  const name = "テスト";
  const price = 1000;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "jpy",
          product_data: {
            name: name,
          },
          unit_amount: price,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `https://www.google.com/`,
    cancel_url: `https://www.google.com/`,
  });
  return session;
});
