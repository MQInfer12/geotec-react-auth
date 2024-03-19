import { BaseRes } from "./baseRes";

export interface User extends BaseRes {
  id: number;
  login: string;
  telefono: string | null;
}
