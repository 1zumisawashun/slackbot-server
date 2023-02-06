import { createContext, useMemo, useReducer, ReactNode } from "react";
import { Product } from "../types/Product";

interface Action {
  type: string;
  product?: Product;
  productId?: string;
}
interface State {
  cart: Product[];
}

interface CartContextInterface {
  cart: Product[];
  addProductToCart: (product: Product) => void;
  removeProductFromCart: (productId: string) => void;
  countUpProduct: (productId: string) => void;
  countDownProduct: (productId: string) => void;
}

export const CartContext = createContext<CartContextInterface>({
  cart: [],
  addProductToCart: (product) => {},
  removeProductFromCart: (productId) => {},
  countUpProduct: (productId) => {},
  countDownProduct: (productId) => {},
});

const addProductToCart = (product: Product, state: State) => {
  const updatedCart = [...state.cart];
  const updatedItemIndex = updatedCart.findIndex(
    (item) => item.id === product.id
  );
  if (updatedItemIndex < 0) {
    updatedCart.push({ ...product, amount: 1 });
  } else {
    const updatedItem = {
      ...updatedCart[updatedItemIndex],
    };
    if (updatedItem.amount) {
      updatedItem.amount += 1;
      updatedCart[updatedItemIndex] = updatedItem;
    }
  }
  return { ...state, cart: updatedCart };
};

const countUpProduct = (productId: string, state: State) => {
  const updatedCart = [...state.cart];
  const updatedItemIndex = updatedCart.findIndex(
    (item) => item.id === productId
  );
  const updatedItem = {
    ...updatedCart[updatedItemIndex],
  };
  if (updatedItem.amount) {
    updatedItem.amount += 1;
    updatedCart[updatedItemIndex] = updatedItem;
  }
  return { ...state, cart: updatedCart };
};

const countDownProduct = (productId: string, state: State) => {
  const updatedCart = [...state.cart];
  const updatedItemIndex = updatedCart.findIndex(
    (item) => item.id === productId
  );
  const updatedItem = {
    ...updatedCart[updatedItemIndex],
  };
  if (updatedItem.amount) {
    updatedItem.amount -= 1;
    if (updatedItem.amount <= 0) {
      updatedCart.splice(updatedItemIndex, 1);
    } else {
      updatedCart[updatedItemIndex] = updatedItem;
    }
  }
  return { ...state, cart: updatedCart };
};

const removeProductFromCart = (productId: string, state: State) => {
  const updatedCart = [...state.cart];
  const updatedItemIndex = updatedCart.findIndex(
    (item) => item.id === productId
  );
  updatedCart.splice(updatedItemIndex, 1);
  return { ...state, cart: updatedCart };
};

export const ADD_PRODUCT = "ADD_PRODUCT";
export const REMOVE_PRODUCT = "REMOVE_PRODUCT";
export const COUNT_UP_PRODUCT = "COUNT_UP_PRODUCT";
export const COUNT_DOWN_PRODUCT = "COUNT_DOWN_PRODUCT";

export const cartReducer = (state: State, action: Action) => {
  switch (action.type) {
    case ADD_PRODUCT:
      return addProductToCart(action.product as Product, state);
    case REMOVE_PRODUCT:
      return removeProductFromCart(action.productId as string, state);
    case COUNT_UP_PRODUCT:
      return countUpProduct(action.productId as string, state);
    case COUNT_DOWN_PRODUCT:
      return countDownProduct(action.productId as string, state);
    default:
      return state;
  }
};

export const CartProvider = ({ children }: { children?: ReactNode }) => {
  const [cartState, dispatch] = useReducer(cartReducer, { cart: [] });
  const addProductToCart = (product: Product) => {
    dispatch({ type: ADD_PRODUCT, product }); // actionはdispatchの引数を指している;
  };
  const countUpProduct = (productId: string) => {
    dispatch({ type: COUNT_UP_PRODUCT, productId });
  };
  const countDownProduct = (productId: string) => {
    dispatch({ type: COUNT_DOWN_PRODUCT, productId });
  };
  const removeProductFromCart = (productId: string) => {
    dispatch({ type: REMOVE_PRODUCT, productId });
  };

  const cartValue = useMemo(
    () => ({
      cart: cartState.cart,
      addProductToCart,
      countUpProduct,
      countDownProduct,
      removeProductFromCart,
    }),
    [cartState]
  );

  return (
    <CartContext.Provider value={cartValue}>{children}</CartContext.Provider>
  );
};
