export const getLiffEnv = () => {
  let liffId = "";
  let mock = false;

  switch (process.env.NODE_ENV) {
    case "production":
      liffId = import.meta.env.VITE_LINE_LIFF_ID ?? "";
      mock = false;
      break;
    case "development":
    case "test":
      liffId = import.meta.env.VITE_LINE_LIFF_ID ?? "";
      mock = true;
      break;
  }

  return { liffId, mock };
};
