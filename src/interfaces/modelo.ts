import { BaseRes } from "./baseRes";

export interface Modelo extends BaseRes {
  id: number;
  modelo: string;
  descripcion: string;
  tipo: string;
  secuencia: string;
  nombreMenu: string;
  idMenu: number;
}