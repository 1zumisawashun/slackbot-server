import { useState } from "react";
import styled from "@emotion/styled";
import { useDisclosure, useFunctions } from "../../hooks";
import { fetchVotes } from "../../services";
import { BasicModal, InputText, Button } from "../uis";
import { VoteCard } from "../models";

const GapWrapper = styled("ol")`
  display: grid;
  padding: 20px;
  gap: 20px;
`;
const ButtonWrapper = styled("ol")`
  display: flex;
  gap: 10px;
`;

export const Vote = () => {
  const [text, setText] = useState("");
  const [isPending, setIsPending] = useState(false);

  const { votes } = fetchVotes();
  const modal = useDisclosure();
  const { firestoreVotesCreate } = useFunctions();

  const handleVotesCreate = async () => {
    if (!text) {
      alert("未入力です。");
      return;
    }
    setIsPending(true);
    try {
      await firestoreVotesCreate({ text });
      setIsPending(false);
      modal.close();
    } catch (error) {
      setIsPending(false);
      modal.close();
    }
  };

  return (
    <div>
      <GapWrapper>
        {votes.map((vote) => (
          <VoteCard key={vote.id} vote={vote} />
        ))}
      </GapWrapper>

      <Button onClick={modal.open}>Open Vote Modal</Button>

      <BasicModal
        title="Request a Tutorial"
        open={modal.isOpen}
        handleClose={modal.close}
        contents={
          <InputText
            placeholder="yo some text"
            onChange={(e) => setText(e.target.value)}
          />
        }
        footer={
          <ButtonWrapper>
            <Button onClick={handleVotesCreate}>
              {isPending ? "送信中..." : "送信"}
            </Button>
            <Button onClick={modal.close}>閉じる</Button>
          </ButtonWrapper>
        }
      />
    </div>
  );
};
