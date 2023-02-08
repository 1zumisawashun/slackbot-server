import { useCart, useNavigate } from "../../hooks";
import { CartList } from "../models";
import styled from "@emotion/styled";
import { Button } from "../uis";

const GapWrapper = styled("div")`
  display: grid;
  gap: 20px;
  padding: 20px 0;
`;

export const Cart = () => {
  const { cart, isEmpty } = useCart();
  const { pushToTop, pushToCheckout } = useNavigate();

  return (
    <GapWrapper>
      <CartList products={cart} />
      {isEmpty && <Button onClick={pushToTop}>商品を見る</Button>}

      <Button isDisabled={isEmpty} onClick={pushToCheckout}>
        決済画面に進む
      </Button>
    </GapWrapper>
  );
};
