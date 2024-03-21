import * as Yup from "yup";

export const usuarioSchema = Yup.object({
  telefono: Yup.string().required("Telefono es requerido"),
  login: Yup.string().required("Login es requerido"),
  password: Yup.string()
    .min(8, "Al menos 8 caracteres")
    .matches(/[0-9]/, "Al menos un número")
    .matches(/[!@#$%^&*(),.?":{}|<>]/, "Al menos un carácter especial")
    .lowercase("Al menos un caracter en minuscula")
    .uppercase("Al menos un caracter en mayuscula")
    .required("La contraseña es requerida"),
});

export interface UsuarioForm extends Yup.InferType<typeof usuarioSchema> {}
