import { slackNotification, VITE_SLACK_INCOMING_WEBHOOK } from "../../helpers";
import { useFunctions, useLiff } from "../../hooks";

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
    <div className="App">
      <button onClick={handleSlack}>Slack Notification</button>
      <button onClick={handleTest}>Test</button>
      <button onClick={postLiff}>postLiff</button>
    </div>
  );
};
