import { useEffect, useState } from "react";
import { useLiff } from "../../contexts/liff";
import { useAuth } from "../../hooks/useAuth";

export const Top = () => {
  const [username, setUsername] = useState("");
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const { liff } = useLiff();
  const { uid } = useAuth();

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
      <p>assessToken:{accessToken}</p>
      <p>uid:{uid}</p>
    </div>
  );
};
