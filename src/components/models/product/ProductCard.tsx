import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { css } from "@emotion/css";
import { BaseText, DottedTwoLine } from "../../../themes";

const CardContainer = styled(Link)`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  display: block;
`;

const ContentWrapper = styled("div")`
  align-content: space-between;
  display: grid;
  height: 90px;
  padding: 10px;
`;

const styledImage = css`
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 10px 10px 0 0;
  height: 150px;
  margin-bottom: -10px;
  object-fit: cover;
  width: 100%;
`;

export type ProductCardProps = {
  id: string;
  name: string;
  price: number;
  image: string;
  path: string;
};

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  path,
  image,
}) => {
  return (
    <CardContainer to={path} id={id}>
      <div>
        <img src={image} className={styledImage} />
      </div>
      <ContentWrapper>
        <DottedTwoLine>{name}</DottedTwoLine>
        <div>
          <BaseText className="-orange -inline -bold">¥{price}</BaseText>
          <BaseText className="-inline">（税込）</BaseText>
        </div>
      </ContentWrapper>
    </CardContainer>
  );
};
