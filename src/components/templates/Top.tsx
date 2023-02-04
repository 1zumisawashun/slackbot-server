import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useAuth, useLiff } from "../../hooks";
import { ProductCard } from "../models";
import { DottedOneLine } from "../../themes";
import PRODUCTS from "../../constants/products.json";

const GridWrapper = styled("div")`
  display: grid;
  grid-template-columns: 1fr 1fr;
  row-gap: 20px;
`;

const ProductCardWrapper = styled("div")`
  width: 90%;
  margin: auto;
`;

export const Top = () => {
  const [username, setUsername] = useState("");
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const { liff, userId } = useLiff();
  const { uid } = useAuth();

  const asyncLiffFunc = async () => {
    if (!liff) return;
    const profile = await liff.getProfile();
    setUsername(profile.displayName);
    const token = await liff.getAccessToken();
    setAccessToken(token);
  };

  useEffect(() => {
    asyncLiffFunc();
  }, [liff]);

  return (
    <div className="App">
      <DottedOneLine>Hello World {username}</DottedOneLine>
      <DottedOneLine>assessToken:{accessToken}</DottedOneLine>
      <DottedOneLine>uid:{uid}</DottedOneLine>
      <DottedOneLine>line uid:{userId}</DottedOneLine>
      <GridWrapper>
        {PRODUCTS.map((product) => (
          <ProductCardWrapper key={product.id}>
            <ProductCard
              id={`${product.id}`}
              path={`/product/${product.id}`}
              name={product.name}
              price={product.price_jpy}
              image={product.images[0].url}
            />
          </ProductCardWrapper>
        ))}
      </GridWrapper>
    </div>
  );
};
