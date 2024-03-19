import { useEffect, useState } from "react";
import { PageContainer, TableContainer, createColumns } from ".";
import { ApiResponse } from "./interfaces/apiResponse";

export interface UsuarioRes {
    id: number;
    idTipoUsuario: number;
    idEmpresa: number;
    nombreContacto: string;
    nombreTipoUsuario: string;
    idContacto: number;
    idAccion: number;
    telefono: string;
    login: string;
    password: string;
    codigoSecreto?: string;
    firma?: string;
    notificacion?: string;
    estadoBot?: string;
    codigoBot?: string;
    activo: boolean;
  }
  
const Test = () => {
  const [res, setRes] = useState<ApiResponse<UsuarioRes>>({} as ApiResponse<UsuarioRes>);
  const getData = async () => {
    try {
      const response = await fetch("http://localhost:5121/recBanco", {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + "",
        },
      });
      const res = await response.json();
      console.log(res);
      setRes(res);

      //setRes(json);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const columns = createColumns<UsuarioRes>([
    {
      header: "Nombre",
      accessorKey: "login",
    },
    {
      header: "Tipo usuario",
      accessorKey: "nombreTipoUsuario",
    },
    {
      header: "Empresa",
      accessorKey: "idEmpresa",
    },
    {
      header: "Contacto",
      accessorKey: "nombreContacto",
    },
    {
      header: "Telefono",
      accessorKey: "telefono",
    },
    {
      header: "Firma",
      accessorKey: "firma",
    },
    {
      header: "Estado bot",
      accessorKey: "estadoBot",
    },
    {
      header: "Codigo bot",
      accessorKey: "codigoBot",
    },
    {
      header: "Activo",
      accessorKey: "activo",
    },
  ]);

  return (
    <PageContainer title="hola">
      <TableContainer
        name="usuarios"
        fixKey="id"
        columns={columns}
        data={res?.data}
        reload={getData}
        controls={[]}
      />
    </PageContainer>
  );
};

export default Test;
