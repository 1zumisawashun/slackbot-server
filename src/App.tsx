import { useEffect, useState } from "react";
import "./App.css";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { StripePaymentForm } from "./components";
import axios from "axios";
import liff from "./libs/line";

function App() {
  const [username, setUsername] = useState("");
  const [paymentIntentClientSecret, setPIClientSecret] = useState("");

  const asyncLiffFunc = async () => {
    const profile = await liff.getProfile();
    setUsername(profile.displayName);
  };

  const asyncStripeFunc = async () => {
    const res: any = await axios.post(
      "http://localhost:8000/create_payment_intent"
    );
    const clientSecret = res.data.client_secret;
    setPIClientSecret(clientSecret);
  };

  useEffect(() => {
    asyncLiffFunc();
    asyncStripeFunc();
  }, []);

  return (
    <div className="App">
      <h1>Hello {username}</h1>
      {paymentIntentClientSecret ? (
        <Elements
          stripe={loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_API_KEY)}
          options={{
            clientSecret: paymentIntentClientSecret,
          }}
        >
          <StripePaymentForm />
        </Elements>
      ) : null}
    </div>
  );
}

export default App;
