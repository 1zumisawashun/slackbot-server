import { Checkout as CheckoutTemplate } from "../components/templates/Checkout";
import { Header } from "../components/layouts";
import { BaseBox } from "../themes";

export const Checkout: React.FC = () => {
  return (
    <>
      <Header />
      <BaseBox>
        <CheckoutTemplate />
      </BaseBox>
    </>
  );
};
