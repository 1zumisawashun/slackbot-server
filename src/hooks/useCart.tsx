import { useContext } from "react";
import { CartContext } from "../contexts/cart";

export const useCart = () => {
  const context = useContext(CartContext);
  const {
    cart,
    addProductToCart,
    removeProductFromCart,
    countUpProduct,
    countDownProduct,
  } = context;

  return {
    cart,
    addProductToCart,
    removeProductFromCart,
    countUpProduct,
    countDownProduct,
  };
};
