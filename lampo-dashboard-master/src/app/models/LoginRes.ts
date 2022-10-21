import {User} from "./User";
import {Account} from "./Account";

export interface LoginRes {
  jwt: string;
  user: User;
}
