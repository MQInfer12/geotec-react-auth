export enum AUTH {
  BASE = "auth",
  LOGIN = "/login",
  ME = "/me",
  REGISTER = "/register",
}

enum GRUPO {
  BASE = "recGrupo",
  GET = GRUPO.BASE,
  GETALL = GRUPO.BASE + "/all",
  FIND = GRUPO.BASE + "/",
  POST = GRUPO.BASE,
  PUT = GRUPO.BASE + "/",
  DELETE = GRUPO.BASE + "/",
  ACCESOS = GRUPO.BASE + "/accesos/",
}

enum USUARIO {
  BASE = "Usuarios",
  GET = USUARIO.BASE,
  GETALL = USUARIO.BASE + "/all",
  FIND = USUARIO.BASE + "/",
  POST = USUARIO.BASE,
  PUT = USUARIO.BASE + "/",
  GRUPOS = USUARIO.BASE + "/grupos/",
  DELETE = USUARIO.BASE + "/",
}

export const ENDPOINTS = {
  GRUPO,
  USUARIO
};
