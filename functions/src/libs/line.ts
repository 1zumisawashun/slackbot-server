import * as line from "@line/bot-sdk";
import * as dotenv from "dotenv";
dotenv.config();

const LINE_CHANNEL_SECRET = process.env.LINE_CHANNEL_SECRET || "";
const LINE_CHANNEL_ACCESS_TOKEN = process.env.LINE_CHANNEL_ACCESS_TOKEN || "";

export const LINE_LOGIN_CHANNEL_ID = process.env.LINE_LOGIN_CHANNEL_ID || "";
export const LINE_LOGIN_CHANNEL_SECRET =
  process.env.LINE_LOGIN_CHANNEL_SECRET || "";

export const client = new line.Client({
  channelSecret: LINE_CHANNEL_SECRET,
  channelAccessToken: LINE_CHANNEL_ACCESS_TOKEN,
});
