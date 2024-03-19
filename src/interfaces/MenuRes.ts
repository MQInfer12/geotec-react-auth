import { BaseRes } from "./baseRes";
import { Modelo } from "./modelo";

export interface MenuRes extends BaseRes {
  id: number;
  idPadre: number;
  secuencia: number;
  pathIcono: string;
  pathPadre: string;
  nombre: string;
  nombrePadre: string;
  accion: string;
  modelos: Modelo[];
}
