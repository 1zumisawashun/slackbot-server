import * as React from "react";
import { BrowserRouter } from "react-router-dom";
import { LiffProvider } from "../contexts/liff";
import { CartProvider } from "../contexts/cart";

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  return (
    <React.Suspense fallback={<div>loading...</div>}>
      <LiffProvider>
        <CartProvider>
          <BrowserRouter>{children}</BrowserRouter>
        </CartProvider>
      </LiffProvider>
    </React.Suspense>
  );
};
