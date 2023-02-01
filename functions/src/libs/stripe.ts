import Stripe from "stripe";
import * as dotenv from "dotenv";
dotenv.config();

const STRIPE_SECRET_API_KEY = process.env.STRIPE_SECRET_API_KEY || "";

export const stripe = new Stripe(STRIPE_SECRET_API_KEY, {
  apiVersion: "2022-11-15",
});
