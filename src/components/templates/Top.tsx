import { useEffect, useState } from "react";
import { VoteForm } from "..";
import liff from "../../libs/line";
import {
  postSlackNotification,
  VITE_SLACK_INCOMING_WEBHOOK,
} from "../../helpers";
import { useFunctions } from "../../hooks";

const params = {
  email: "shunshun@gmail.com",
  password: "Test1234",
};

export const Top = () => {
  const [username, setUsername] = useState("");
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const { onCallDefault } = useFunctions();

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
    const res = await onCallDefault({ name: "dammy text" });
    console.log(res);
  };

  return (
    <div className="App">
      <h1>Hello World {username}</h1>
      <p>{accessToken}</p>
      <button onClick={handleSlack}>slack</button>
      <button onClick={handleTest}>Test</button>
      <VoteForm></VoteForm>
    </div>
  );
};
