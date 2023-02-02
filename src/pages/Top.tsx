import { Top as TopTemplate } from "../components/templates/Top";
import { Header } from "../components/layouts";

export const Top: React.FC = () => {
  return (
    <>
      <Header />
      <TopTemplate />
    </>
  );
};
