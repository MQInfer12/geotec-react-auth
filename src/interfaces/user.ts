import { BaseRes } from "./baseRes";

export interface User extends BaseRes {
  id: number;
  login: string;
  telefono: string | null;
}

export interface UserRes extends BaseRes {
  idProyecto: string;
  login: string;
  telefono: string;
  verificado: string;
  codigoSecreto: string;
  firma: string;
  notificacion: string;
}
