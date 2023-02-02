import { Vote as VoteTemplate } from "../components/templates/Vote";
import { Header } from "../components/layouts";

export const Vote: React.FC = () => {
  return (
    <>
      <Header />
      <VoteTemplate />
    </>
  );
};
