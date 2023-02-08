import { useNavigate as useReactNavigate } from "react-router-dom";
import { useCallback } from "react";

export const useNavigate = () => {
  const navigate = useReactNavigate();

  const pushToTop = useCallback(() => navigate("/"), []);
  const pushToLogin = useCallback(() => navigate("/login"), []);
  const pushToCheckout = useCallback(() => navigate("/checkout"), []);

  return { pushToTop, pushToLogin, pushToCheckout };
};
