import { stripe } from "../../../libs/stripe";
import * as functions from "firebase-functions";

export const create = functions.https.onCall(async (data, context) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: data.amount,
      currency: "jpy",
    });
    return {
      client_secret: paymentIntent.client_secret,
    };
  } catch (e: any) {
    return {
      code: e.code,
      message: e.message,
    };
  }
});
