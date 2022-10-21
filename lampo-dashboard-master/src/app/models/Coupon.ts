export interface Coupon {
  active: boolean;
  code: string;
  coupon: string,
  type: string,
  expiry: any,
  createdAt: Date;
  discount: number;
  discountType: string;
  checked: boolean;
  id: string;
  name: string;
  updatedAt: Date;
  valid: Date;
}
