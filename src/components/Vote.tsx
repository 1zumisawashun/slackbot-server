import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { projectFirestore, collection, getDocs } from "../libs/firebase";
import { useDisclosure, useFunctions } from "../hooks";

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
  upvotes: number;
};

export const Vote = () => {
  const [votes, setVotes] = useState<Vote[]>([]);
  const [text, setText] = useState("");

  const modal = useDisclosure();
  const {
    firestoreVotesUpdate,
    firestoreVotesCreate,
    onCallDefault,
    stripeCheckoutSessionsCreate,
    stripeProductsCreate,
  } = useFunctions();

  const handleVotesUpdate = async (id: string) => {
    const res = firestoreVotesUpdate({ id });
    console.log(res);
  };

  const handleVotesCreate = async () => {
    const res = await firestoreVotesCreate({ text });
    console.log(res);
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

  const handleTest = async () => {
    const res = await onCallDefault({ name: "dammy text" });
    console.log(res);
  };

  const handleStripeCheckoutSessionsCreate = async () => {
    const res = await stripeCheckoutSessionsCreate();
    console.log(res);
  };

  const handleStripeProductsCreate = async () => {
    const res = await stripeProductsCreate();
    console.log(res);
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
            <button onClick={handleVotesCreate}>Submit</button>
            <button onClick={modal.close}>Close</button>
          </Modal>
        </NewVote>
      )}
      <button onClick={modal.open}>Open</button>
      <button onClick={handleTest}>Test</button>
      <button onClick={handleStripeCheckoutSessionsCreate}>
        Stripe Sessions
      </button>
      <button onClick={handleStripeProductsCreate}>Stripe Products</button>

      <h2>Request a Tutorial</h2>
      <ul className="request-list">
        {votes.map((vote) => (
          <li>
            <span className="text">{vote.text}</span>
            <button onClick={() => handleVotesUpdate(vote.id)}>
              {vote.upvotes}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
