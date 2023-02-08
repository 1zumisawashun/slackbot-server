import { Link } from "react-router-dom";
import { css } from "@emotion/css";
import styled from "@emotion/styled";
import { useCart } from "../../../hooks";
import { CartCounter } from "./CartCounter";
import { Product } from "../../../types/Product";
import { DottedOneLine, BaseText } from "../../../themes";
import { ButtonIconDelete } from "../../uis";

const FlexWrapper = styled("div")`
  display: flex;
`;
const ContentWrapper = styled("div")`
  align-content: space-between;
  display: grid;
  padding: 5px 15px;
  width: 100%;
`;
const Content = styled("div")`
  display: flex;
  justify-content: space-between;
`;
const styledImage = css`
  border-radius: 10px;
  height: 100px;
  object-fit: cover;
  width: 130px;
  margin-bottom: -10px;
`;

type CartListProps = {
  products: Product[];
};

export const CartList: React.FC<CartListProps> = ({ products }) => {
  const { removeProductFromCart } = useCart();

  return (
    <>
      {products.length !== 0 &&
        products.map((product) => (
          <FlexWrapper key={product.id}>
            <Link to={`/products/${product.id}`}>
              <img
                src={product.images[0].url}
                alt={product.images[0].title}
                className={styledImage}
              />
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

                <div>
                  <ButtonIconDelete
                    onClick={() => removeProductFromCart(product.id)}
                  />
                </div>
              </Content>

              <CartCounter
                amount={product.amount}
                productId={product.id}
                maxCount={product.stock_quantity}
              />
            </ContentWrapper>
          </FlexWrapper>
        ))}
    </>
  );
};
