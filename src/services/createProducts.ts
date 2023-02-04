import { projectFirestore } from "../libs/firebase";
import { collection, addDoc } from "firebase/firestore";
import { Product } from "../types/Product";

export const createProducts = async (product: Product) => {
  const productsRef = collection(projectFirestore, "products");
  await addDoc(productsRef, product);
};
