import { useState } from "react";
import styled from "@emotion/styled";
import { useDisclosure, useFunctions } from "../../hooks";
import { fetchVotes } from "../../services";
import { BasicModal, InputText, Button } from "../uis";
import { VoteCard } from "../models";

const GapWrapper = styled("div")`
  display: grid;
  gap: 20px;
  padding: 20px 0;
  &.-fullwidth {
    width: 100%;
  }
`;
const FlexGapWrapper = styled("div")`
  display: flex;
  gap: 20px;
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
    <>
      <GapWrapper>
        {votes.map((vote) => (
          <VoteCard key={vote.id} vote={vote} />
        ))}
      </GapWrapper>

      <Button onClick={modal.open}>投票を追加する</Button>

      <BasicModal
        title="投票を追加する"
        open={modal.isOpen}
        handleClose={modal.close}
        contents={
          <GapWrapper className="-fullwidth">
            <InputText
              placeholder="yo some text"
              onChange={(e) => setText(e.target.value)}
            />
          </GapWrapper>
        }
        footer={
          <FlexGapWrapper>
            <Button onClick={handleVotesCreate}>
              {isPending ? "送信中..." : "送信"}
            </Button>
            <Button onClick={modal.close}>閉じる</Button>
          </FlexGapWrapper>
        }
      />
    </>
  );
};
