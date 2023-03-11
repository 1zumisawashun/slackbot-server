import styled from "@emotion/styled";
import {useState,useEffect} from "react"
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  Elements,
} from "@stripe/react-stripe-js";
import { useAuth } from "../../../../hooks";
import { Button } from "../../../uis";
import getStripe from "../../../../libs/stripe";

const GapWrapper = styled("div")`
  display: grid;
  gap: 20px;
  padding: 20px 0;
`;
const ComponentContainer = styled("div")`
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  margin-top: 10px;
  padding: 16px;
  position: relative;
`;
const Title = styled("p")`
  background-color: #f4f4f4;
  font-size: 20px;
  left: 16px;
  padding: 0 8px;
  position: absolute;
  top: -16px;
`;

export const MypageCreditCard = () => {
  const { logout } = useAuth();
  const onChange = () => console.log("test");
  const initStripe =async()=>{
    const stripe = await getStripe();
    const element = stripe?.elements
  }
    setStripe(stripe)
    

  useEffect(()=>{

  },[])
  

  const handleRegisterCreditCard = async (): Promise<void> => {
    if (!elements) {
      return;
    }

    const fieldError = Object.values(cardFormState).find(
      (field) => field.error
    );
    if (fieldError) {
      setErrorMessage(fieldError.error?.message);
      elements.getElement(CardNumberElement)?.focus();
      elements.getElement(CardExpiryElement)?.focus();
      elements.getElement(CardCvcElement)?.focus();
      return;
    }

    if (isCardComplete) {
      setLoading(true);
    } else {
      setErrorMessage("カード情報が不足しています。");
      return;
    }

    const card = elements.getElement(CardNumberElement);
    if (!card) {
      setLoading(false);
      setErrorMessage("カード情報の読み取りに失敗しました。");
      return;
    }

    const payload = await stripe.createPaymentMethod({ type: "card", card });

    if (payload.error) {
      setLoading(false);
      setErrorMessage(payload.error.message);
      return;
    }

    const { id: selectedPaymentMethodID } = payload.paymentMethod;

    try {
      await validatePayments(selectedPaymentMethodID);
    } catch (error) {
      setLoading(false);
      ErrorReport.capture(error);
      setErrorMessage(
        "既に追加されているクレジットカードです。未登録のクレジットカードのみ追加可能です。"
      );
      return;
    }

    try {
      const attachPaymentMethod = httpsCallable(
        STRIPE_PAYMENT_METHOD_ATTACH_API
      );
      await attachPaymentMethod({ paymentMethodID: selectedPaymentMethodID });
    } catch (error) {
      setLoading(false);
      const { details } = JSON.parse(JSON.stringify(error));
      const stripeError = StripeErrors.find(
        (error) => error.code === details?.decline_code
      );
      setErrorMessage(stripeError?.message || DEFAULT_PAYMENT_ERROR);
      return;
    }

    try {
      // update customers default payment method
      const customerUpdate = httpsCallable(STRIPE_CUSTOMER_UPDATE_API);
      await customerUpdate({
        invoice_settings: {
          default_payment_method: selectedPaymentMethodID,
        },
      });
      onCompletion(selectedPaymentMethodID);
    } catch (error) {
      setLoading(false);
      ErrorReport.capture(error);
      setErrorMessage(DEFAULT_PAYMENT_ERROR);
      return;
    }

    setLoading(false);
  };

  return (
    <GapWrapper>
      <ComponentContainer>
        <Title>logout</Title>
        <Elements stripe={stripe}>
          <CardNumberElement
            options={{
              placeholder: "＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊",
            }}
            onChange={onChange}
          />
          <CardExpiryElement
            options={{
              placeholder: "＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊",
            }}
            onChange={onChange}
          />
          <CardCvcElement
            options={{
              placeholder: "＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊",
            }}
            onChange={onChange}
          />
        </Elements>
      </ComponentContainer>
    </GapWrapper>
  );
};
