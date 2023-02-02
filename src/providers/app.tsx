import * as React from "react";
import { BrowserRouter } from "react-router-dom";
import { LiffProvider } from "../contexts/liff";

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  return (
    <React.Suspense fallback={<div>loading...</div>}>
      <LiffProvider>
        <BrowserRouter>{children}</BrowserRouter>
      </LiffProvider>
    </React.Suspense>
  );
};
