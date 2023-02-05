import { useCart } from "../../hooks";
import { CartList } from "../models";
import styled from "@emotion/styled";
import { Button } from "../uis";
import { useNavigate } from "react-router-dom";

const GapWrapper = styled("div")`
  display: grid;
  gap: 20px;
  padding: 20px 0;
`;

export const Cart = () => {
  const { cart, isEmpty } = useCart();
  const navigate = useNavigate();

  return (
    <GapWrapper>
      <CartList products={cart} />
      {isEmpty && <Button onClick={() => navigate("/")}>商品を見る</Button>}

      <Button isDisabled={isEmpty} onClick={() => navigate("/checkout")}>
        決済画面に進む
      </Button>
    </GapWrapper>
  );
};
