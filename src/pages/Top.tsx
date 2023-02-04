import { Top as TopTemplate } from "../components/templates/Top";
import { Header } from "../components/layouts";
import { BaseBox } from "../themes";

export const Top: React.FC = () => {
  return (
    <>
      <Header />
      <BaseBox>
        <TopTemplate />
      </BaseBox>
    </>
  );
};
