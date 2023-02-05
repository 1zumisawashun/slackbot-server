import { projectFirestore } from "../libs/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Product, initProduct } from "../types/Product";

export const fetchProduct = (id: string) => {
  const [product, setProduct] = useState<Product>(initProduct);

  const asyncFunc = async () => {
    const productRef = doc(projectFirestore, "products", id);
    const documentSnapshot = await getDoc(productRef);

    const data = {
      ...(documentSnapshot.data() as Product),
      id: documentSnapshot.id,
    };

    setProduct(data);
  };

  useEffect(() => {
    asyncFunc();
  }, []);

  return { product };
};
