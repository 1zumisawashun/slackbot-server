export const initProduct = {
  amount: 0,
  client_id: "",
  client_name: "",
  description: "",
  id: "",
  images: [
    {
      url: "",
      title: "",
    },
  ],
  name: "",
  options: [],
  price_jpy: 0,
  stock_quantity: 0,
};

export type Product = {
  amount: number;
  client_id: string;
  client_name: string;
  description: string;
  id: string;
  images: {
    title: string;
    url: string;
  }[];
  name: string;
  options: any[];
  price_jpy: number; // 税込価格
  stock_quantity: number;
};
