import { useCart } from "../../hooks";
import { Button } from "../uis";
import { fetchProduct } from "../../services";
import { useParams } from "react-router-dom";

export const Product = () => {
  const { id } = useParams<{ id: string }>();
  const { product } = fetchProduct(String(id));
  const { addProductToCart } = useCart();

  return (
    <div className="App">
      <p>{product.id}</p>
      <Button onClick={() => addProductToCart(product)}>
        カートに追加する
      </Button>
    </div>
  );
};
