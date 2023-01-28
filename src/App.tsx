import { useEffect, useState } from "react";
import "./App.css";
import { Elements } from "@stripe/react-stripe-js";
import { StripePaymentForm } from "./components";
import liff from "./libs/line";
import stripe from "./libs/stripe";
import { postSlackNotification, VITE_SLACK_INCOMING_WEBHOOK } from "./helpers";
import { Vote } from "./components/Vote";
import { useAuth, useFunctions } from "./hooks";

const params = {
  email: "shunshun@gmail.com",
  password: "Test1234",
};

function App() {
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

  const asyncStripeFunc = async () => {
    const res: any = await stripePaymentIntentCreate();
    console.log(res, "res");
    setPIClientSecret(res.data.client_secret);
  };

  useEffect(() => {
    asyncLiffFunc();
    asyncStripeFunc();
  }, []);

  const handleSlack = () => {
    postSlackNotification(VITE_SLACK_INCOMING_WEBHOOK);
  };

  return (
    <div className="App">
      <h1>Hello World {username}</h1>
      <p>{accessToken}</p>
      <button onClick={handleSlack}>slack</button>
      <button onClick={() => loginWithEmailandPassword(params)}>login</button>
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
      <Vote></Vote>
    </div>
  );
}

export default App;
