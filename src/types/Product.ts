export type Product = {
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
