import { useState } from "react";
import styled from "@emotion/styled";
import { useDisclosure, useFunctions } from "../../../hooks";
import { fetchVotes } from "../../../services";
import { BasicModal, InputText, Button } from "../../uis";
import { BaseText } from "../../../themes";

const GapWrapper = styled("ol")`
  display: grid;
  gap: 20px;
  width: 90%;
  margin: auto;
`;
const ButtonWrapper = styled("ol")`
  display: flex;
  gap: 10px;
`;

const VoteCard = styled("li")`
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

export const VoteList = () => {
  const [text, setText] = useState("");
  const [isPending, setIsPending] = useState(false);

  const { votes } = fetchVotes();
  const modal = useDisclosure();
  const { firestoreVotesUpdate, firestoreVotesCreate, firestoreVotesDelete } =
    useFunctions();

  const handleVotesUpdate = async (id: string) => {
    setIsPending(true);
    try {
      const res = await firestoreVotesUpdate({ id });
      console.log(res);
      setIsPending(false);
    } catch (error) {
      setIsPending(false);
    }
  };
  const handleVotesDelete = async (id: string) => {
    setIsPending(true);
    try {
      const res = await firestoreVotesDelete({ id });
      console.log(res);
      setIsPending(false);
    } catch (error) {
      setIsPending(false);
    }
  };

  const handleVotesCreate = async () => {
    if (!text) {
      alert("未入力です。");
      return;
    }
    setIsPending(true);
    try {
      const res = await firestoreVotesCreate({ text });
      console.log(res);
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
          <VoteCard key={vote.id}>
            <BaseText>{vote.text}</BaseText>
            <BaseText className="-orange -bold">{vote.upvotes}</BaseText>
            <ButtonWrapper>
              <Button onClick={() => handleVotesUpdate(vote.id)}>
                投票する
              </Button>
              <Button onClick={() => handleVotesDelete(vote.id)}>
                削除する
              </Button>
            </ButtonWrapper>
          </VoteCard>
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
