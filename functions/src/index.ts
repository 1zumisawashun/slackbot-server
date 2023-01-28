import * as functions from "firebase-functions";

import * as triggers from "./triggers";
export { triggers };

import * as services from "./services";
export { services };

export { webhook } from "./webhooks";

// NOTE:onCallをトリガーにする

export const onCallTemplate = functions.https.onCall((data, context) => {
  const name = data.name;
  return `Hello, ${name}`;
});

const cors = require("cors")({ origin: true });

// NOTE:http通信をトリガーにする

export const onRequestTemplate = functions.https.onRequest(
  (request, response) => {
    functions.logger.info("Hello logs!", { structuredData: true });
    response.send("Hello from Firebase!");
  }
);

export const onRequestWithCors = functions.https.onRequest(
  (request, response) => {
    cors(request, response, async () => {
      const params = { data: "yo some text" };
      response.send(params);
    });
  }
);

export const onRequestRandomNumber = functions.https.onRequest(
  (request, response) => {
    const number = Math.round(Math.random() * 100);
    response.send(number.toString());
  }
);

export const onRequestWithRedirect = functions.https.onRequest(
  (request, response) => {
    response.redirect("https://www.thenetninja.co.uk");
  }
);
