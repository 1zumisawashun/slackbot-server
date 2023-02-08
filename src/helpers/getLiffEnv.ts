export const getLiffEnv = () => {
  const liffId = import.meta.env.VITE_LINE_LIFF_ID ?? "";
  let mock = false;

  switch (process.env.NODE_ENV) {
    case "production":
      mock = false;
      break;
    case "development":
    case "test":
      mock = true;
      break;
  }

  return { liffId, mock };
};
