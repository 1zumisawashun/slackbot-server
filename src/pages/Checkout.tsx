import { Checkout as CheckoutTemplate } from "../components/templates/Checkout";
import { Header } from "../components/layouts";

export const Checkout: React.FC = () => {
  return (
    <>
      <Header />
      <CheckoutTemplate />
    </>
  );
};
