import styled from "@emotion/styled";
import { css } from "@emotion/css";
import { useCart } from "../../hooks";
import { Button } from "../uis";
import { fetchProduct } from "../../services";
import { useParams } from "react-router-dom";
import { BaseText, DottedOneLine } from "../../themes";

const GapWrapper = styled("div")`
  display: grid;
  gap: 20px;
  padding: 20px 0;
  &.-pd0 {
    padding: 0;
  }
`;

const ContentWrapper = styled("div")`
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  margin-top: 10px;
  padding: 16px;
  position: relative;
`;

const Title = styled(DottedOneLine)`
  background-color: #f4f4f4;
  font-size: 20px;
  left: 16px;
  padding: 0 8px;
  position: absolute;
  top: -16px;
`;
const styledImage = css`
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 10px;
  object-fit: cover;
  width: 100%;
`;

export const Product = () => {
  const { id } = useParams<{ id: string }>();
  const { product } = fetchProduct(String(id));
  const { addProductToCart } = useCart();

  return (
    <GapWrapper>
      <img src={product.images[0].url} alt="" className={styledImage} />

      <ContentWrapper>
        <Title>{product.name}</Title>

        <GapWrapper className="-pd0">
          <div>
            <BaseText className="-orange -inline -bold">
              ¥{product.price_jpy}
            </BaseText>
            <BaseText className="-inline">（税込）</BaseText>
          </div>
          <BaseText>{product.description}</BaseText>
        </GapWrapper>
      </ContentWrapper>

      <Button onClick={() => addProductToCart(product)}>
        カートに追加する
      </Button>
    </GapWrapper>
  );
};
