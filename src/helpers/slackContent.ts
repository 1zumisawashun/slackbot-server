export type Params = {
  uid?: string;
  error?: string;
  detail: string;
};

export const slackContent = (params: Params) => {
  const { detail, uid, error } = params;
  const userAgent = window.navigator.userAgent;
  const env = process.env.NODE_ENV || "";
  return {
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `This is *${env}* mode`,
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `*ユーザーID*\n${uid ?? "unknown user"}`,
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `*エラー詳細*\n${detail}`,
        },
      },
      {
        type: "section",
        fields: [
          {
            type: "mrkdwn",
            text: `*エラーオブジェクト*\n${error ?? "unknown error"}`,
          },
        ],
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `*ネット利用者が使用しているOS・ブラウザ*\n${userAgent}`,
        },
      },
    ],
    attachments: [
      {
        blocks: [
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: "*Investigate further down from logs, or create an issue*",
            },
          },
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: "<https://dashboard.stripe.com/developers|Stripe Dashboard>",
            },
            accessory: {
              type: "button",
              text: {
                type: "plain_text",
                text: "View",
                emoji: true,
              },
            },
          },
        ],
      },
    ],
  };
};
