import { TPermit } from "../../redux/slices/authSlice";

export type TAuthReq = {
  username: string;
  password: string;
};
export type TAuthRes = {
  token: string;
  roles: string;
  username: string;
  roles_permission: TPermit[];
};
