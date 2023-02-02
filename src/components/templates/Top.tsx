import { useEffect, useState } from "react";
import { useLiff } from "../../contexts/liff";

export const Top = () => {
  const [username, setUsername] = useState("");
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const { liff } = useLiff();

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

  return (
    <div className="App">
      <h1>Hello World {username}</h1>
      <p>{accessToken}</p>
    </div>
  );
};
