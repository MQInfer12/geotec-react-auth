import { Acceso } from "./acceso";
import { BaseRes } from "./baseRes";
import { Menu } from "./menu";

export interface Grupo extends BaseRes {
  id: number;
  nombre: string;
  descripcion: string;
  menus: Menu[];
  accesos: Acceso[];
}
