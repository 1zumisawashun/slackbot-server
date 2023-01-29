import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { AppProvider } from "./providers/app";
import { AppRoute } from "./routers/app";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AppProvider>
      <AppRoute />
    </AppProvider>
  </React.StrictMode>
);
