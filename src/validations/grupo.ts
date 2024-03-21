import * as Yup from "yup";

export const grupoSchema = Yup.object({
  nombre: Yup.string().required("Nombre es requerido"),
  descripcion: Yup.string().required("Descripcion es requerido"),
});

export interface GrupoForm extends Yup.InferType<typeof grupoSchema> {}

export const grupoAccesos = Yup.object({
  menus: Yup.array().required(),
});

export interface GrupoAccesos extends Yup.InferType<typeof grupoAccesos> {}