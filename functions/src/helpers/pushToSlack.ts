export function pushToSlack(message: string, url: string) {
  const request = require("request");
  const header = {
    uri: url,
    headers: { "Content-type": "application/json" },
    json: { text: message },
  };
  request.post(header);
}
