import {Account} from "./Account";

export interface User {
  id: number;
  account: Account;
  role: any;
  name: string;
  username: string;
  email: string;
  confirmed: boolean;
}
