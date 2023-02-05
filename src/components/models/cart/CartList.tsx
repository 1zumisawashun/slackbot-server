import { Link } from "react-router-dom";
import { css } from "@emotion/css";
import styled from "@emotion/styled";
import { useCart } from "../../../hooks";
import { CartCounter } from "./CartCounter";
import { Product } from "../../../types/Product";
import DeleteIcon from "@mui/icons-material/Delete";
import { DottedOneLine, BaseText } from "../../../themes";

const FlexWrapper = styled("div")`
  display: flex;
`;
const ContentWrapper = styled("div")`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 10px;
`;
const Content = styled("div")`
  align-content: space-between;
  display: grid;
`;
const styledImage = css`
  border-radius: 10px;
  height: 100px;
  object-fit: cover;
  width: 130px;
  margin-bottom: -10px;
`;

interface CartListProps {
  products: Product[];
}

export const CartList: React.FC<CartListProps> = ({ products }) => {
  const { removeProductFromCart } = useCart();

  return (
    <>
      {products.length !== 0 &&
        products.map((product) => (
          <FlexWrapper key={product.id}>
            <Link to={`/products/${product.id}`}>
              <img src={product.images[0].url} className={styledImage} />
            </Link>

            <ContentWrapper>
              <Content>
                <div>
                  <DottedOneLine>{product.name}</DottedOneLine>
                  <BaseText className="-orange -inline -bold">
                    ¥{product.price_jpy}
                  </BaseText>
                  <BaseText className="-inline">（税込）</BaseText>
                </div>

                <CartCounter amount={product.amount} productId={product.id} />
              </Content>

              <DeleteIcon onClick={() => removeProductFromCart(product.id)} />
            </ContentWrapper>
          </FlexWrapper>
        ))}
    </>
  );
};
