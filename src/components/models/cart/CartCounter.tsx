import styled from "@emotion/styled";
import { useCart } from "../../../hooks";
import { InputText, ButtonIconRemove, ButtonIconAdd } from "../../uis";

const CounterWrapper = styled("div")`
  display: flex;
  gap: 5px;
  align-items: center;
`;

type CartCounterProps = {
  productId: string;
  amount: number;
  maxCount: number;
};

export const CartCounter: React.FC<CartCounterProps> = ({
  amount,
  productId,
  maxCount,
}) => {
  const { countDownProduct, countUpProduct } = useCart();

  return (
    <CounterWrapper>
      <ButtonIconRemove onClick={() => countDownProduct(productId)} />
      <InputText value={String(amount)} size="small" readOnly />
      <ButtonIconAdd
        onClick={() => countUpProduct(productId)}
        isDisabled={maxCount <= amount}
      />
    </CounterWrapper>
  );
};
