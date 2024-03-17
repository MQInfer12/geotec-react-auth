import { BaseRes } from "./baseRes";
import { Modelo } from "./modelo";

enum ASIDEICONS {
  CONTACTOS = "Contactos",
  COMPRAS = "Compras",
  VENTAS = "Ventas",
  INVENTARIO = "Inventario",
  PUNTERO = "Puntero",
  DASHBOARD = "Dashboard",
  CONTABLE = "Contable",
  CONFIGURACION = "Configuracion",
  HOME = "Home",
  CATALOGO = "Catalogo",
}

export interface Menu extends BaseRes {
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

export interface MenuPadre {
  id: number;
  icon: ASIDEICONS;
  nombre: string;
  hijos: MenuHijo[];
}

export interface MenuHijo {
  id: number;
  nombre: string;
  accion: string | null;
  hijos: MenuHijo[];
  padre: string;
}
