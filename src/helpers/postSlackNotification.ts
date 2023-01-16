import axios from "axios";

export const VITE_SLACK_INCOMING_WEBHOOK = import.meta.env
  .VITE_SLACK_INCOMING_WEBHOOK;

// NOTE:https://zenn.dev/shuuuuuun/articles/36a980f97c4c34
export const postSlackNotification = (url: string, message?: string) => {
  axios.post(url, JSON.stringify({ text: message || "yo some text" }));
};
