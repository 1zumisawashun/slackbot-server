import { BaseSyntheticEvent } from "react";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import liff from "../libs/line";

export const StripePaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const postLiff = async (id: string | undefined) => {
    await liff.sendMessages([
      {
        type: "text",
        text: `Your payment id: ${id}`,
      },
    ]);
  };

  const handleSubmit = async (e: BaseSyntheticEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    const result = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });
    console.log(result);
    postLiff(result.paymentIntent?.id);
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button type="submit">Buy</button>
    </form>
  );
};
