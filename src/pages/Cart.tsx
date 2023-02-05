import { Cart as CartTemplate } from "../components/templates/Cart";
import { Header } from "../components/layouts";
import { BaseBox } from "../themes";

export const Cart: React.FC = () => {
  return (
    <>
      <Header />
      <BaseBox>
        <CartTemplate />
      </BaseBox>
    </>
  );
};
