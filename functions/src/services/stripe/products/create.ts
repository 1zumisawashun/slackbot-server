import { stripe } from "../../../libs/stripe";
import * as functions from "firebase-functions";

export const create = functions.https.onCall(async (data, context) => {
  const name = "テスト";
  const price = 1000;

  const product = await stripe.products.create({
    name: name,
  });
  await stripe.prices.create({
    unit_amount: price,
    currency: "jpy",
    product: product.id,
  });
  return product;
});
