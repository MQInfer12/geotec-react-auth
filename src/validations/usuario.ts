import * as Yup from "yup";

export const usuarioSchema = Yup.object({
  idPadre: Yup.number(),
  secuencia: Yup.number().required("Secuencia es requerido"),
  pathIcono: Yup.string(),
  pathPadre: Yup.string(),
  nombre: Yup.string().required("Nombre es requerido"),
  accion: Yup.string().required("Accion es requerido"),
});

export interface UsuarioForm extends Yup.InferType<typeof usuarioSchema> {}
