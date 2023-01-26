import { Stripe, loadStripe } from "@stripe/stripe-js";

let stripePromise: Promise<Stripe | null>;

// NOTE:https://docs.react2025.com/payments/stripe
// NOTE:stripeのクライアントライブラリ
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_API_KEY);
  }

  return stripePromise;
};

export default getStripe;
