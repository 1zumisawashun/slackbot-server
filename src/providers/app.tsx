import * as React from "react";
import { BrowserRouter } from "react-router-dom";

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  return (
    <React.Suspense fallback={<div>loading...</div>}>
      <BrowserRouter>{children}</BrowserRouter>
    </React.Suspense>
  );
};
