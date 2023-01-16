import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import {
  projectFirestore,
  collection,
  getDocs,
  httpsCallable,
  projectFunctions,
} from "../libs/firebase";
import { useDisclosure } from "../hooks";

const NewVote = styled("div")`
  width: 100%;
  height: 100%;
  position: absolute;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1;
  top: 0;
  left: 0;
`;
const Modal = styled("div")`
  width: 300px;
  padding: 30px;
  margin: 100px auto;
  border-radius: 10px;
  background: white;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

type Vote = {
  id: string;
  text: string;
  upvote: number;
};

export const Vote = () => {
  const [votes, setVotes] = useState<Vote[]>([]);
  const [text, setText] = useState("");

  const modal = useDisclosure();

  const handleUpvote = (id: string) => {
    const onCallUpvotes = httpsCallable(projectFunctions, "onCallUpvotes");
    onCallUpvotes({ id }).catch((error) => {
      console.log(error.message);
    });
  };

  const handleVote = () => {
    const onCallCreateVotes = httpsCallable(
      projectFunctions,
      "onCallCreateVotes"
    );
    onCallCreateVotes({ text }).catch((error) => {
      console.log(error.message);
    });
    modal.close();
  };

  const fetchVotes = async () => {
    const votesRef = collection(projectFirestore, "votes");
    const votesQuerySnapshots = await getDocs(votesRef);
    const data = votesQuerySnapshots.docs.map((doc) => {
      return { ...(doc.data() as Vote), id: doc.id };
    });
    setVotes(data);
  };

  useEffect(() => {
    fetchVotes();
  }, []);
  return (
    <div>
      {modal.isOpen && (
        <NewVote>
          <Modal>
            <h2>Request a Tutorial</h2>
            <input
              type="text"
              name="request"
              placeholder="Request..."
              onChange={(e) => setText(e.target.value)}
            />
            <button onClick={handleVote}>Submit</button>
            <button onClick={modal.close}>Close</button>
          </Modal>
        </NewVote>
      )}
      <button onClick={modal.open}>Open</button>
      <h2>Request a Tutorial</h2>
      <ul className="request-list">
        {votes.map((vote) => (
          <li>
            <span className="text">{vote.text}</span>
            <div onClick={() => handleUpvote(vote.id)}>
              <span className="votes">{vote.upvote}</span>
              <i className="mdi mdi-check" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
