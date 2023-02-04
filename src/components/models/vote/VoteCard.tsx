import { useState } from "react";
import styled from "@emotion/styled";
import { useFunctions } from "../../../hooks";
import { Button } from "../../uis";
import { BaseText } from "../../../themes";
import { Vote } from "../../../types/Vote";

const ButtonWrapper = styled("ol")`
  display: flex;
  gap: 10px;
`;

const Card = styled("li")`
  padding: 10px;
  list-style-type: none;
  background: white;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  display: flex;
  align-items: center;
  justify-content: space-around;
  cursor: pointer;
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
    <Card>
      <BaseText>{vote.text}</BaseText>
      <BaseText className="-orange -bold">{vote.upvotes}</BaseText>
      <ButtonWrapper>
        <Button onClick={() => handleVotesUpdate(vote.id)}>
          {status === "updating" ? "投票中..." : "投票"}
        </Button>
        <Button onClick={() => handleVotesDelete(vote.id)}>
          {status === "deleting" ? "削除中..." : "削除"}
        </Button>
      </ButtonWrapper>
    </Card>
  );
};
