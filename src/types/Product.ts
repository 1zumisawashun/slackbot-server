export type Product = {
  amount: number;
  client_id: number;
  client_name: string;
  description: string;
  id: string;
  images: Image[];
  name: string;
  options: unknown[];
  price_jpy: number; // 税込価格
  stock_quantity: number;
  url: string;
};

type Image = {
  title: string;
  url: string;
};
