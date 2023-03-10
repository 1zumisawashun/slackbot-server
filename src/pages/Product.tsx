import { Product as ProductTemplate } from "../components/templates/Product";
import { Header } from "../components/layouts";
import { BaseBox } from "../themes";

export const Product: React.FC = () => {
  return (
    <>
      <Header />
      <BaseBox>
        <ProductTemplate />
      </BaseBox>
    </>
  );
};
