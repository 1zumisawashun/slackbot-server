import { Vote as VoteTemplate } from "../components/templates/Vote";
import { Header } from "../components/layouts";
import { BaseBox } from "../themes";

export const Vote: React.FC = () => {
  return (
    <>
      <Header />
      <BaseBox>
        <VoteTemplate />
      </BaseBox>
    </>
  );
};
