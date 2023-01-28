import { projectFirestore } from "../libs/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Vote } from "../types/Vote";

export const fetchVotes = () => {
  const [votes, setVotes] = useState<Vote[]>([]);

  useEffect(() => {
    const votesRef = collection(projectFirestore, "votes");
    const unsub = onSnapshot(votesRef, (querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => {
        return { ...(doc.data() as Vote), id: doc.id };
      });
      setVotes(data);
    });
    return unsub;
  });

  return { votes };
};
