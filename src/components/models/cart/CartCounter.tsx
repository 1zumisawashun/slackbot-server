import styled from "@emotion/styled";
import { useCart } from "../../../hooks";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const CounterWrapper = styled("div")`
  display: flex;
  gap: 10px;
  justify-content: center;
`;
const Quantity = styled("p")`
  display: block;
  margin: auto;
`;

type CartCounterProps = {
  productId: string;
  amount: number;
};

export const CartCounter: React.FC<CartCounterProps> = ({
  amount,
  productId,
}) => {
  const { countDownProduct, countUpProduct } = useCart();

  return (
    <CounterWrapper>
      <RemoveCircleOutlineIcon onClick={() => countDownProduct(productId)} />
      <Quantity>{amount}</Quantity>
      <AddCircleOutlineIcon onClick={() => countUpProduct(productId)} />
    </CounterWrapper>
  );
};
