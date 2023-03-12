import * as functions from "firebase-functions";
import { client } from "../../libs/line";
import {
  WebhookEvent,
  TemplateMessage,
  MessageAPIResponseBase,
  Message,
  TextMessage,
} from "@line/bot-sdk";
import * as sample_01 from "../../constants/template/sample_01.json";
import fetch from "node-fetch";
import * as dotenv from "dotenv";
dotenv.config();

type GenerateResponseProps = {
  statusCode: number;
  lineStatus: string;
  message: string;
};

type GetCompletionProps = {
  message: string;
};

type ReplyMessageProps = {
  replyToken: string;
  message: Message;
};

const generateResponse = ({
  statusCode,
  lineStatus,
  message,
}: GenerateResponseProps) => {
  return {
    statusCode: statusCode,
    headers: { "X-Line-Status": lineStatus },
    body: `{"result":"${message}"}`,
  };
};

const getCompletion = async ({
  message,
}: GetCompletionProps): Promise<any | null> => {
  const model = "gpt-3.5-turbo";
  const url = "https://api.openai.com/v1/chat/completions";
  const body = {
    model,
    max_tokens: 1024,
    message,
  };
  try {
    const response = await fetch(url, {
      method: "post",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
    });
    functions.logger.log(response, "response");

    const data = await response.json();
    return data;
  } catch (error) {
    functions.logger.error(`error on getCompletion`, error);
    return null;
  }
};

const replyMessage = async ({
  replyToken,
  message,
}: ReplyMessageProps): Promise<MessageAPIResponseBase | null> => {
  try {
    const result = await client.replyMessage(replyToken, message);
    return result;
  } catch (error) {
    functions.logger.error(`error on replyMessage`, error);
    return null;
  }
};

export const message = functions.https.onRequest(async (req, res) => {
  const event = req.body.events[0] as WebhookEvent;
  if (event.type !== "message") return;
  if (event.message.type !== "text") return;

  // const userId = event.source.userId;
  const text = event.message.text;
  const replyToken = event.replyToken;

  functions.logger.log(text, "text");

  if (text === "いでよ") {
    const result = await replyMessage({
      replyToken,
      message: sample_01 as TemplateMessage,
    });
    res.json(result);
    return;
  }

  functions.logger.debug("--- start getCompletion---");

  const response = await getCompletion({ message: text });

  functions.logger.debug("--- end getCompletion---");

  if (response) {
    const replyMessageParams = {
      replyToken,
      message: {
        type: "text",
        text: response.choices[0].message.content.trim(),
      } as TextMessage,
    };
    await replyMessage(replyMessageParams);

    const generateResponseParams = {
      statusCode: 201,
      lineStatus: "OK",
      message: "success",
    };
    const generateResponseResult = generateResponse(generateResponseParams);
    functions.logger.log(generateResponseResult, "generateResponseResult");
    res.json(generateResponseResult);
  } else {
    const replyMessageParams = {
      replyToken,
      message: {
        type: "text",
        text: "タイムアウトエラーです。時間を置いて再度お試しください。",
      } as TextMessage,
    };
    await replyMessage(replyMessageParams);

    const generateResponseParams = {
      statusCode: 500,
      lineStatus: "NG",
      message: "error",
    };
    const generateResponseResult = generateResponse(generateResponseParams);
    functions.logger.log(generateResponseResult, "generateResponseResult");
    res.json(generateResponseResult);
  }
});
