import { useEffect, useState } from "react";
import "../../App.css";
import { Elements } from "@stripe/react-stripe-js";
import { StripePaymentForm, VoteForm } from "..";
import liff from "../../libs/line";
import stripe from "../../libs/stripe";
import {
  postSlackNotification,
  VITE_SLACK_INCOMING_WEBHOOK,
} from "../../helpers";
import { useAuth, useFunctions } from "../../hooks";
const { onCallDefault, stripeCheckoutSessionsCreate, stripeProductsCreate } =
  useFunctions();

const params = {
  email: "shunshun@gmail.com",
  password: "Test1234",
};

export const Top = () => {
  const [username, setUsername] = useState("");
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [paymentIntentClientSecret, setPIClientSecret] = useState("");

  const { loginWithEmailandPassword } = useAuth();
  const { stripePaymentIntentCreate } = useFunctions();

  const asyncLiffFunc = async () => {
    const profile = await liff.getProfile();
    setUsername(profile.displayName);

    const token = await liff.getAccessToken();
    setAccessToken(token);
  };

  // const asyncStripeFunc = async () => {
  //   const res: any = await stripePaymentIntentCreate();
  //   console.log(res, "res");
  //   setPIClientSecret(res.data.client_secret);
  // };

  useEffect(() => {
    asyncLiffFunc();
    // asyncStripeFunc();
  }, []);

  const handleSlack = () => {
    postSlackNotification(VITE_SLACK_INCOMING_WEBHOOK);
  };

  const handleTest = async () => {
    const res = await onCallDefault({ name: "dammy text" });
    console.log(res);
  };

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
      <h1>Hello World {username}</h1>
      <p>{accessToken}</p>
      <button onClick={handleSlack}>slack</button>
      <button onClick={() => loginWithEmailandPassword(params)}>login</button>
      <button onClick={handleTest}>Test</button>
      <button onClick={handleStripeCheckoutSessionsCreate}>
        Stripe Sessions
      </button>
      <button onClick={handleStripeProductsCreate}>Stripe Products</button>
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
      <VoteForm></VoteForm>
    </div>
  );
};
