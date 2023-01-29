import { lazyImport } from "../utilities/lazyImport";
import { useRoutes } from "react-router-dom";

const { Checkout } = lazyImport(() => import("../pages/Checkout"), "Checkout");
const { Login } = lazyImport(() => import("../pages/Login"), "Login");
const { Product } = lazyImport(() => import("../pages/Product"), "Product");
const { Top } = lazyImport(() => import("../pages/Top"), "Top");

export const commonRoutes = [
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
    path: "/login",
    element: <Login />,
  },
];

export const AppRoute: React.FC = () => {
  const element = useRoutes([...commonRoutes]);
  return <>{element}</>;
};
