import { GrupoRes } from "./GrupoRes";



export interface UsuarioRes {
    id:number;
    login: string
    password: string;
    telefono: string
/*     verificado: string
    codigoSecreto: string
    firma: string
    notificacion: string */
    proyecto: string
    grupos:GrupoRes[]
  }
  
