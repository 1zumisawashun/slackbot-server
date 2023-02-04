import styled from "@emotion/styled";
import { slackNotification, VITE_SLACK_INCOMING_WEBHOOK } from "../../helpers";
import { useFunctions, useLiff } from "../../hooks";
import { Button } from "../uis";

const ComponentContainer = styled("div")<{ background?: string }>`
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  margin-top: 40px;
  padding: 16px;
  padding-bottom: 8px;
  position: relative;
`;

const ComponentTitle = styled("p")`
  background-color: #f4f4f4;
  font-size: 20px;
  left: 16px;
  padding: 0 8px;
  position: absolute;
  top: -16px;
`;

export const Component = () => {
  const { onCallTemplate } = useFunctions();
  const { liff, isInClient, closeWindow } = useLiff();

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
    const res = await onCallTemplate({ name: "yo some text!" });
    alert(res);
  };

  const postLiff = async () => {
    if (!isInClient) {
      window.alert(
        "This button is unavailable as LIFF is currently being opened in an external browser."
      );
      return;
    }
    if (!liff) {
      window.alert(
        "This button is unavailable as LIFF is currently being opened in an external browser."
      );
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

  return (
    <div>
      <ComponentContainer>
        <ComponentTitle>Slack Notification</ComponentTitle>
        <Button onClick={handleSlack}>Slack Notification</Button>
      </ComponentContainer>

      <ComponentContainer>
        <ComponentTitle>Test</ComponentTitle>
        <Button onClick={handleTest}>Test</Button>
      </ComponentContainer>

      <ComponentContainer>
        <ComponentTitle>Post Liff</ComponentTitle>
        <Button onClick={postLiff}>Post Liff</Button>
      </ComponentContainer>
    </div>
  );
};
