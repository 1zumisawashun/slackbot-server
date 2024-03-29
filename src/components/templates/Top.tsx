import { useState, BaseSyntheticEvent } from "react";
import styled from "@emotion/styled";
import { useAuth, useDisclosure } from "../../hooks";
import { ProductCard } from "../models";
import { BasicModal, InputText, Button } from "../uis";
import { Product, initProduct } from "../../types/Product";
import { createProducts, fetchProducts } from "../../services";

const GridWrapper = styled("div")`
  display: grid;
  grid-template-columns: 1fr 1fr;
  row-gap: 20px;
  gap: 20px;
  padding: 20px 0;
`;
const ProductCardWrapper = styled("div")`
  width: 100%;
`;
const FlexGapWrapper = styled("div")`
  display: flex;
  gap: 20px;
`;
const GapWrapper = styled("div")`
  display: grid;
  gap: 20px;
  padding: 20px 0;
  &.-fullwidth {
    width: 100%;
  }
`;

export const Top = () => {
  const [isPending, setIsPending] = useState(false);
  const [product, setProduct] = useState<Product>(initProduct);

  const modal = useDisclosure();
  const { uid } = useAuth();
  const { products } = fetchProducts();

  const handleChange = (e: BaseSyntheticEvent) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProductsCreate = async () => {
    const params = {
      ...product,
      client_id: "1",
      client_name: "cafelog",
      images: [
        {
          title: product.name,
          url: "https://placehold.jp/200x200.png",
        },
      ],
      options: [],
    };
    setIsPending(true);
    try {
      await createProducts(params);
      setIsPending(false);
      modal.close();
    } catch (error) {
      setIsPending(false);
      modal.close();
      alert(error);
    }
  };

  return (
    <>
      <GridWrapper>
        {products.map((product) => (
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

      <Button onClick={modal.open} isDisabled={!Boolean(uid)}>
        商品を追加する
      </Button>

      <BasicModal
        title="商品を追加する"
        open={modal.isOpen}
        handleClose={modal.close}
        contents={
          <GapWrapper className="-fullwidth">
            <InputText
              name="name"
              label="product.name"
              placeholder="yo some text"
              onChange={handleChange}
            />
            <InputText
              name="price_jpy"
              type="number"
              label="product.price_jpy"
              placeholder="yo some text"
              onChange={handleChange}
            />
            <InputText
              name="stock_quantity"
              type="number"
              label="product.stock_quantity"
              placeholder="yo some text"
              onChange={handleChange}
            />
            <InputText
              name="description"
              label="product.description"
              placeholder="yo some text"
              onChange={handleChange}
            />
          </GapWrapper>
        }
        footer={
          <FlexGapWrapper>
            <Button onClick={handleProductsCreate} isLoading={isPending}>
              追加する
            </Button>
            <Button onClick={modal.close}>閉じる</Button>
          </FlexGapWrapper>
        }
      />
    </>
  );
};
