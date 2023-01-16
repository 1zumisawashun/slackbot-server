import * as functions from "firebase-functions";
const cors = require("cors")({ origin: true });

// NOTE:http通信をトリガにする

export const onRequestDefault = functions.https.onRequest(
  (request, response) => {
    functions.logger.info("Hello logs!", { structuredData: true });
    response.send("Hello from Firebase!");
  }
);

export const onRequestWithCors = functions.https.onRequest(
  (request, response) => {
    cors(request, response, async () => {
      response.send({
        data: "yo some text",
      });
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
