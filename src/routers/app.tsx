import { lazyImport } from "../utilities/lazyImport";
import { useRoutes } from "react-router-dom";
import { useAuth } from "../hooks";

const { Checkout } = lazyImport(() => import("../pages/Checkout"), "Checkout");
const { Login } = lazyImport(() => import("../pages/Login"), "Login");
const { Product } = lazyImport(() => import("../pages/Product"), "Product");
const { Top } = lazyImport(() => import("../pages/Top"), "Top");
const { Error } = lazyImport(() => import("../pages/Error"), "Error");
const { Component } = lazyImport(
  () => import("../pages/Component"),
  "Component"
);
const { Vote } = lazyImport(() => import("../pages/Vote"), "Vote");
const { Signup } = lazyImport(() => import("../pages/Signup"), "Signup");
const { Cart } = lazyImport(() => import("../pages/Cart"), "Cart");

export const publicRoutes = [
  {
    path: "/",
    element: <Top />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "*",
    element: <Login />,
  },
];

export const protectedRoutes = [
  {
    path: "/",
    element: <Top />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/checkout",
    element: <Checkout />,
  },
  {
    path: "/product/:id",
    element: <Product />,
  },
  {
    path: "/vote",
    element: <Vote />,
  },
  {
    path: "*",
    element: <Error />,
  },
];

export const componentRoutes = [
  {
    path: "/component",
    element: <Component />,
  },
];

export const AppRoute: React.FC = () => {
  const { uid } = useAuth();
  const route = uid
    ? [...protectedRoutes, ...componentRoutes]
    : [...publicRoutes];
  const element = useRoutes(route);
  return <>{element}</>;
};
