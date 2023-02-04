import { useState } from "react";
import styled from "@emotion/styled";
import { useDisclosure, useFunctions } from "../../hooks";
import { fetchVotes } from "../../services";
import { BasicModal, InputText, Button } from "../uis";
import { VoteCard } from "../models";

const GapWrapper = styled("ol")`
  display: grid;
  gap: 20px;
`;
const ButtonWrapper = styled("div")`
  display: flex;
  gap: 10px;
`;
const FormWrapper = styled("div")`
  display: grid;
  gap: 20px;
  width: 100%;
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

      <Button onClick={modal.open}>投票を追加</Button>

      <BasicModal
        title="Request a Tutorial"
        open={modal.isOpen}
        handleClose={modal.close}
        contents={
          <FormWrapper>
            <InputText
              placeholder="yo some text"
              onChange={(e) => setText(e.target.value)}
            />
          </FormWrapper>
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
