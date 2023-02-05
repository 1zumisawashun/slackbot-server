import { BaseSyntheticEvent } from "react";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useLiff } from "../../../hooks";
import { Button } from "../../uis";
import { styled } from "@mui/material/styles";

const Container = styled("div")`
  padding: 20px 0;
`;

export const StripePaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { liff, closeWindow } = useLiff();


  const handleMessage = async (id: string) => {
    if (!liff) return;
    await liff.sendMessages([
      {
        type: "text",
        text: `ご購入ありがとうございました。\n ${id}`,
      },
    ]);
    if (closeWindow) closeWindow();
  };

  const handleSubmit = async (e: BaseSyntheticEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    const result = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });
    handleMessage(result.paymentIntent?.id ?? "");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Container>
        <PaymentElement />
      </Container>
      <Button type="submit">購入する</Button>
    </form>
  );
};
