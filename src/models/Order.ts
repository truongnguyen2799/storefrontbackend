import { Product } from "./Product";

export type Order = {
  id: Number;
  user_id: string;
  status_of_order: string;
  listProduct: Product[];
};

export class OrderStore {
    
}