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
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
`;

const VoteList = styled("li")`
  padding: 10px;
  list-style-type: none;
  background: white;
  border-radius: 10px;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
`;

export const VoteForm = () => {
  const [text, setText] = useState("");

  const { votes } = fetchVotes();
  const modal = useDisclosure();
  const { firestoreVotesUpdate, firestoreVotesCreate } = useFunctions();

  const handleVotesUpdate = async (id: string) => {
    const res = await firestoreVotesUpdate({ id });
    console.log(res);
  };

  const handleVotesCreate = async () => {
    const res = await firestoreVotesCreate({ text });
    console.log(res);
    modal.close();
  };

  return (
    <div>
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
              <button onClick={handleVotesCreate}>Submit</button>
              <button onClick={modal.close}>Close</button>
            </div>
          </Modal>
        </Overlay>
      )}

      <h2>Request a Tutorial</h2>
      <ul className="request-list">
        {votes.map((vote) => (
          <VoteList onClick={() => handleVotesUpdate(vote.id)}>
            <p className="text">{vote.text}</p>
            <p>{vote.upvotes}</p>
          </VoteList>
        ))}
      </ul>
      <button onClick={modal.open}>Open Vote Modal</button>
    </div>
  );
};
