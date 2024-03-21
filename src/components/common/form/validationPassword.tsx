import IconCircle from "@assets/icons/iconCircle";
import { useState, useEffect } from "react";
import { useFormikContext } from "formik";
import IconCheck from "@assets/icons/iconCheck";
const ValidationPassword = () => {
  const { values } = useFormikContext();
  //@ts-ignore
  const password = values.password;
  const [validation, setValidation] = useState({
    caracterMayuscula: false,
    caracterNumero: false,
    caracterMinuscula: false,
    caracterEspecial: false,
    longitud: false,
  });
  useEffect(() => {
    setValidation({
      caracterMayuscula: /[A-Z]/.test(password),
      caracterNumero: /[0-9]/.test(password),
      caracterMinuscula: /[a-z]/.test(password),
      /*        caracterEspecial: /[!@#\$%\^&\*]/.test(password), */
      caracterEspecial: /[!@#$%^&*]/.test(password),
      longitud: password.length >= 8,
    });
  }, [password]);

  return (
    <div>
      <ul className="text-sm ml-2 font-semibold text-gray-500">
        <li className="flex items-center justify-between">
          {validation.caracterMinuscula ? <IconCheck /> : <IconCircle />}Al
          menos un caracter en minuscula
        </li>
        <li className="flex items-center justify-between">
          {validation.caracterMayuscula ? <IconCheck /> : <IconCircle />}Al
          menos un caracter en mayuscula
        </li>
        <li className="flex items-center justify-between">
          {validation.caracterNumero ? <IconCheck /> : <IconCircle />}Al menos
          un numero
        </li>
        <li className="flex items-center justify-between">
          {validation.caracterEspecial ? <IconCheck /> : <IconCircle />}Al menos
          un caracter especial
        </li>
        <li className="flex items-center justify-between">
          {validation.longitud ? <IconCheck /> : <IconCircle />}Al menos 8
          caracteres
        </li>
      </ul>
    </div>
  );
};

export default ValidationPassword;
