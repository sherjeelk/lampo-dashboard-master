import {Order} from "./Order";
import {Services} from "./Services";

export interface Products {
  id: number;
  name: string;
  desc: string;
  enable: boolean;
  brand: string;
  checked: boolean;
  service: Services;
  created_at: Date;
  updated_at: Date;
  price: number;
  order: Order;
  image: any;
}
