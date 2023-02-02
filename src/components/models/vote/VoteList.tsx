import { useState } from "react";
import styled from "@emotion/styled";
import { useDisclosure, useFunctions } from "../../../hooks";
import { fetchVotes } from "../../../services";
import { BasicModal } from "../../uis";

const GapWrapper = styled("ol")`
  display: grid;
  gap: 10px;
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
  border: 1px solid black;
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
            <p className="text">{vote.text}</p>
            <p>{vote.upvotes}</p>
            <ButtonWrapper>
              <button onClick={() => handleVotesUpdate(vote.id)}>
                投票する
              </button>
              <button onClick={() => handleVotesDelete(vote.id)}>
                削除する
              </button>
            </ButtonWrapper>
          </VoteCard>
        ))}
      </GapWrapper>

      <button onClick={modal.open}>Open Vote Modal</button>

      <BasicModal
        title="Request a Tutorial"
        open={modal.isOpen}
        handleClose={modal.close}
        contents={
          <div>
            {" "}
            <input
              type="text"
              name="request"
              placeholder="Request..."
              onChange={(e) => setText(e.target.value)}
            />
          </div>
        }
        footer={
          <ButtonWrapper>
            <button onClick={handleVotesCreate}>
              {isPending ? "送信中..." : "送信"}
            </button>
            <button onClick={modal.close}>閉じる</button>
          </ButtonWrapper>
        }
      />
    </div>
  );
};
