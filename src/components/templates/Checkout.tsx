import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { StripePaymentForm } from "../models";
import stripe from "../../libs/stripe";
import { useFunctions, useCart } from "../../hooks";
import { Button } from "../uis";

export const Checkout = () => {
  const [paymentIntentClientSecret, setPIClientSecret] = useState("");

  const {
    stripePaymentIntentCreate,
    stripeCheckoutSessionsCreate,
    stripeProductsCreate,
  } = useFunctions();

  const asyncStripeFunc = async () => {
    const res: any = await stripePaymentIntentCreate();
    console.log(res, "res");
    setPIClientSecret(res.data.client_secret);
  };

  useEffect(() => {
    asyncStripeFunc();
  }, []);

  const handleStripeCheckoutSessionsCreate = async () => {
    const res = await stripeCheckoutSessionsCreate();
    console.log(res);
  };

  const handleStripeProductsCreate = async () => {
    const res = await stripeProductsCreate();
    console.log(res);
  };

  return (
    <div className="App">
      <Button onClick={handleStripeCheckoutSessionsCreate}>
        Stripe Sessions
      </Button>
      <Button onClick={handleStripeProductsCreate}>Stripe Products</Button>
      {paymentIntentClientSecret ? (
        <Elements
          stripe={stripe()}
          options={{
            clientSecret: paymentIntentClientSecret,
          }}
        >
          <StripePaymentForm />
        </Elements>
      ) : null}
    </div>
  );
};
