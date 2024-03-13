import { BaseRes } from "./baseRes";

export interface Acceso extends BaseRes {
  id: number;
  idGrupo: number;
  idModelo: number;
  nombre: string;
  ver: boolean;
  crear: boolean;
  editar: boolean;
  eliminar: boolean;
}