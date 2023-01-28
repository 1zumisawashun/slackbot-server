import { useState } from "react";
import styled from "@emotion/styled";
import { useDisclosure, useFunctions } from "../hooks";
import { fetchVotes } from "../services";

const Overlay = styled("div")`
  width: 100%;
  height: 100vh;
  position: absolute;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1;
  top: 0;
  left: 0;
`;
const Modal = styled("div")`
  width: 300px;
  height: 300px;
  padding: 30px;
  border-radius: 10px;
  background: white;
  text-align: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
`;
const GapWrapper = styled("ol")`
  display: grid;
  gap: 10px;
`;
const VoteList = styled("li")`
  padding: 10px;
  list-style-type: none;
  background: white;
  border-radius: 10px;
  border: 1px solid black;
  display: flex;
  justify-content: space-around;
  cursor: pointer;
`;

export const VoteForm = () => {
  const [text, setText] = useState("");
  const [isPending, setIsPending] = useState(false);

  const { votes } = fetchVotes();
  const modal = useDisclosure();
  const { firestoreVotesUpdate, firestoreVotesCreate } = useFunctions();

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
      const res = await firestoreVotesUpdate({ id });
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
      <h2>Request a Tutorial</h2>
      <GapWrapper>
        {votes.map((vote) => (
          <VoteList key={vote.id}>
            <p className="text">{vote.text}</p>
            <p>{vote.upvotes}</p>
            <div>
              <button onClick={() => handleVotesUpdate(vote.id)}>
                投票する
              </button>
              <button onClick={() => handleVotesDelete(vote.id)}>
                削除する
              </button>
            </div>
          </VoteList>
        ))}
      </GapWrapper>
      <button onClick={modal.open}>Open Vote Modal</button>

      {modal.isOpen && (
        <Overlay>
          <Modal>
            <h2>Request a Tutorial</h2>
            <input
              type="text"
              name="request"
              placeholder="Request..."
              onChange={(e) => setText(e.target.value)}
            />
            <div>
              <button onClick={handleVotesCreate}>
                {isPending ? "送信中..." : "送信"}
              </button>
              <button onClick={modal.close}>閉じる</button>
            </div>
          </Modal>
        </Overlay>
      )}
    </div>
  );
};
