import Stripe from "stripe";
import * as dotenv from "dotenv";
dotenv.config();

const API_KEY = process.env.STRIPE_SECRET_API_KEY;
console.log(API_KEY, "API_KEY");

export const stripe = new Stripe(API_KEY!, {
  apiVersion: "2022-11-15",
});
