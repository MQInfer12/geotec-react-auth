import { useEffect, useState } from "react";
import { PageContainer, TableContainer, createColumns } from "..";
import { ApiResponse } from "../interfaces/apiResponse";

export interface BancoRes {
    id: number;
    nombre: string;
    direccion:string;
    direccion2:string;
    codigoPostal:string;
    ciudad:string;
    email:string;
    telefono:string
  }
  
const Test = () => {
  const [res, setRes] = useState<ApiResponse<BancoRes[]>>({} as ApiResponse<BancoRes[]>);
  const getData = async () => {
    try {
      const response = await fetch("http://localhost:5121/recBanco", {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + "",
        },
      });
      const res = await response.json();
      setRes(res);

      //setRes(json);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const columns = createColumns<BancoRes>([
    {
      header: "Nombre",
      accessorKey: "nombre",
    },
    {
      header: "Direccion",
      accessorKey: "direccion",
    },
    {
      header: "Segunda direccion",
      accessorKey: "direccion2",
    },
    {
      header: "Codigo postal",
      accessorKey: "codigoPostal",
    },
    {
      header: "Ciudad",
      accessorKey: "ciudad",
    },
    {
      header: "Email",
      accessorKey: "email",
    },
    {
      header: "Telefono",
      accessorKey: "telefono",
    },
  ]);

  return (
    <PageContainer title="hola">
      <TableContainer
        name="roles"
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
