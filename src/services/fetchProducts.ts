import { projectFirestore } from "../libs/firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Product } from "../types/Product";

export const fetchProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const productsRef = collection(projectFirestore, "products");
    const productsQueryRef = query(productsRef, orderBy("name"));

    const unsub = onSnapshot(productsQueryRef, (querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => {
        return { ...(doc.data() as Product), id: doc.id };
      });
      setProducts(data);
    });
    return unsub;
  }, []);

  return { products };
};
