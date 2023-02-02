import { slackContent, Params } from "./slackContent";

type SlackNotificationParams = {
  url: string;
  isRich: boolean;
  params: Params;
};

export const slackNotification = ({
  url,
  isRich = false,
  params,
}: SlackNotificationParams) => {
  const request = require("request");
  const content = isRich ? slackContent(params) : { text: params.detail };

  const header = {
    uri: url,
    headers: { "Content-type": "application/json" },
    json: content,
  };

  request.post(header);
};
