/* import { AccesoRes } from "./AccesoRes"; */
import { MenuRes } from "./MenuRes";
import { Acceso } from "./acceso";
import { BaseRes } from "./baseRes";
/* import { MenuRes } from "./MenuRes"; */

export interface GrupoRes extends BaseRes {
  id: number;
  idCategoria: number;
  nombre: string;
  descripcion: string;
   menus: MenuRes[];
  accesos: Acceso[]; 
}
