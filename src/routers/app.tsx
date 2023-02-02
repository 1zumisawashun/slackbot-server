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
    path: "*",
    element: <Error />,
  },
];

export const protectedRoutes = [
  {
    path: "/",
    element: <Top />,
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
    path: "/component",
    element: <Component />,
  },
  {
    path: "*",
    element: <Error />,
  },
];

export const AppRoute: React.FC = () => {
  const { uid } = useAuth();
  const route = uid ? [...protectedRoutes] : [...publicRoutes];
  const element = useRoutes(route);
  return <>{element}</>;
};
