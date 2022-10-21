export interface Order {
  id: number;
  created_at: Date;
  updated_at: Date;
  name?: any;
  f_name?: any;
  l_name?: any;
  phone: string;
  email: string;
  street_building?: any;
  postcode: string;
  city: string;
  note?: any;
  propertyArea?: any;
  area?: any;
  service?: any;
  contactMe?: any;
  image: any[];
  products: any[];
  checked: boolean;
  total: number;
}
