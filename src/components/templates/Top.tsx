import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { VoteForm } from "..";
import liff from "../../libs/line";
import {
  postSlackNotification,
  VITE_SLACK_INCOMING_WEBHOOK,
} from "../../helpers";
import { useFunctions, useAuth } from "../../hooks";

export const Top = () => {
  const [username, setUsername] = useState("");
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const { onCallDefault } = useFunctions();
  const { uid, login, logout } = useAuth();
  const navigate = useNavigate();

  const asyncLiffFunc = async () => {
    const profile = await liff.getProfile();
    setUsername(profile.displayName);

    const token = await liff.getAccessToken();
    setAccessToken(token);
  };

  useEffect(() => {
    asyncLiffFunc();
  }, []);

  const handleSlack = () => {
    postSlackNotification(VITE_SLACK_INCOMING_WEBHOOK);
  };

  const handleTest = async () => {
    const res = await onCallDefault({ name: "yo some text!" });
    alert(res);
  };

  const postLiff = async () => {
    const res = await liff.sendMessages([
      {
        type: "text",
        text: `yo some text!`,
      },
    ]);
    console.log(res, "res");
  };

  return (
    <div className="App">
      <h1>Hello World {username}</h1>
      <p>{accessToken}</p>
      <button onClick={handleSlack}>Slack Notification</button>
      <button onClick={handleTest}>Test</button>
      <button onClick={postLiff}>postLiff</button>
      {uid ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <button onClick={() => navigate("/login")}>Login</button>
      )}

      <VoteForm></VoteForm>
    </div>
  );
};
