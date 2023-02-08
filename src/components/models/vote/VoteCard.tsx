import { useState } from "react";
import styled from "@emotion/styled";
import { useFunctions } from "../../../hooks";
import { Button } from "../../uis";
import { BaseText } from "../../../themes";
import { Vote } from "../../../types/Vote";

const CardContainer = styled("div")`
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  margin-top: 10px;
  padding: 16px;
  position: relative;
`;
const Title = styled("p")`
  background-color: #f4f4f4;
  font-size: 20px;
  left: 16px;
  padding: 0 8px;
  position: absolute;
  top: -16px;
`;
const CardInner = styled("div")`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const FlexGapWrapper = styled("div")`
  display: flex;
  gap: 10px;
`;

type Status = "completed" | "deleting" | "updating";

type VoteCardProps = {
  vote: Vote;
};
export const VoteCard: React.FC<VoteCardProps> = ({ vote }) => {
  const [status, setStatus] = useState<Status>("completed");
  const { firestoreVotesUpdate, firestoreVotesDelete } = useFunctions();

  const handleVotesUpdate = async (id: string) => {
    setStatus("updating");
    try {
      await firestoreVotesUpdate({ id });
      setStatus("completed");
    } catch (error) {
      setStatus("completed");
      alert(error);
    }
  };
  const handleVotesDelete = async (id: string) => {
    setStatus("deleting");
    try {
      await firestoreVotesDelete({ id });
      setStatus("completed");
    } catch (error) {
      setStatus("completed");
      alert(error);
    }
  };

  return (
    <CardContainer>
      <Title>{vote.text}</Title>
      <CardInner>
        <FlexGapWrapper>
          <BaseText>票数</BaseText>
          <BaseText className="-orange -bold">{vote.upvotes}</BaseText>
        </FlexGapWrapper>

        <FlexGapWrapper>
          <Button
            onClick={() => handleVotesUpdate(vote.id)}
            isLoading={status === "updating"}
          >
            投票
          </Button>
          <Button
            onClick={() => handleVotesDelete(vote.id)}
            isLoading={status === "deleting"}
          >
            削除
          </Button>
        </FlexGapWrapper>
      </CardInner>
    </CardContainer>
  );
};
