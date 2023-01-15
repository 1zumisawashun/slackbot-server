import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import liff from "../libs/line";

export const StripePaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        if (!stripe || !elements) return;
        const result = await stripe.confirmPayment({
          elements,
          redirect: "if_required",
        });
        console.log(result);
        await liff.sendMessages([
          {
            type: "text",
            text: `Your payment id: ${result.paymentIntent?.id}`,
          },
        ]);
      }}
    >
      <PaymentElement />
      <button type="submit">Buy</button>
    </form>
  );
};
