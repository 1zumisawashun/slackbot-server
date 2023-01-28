import { stripe } from "../../../libs/stripe";
import * as functions from "firebase-functions";
import { slackNotification } from "../../../helpers";

export const create = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "failed-precondition",
      "The function must be called while authenticated."
    );
  }

  if (!stripe) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "The functions requires stripe."
    );
  }

  const { uid } = context.auth;

  try {
    const result = await stripe.customers.create({
      ...data,
      description: uid,
    });
    return result;
  } catch (error) {
    const params = {
      uid,
      detail: "creating customer failed",
      error: (error as Error).message,
    };
    throw slackNotification({
      url: "",
      isRich: true,
      params,
    });
  }
});
