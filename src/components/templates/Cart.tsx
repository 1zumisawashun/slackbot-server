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
  const { cart } = useCart();
  const navigate = useNavigate();

  return (
    <GapWrapper>
      <CartList products={cart} />
      <Button onClick={() => navigate("/checkout")}>購入する</Button>
    </GapWrapper>
  );
};
