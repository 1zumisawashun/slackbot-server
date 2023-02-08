import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { slackNotification, VITE_SLACK_INCOMING_WEBHOOK } from "../../helpers";
import { useFunctions, useLiff, useAuth } from "../../hooks";
import { Button } from "../uis";
import { DottedOneLine } from "../../themes";

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

const alertText =
  "This button is unavailable as LIFF is currently being opened in an external browser.";

export const Component = () => {
  const [username, setUsername] = useState("");
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const { uid } = useAuth();
  const { onCallTemplate, stripeCheckoutSessionsCreate, stripeProductsCreate } =
    useFunctions();
  const { liff, isInClient, closeWindow, userId } = useLiff();

  const asyncLiffFunc = async () => {
    if (!liff) return;
    const profile = await liff.getProfile();
    setUsername(profile.displayName);
    const token = await liff.getAccessToken();
    setAccessToken(token);
  };

  useEffect(() => {
    asyncLiffFunc();
  }, [liff]);

  const handleSlack = () => {
    const params = {
      url: VITE_SLACK_INCOMING_WEBHOOK,
      isRich: true,
      params: {
        uid: "123456789",
        error: undefined,
        detail: "yo some text",
      },
    };
    slackNotification(params);
  };

  const handleTest = async () => {
    const res = await onCallTemplate({ name: "yo some text" });
    alert(res);
  };

  const postLiff = async () => {
    if (!isInClient || !liff) {
      alert(alertText);
      return;
    }
    try {
      const res = await liff.sendMessages([
        {
          type: "text",
          text: "Hello, World!",
        },
      ]);
      if (closeWindow) closeWindow();
    } catch (error) {
      alert("Error sending message: " + error);
    }
  };

  const handleStripeCheckoutSessionsCreate = async () => {
    const res = await stripeCheckoutSessionsCreate();
    alert(res);
  };

  const handleStripeProductsCreate = async () => {
    const res = await stripeProductsCreate();
    alert(res);
  };

  return (
    <GapWrapper>
      <ComponentContainer>
        <Title>User Information</Title>
        <DottedOneLine>username: {username}</DottedOneLine>
        <DottedOneLine>assess token: {accessToken}</DottedOneLine>
        <DottedOneLine>firebase uid: {uid}</DottedOneLine>
        <DottedOneLine>line uid: {userId}</DottedOneLine>
      </ComponentContainer>

      <ComponentContainer>
        <Title>Slack Notification</Title>
        <Button onClick={handleSlack}>Slack Notification</Button>
      </ComponentContainer>

      <ComponentContainer>
        <Title>Test</Title>
        <Button onClick={handleTest}>Test</Button>
      </ComponentContainer>

      <ComponentContainer>
        <Title>Post Liff</Title>
        <Button onClick={postLiff}>Post Liff</Button>
      </ComponentContainer>

      <ComponentContainer>
        <Title>Stripe Checkout Sessions Create</Title>
        <Button onClick={handleStripeCheckoutSessionsCreate}>
          Stripe Checkout Sessions Create
        </Button>
      </ComponentContainer>

      <ComponentContainer>
        <Title>Stripe Products Create</Title>
        <Button onClick={handleStripeProductsCreate}>
          Stripe Products Create
        </Button>
      </ComponentContainer>
    </GapWrapper>
  );
};
