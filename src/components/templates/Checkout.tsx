import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { StripePaymentForm } from "../models";
import stripe from "../../libs/stripe";
import { useFunctions, useCart } from "../../hooks";

export const Checkout = () => {
  const [paymentIntentClientSecret, setPIClientSecret] = useState("");

  const { stripePaymentIntentCreate } = useFunctions();
  const { totalAmount } = useCart();

  const asyncStripeFunc = async () => {
    const res: any = await stripePaymentIntentCreate({ amount: totalAmount });
    setPIClientSecret(res.data.client_secret);
  };

  useEffect(() => {
    asyncStripeFunc();
  }, []);

  return (
    <>
      {paymentIntentClientSecret ? (
        <Elements
          stripe={stripe()}
          options={{
            clientSecret: paymentIntentClientSecret,
          }}
        >
          <StripePaymentForm />
        </Elements>
      ) : (
        <p>loading...</p>
      )}
    </>
  );
};
