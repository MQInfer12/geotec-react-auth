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
