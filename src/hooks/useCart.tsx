import { useContext, useMemo } from "react";
import { CartContext } from "../contexts/cart";

export const useCart = () => {
  const context = useContext(CartContext);
  const { cart } = context;

  const totalAmount = useMemo(() => {
    return cart.reduce((prev, product) => {
      return prev + Number(product.price_jpy);
    }, 0);
  }, [cart]);

  const isEmpty = useMemo(() => cart.length === 0, [cart]);

  return {
    ...context,
    totalAmount,
    isEmpty,
  };
};
