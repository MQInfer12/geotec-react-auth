import "../../../index.css";
import type { Meta, StoryFn } from "@storybook/react";
import Form from "./form";
import { BrowserRouter } from "react-router-dom";
import * as Yup from "yup";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { alertSuccess } from "../../../utils/alertsToast";

const meta: Meta<typeof Form> = {
  title: "Form/Form",
  component: Form,
};

export default meta;

const Template: StoryFn<typeof Form> = (args) => (
  <BrowserRouter>
    <ToastContainer />
    <div className="w-[800px] border border-gray-300/30 resize overflow-auto">
      <Form {...args} />
    </div>
  </BrowserRouter>
);

export const SimpleLogin = Template.bind({});
SimpleLogin.args = {
  initialValues: {
    username: "",
    password: "",
  },
  validationSchema: Yup.object({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  }),
  children: (
    <Form.Column>
      <Form.Input name="username" title="Username" />
      <Form.Input name="password" title="Password" type="password" />
    </Form.Column>
  ),
  post: (values) => alertSuccess(JSON.stringify(values)),
};

export const ModifyItem = Template.bind({});

const item = {
  nombre: "Mauricio",
  edad: 22,
  genero: "Hombre",
};

ModifyItem.args = {
  item: item,
  initialValues: {
    nombre: item.nombre,
    edad: item.edad,
    genero: item.genero,
  },
  validationSchema: Yup.object({
    nombre: Yup.string().required("Nombre es requerido"),
    edad: Yup.number().required("Edad es requerida"),
    genero: Yup.string().required("Apellido es requerido"),
  }),
  children: (
    <Form.Column>
      <Form.Input name="nombre" title="Nombre" />
      <Form.Input name="edad" title="Edad" type="number" />
      <Form.Select
        name="genero"
        title="Género"
        placeholder="Seleccione un género"
      >
        <Form.Option value="Hombre">Hombre</Form.Option>
        <Form.Option value="Mujer">Mujer</Form.Option>
      </Form.Select>
    </Form.Column>
  ),
  put: (values) => alertSuccess(JSON.stringify(values)),
  del: () => {},
};

export const BigForm = Template.bind({});
BigForm.args = {
  initialValues: {
    nombre: "",
    apellido: "",
    CI: "",
    passport: "",
    direccion: "",
    zona: "",
    ciudad: "",
    favFood: "",
    favSport: "",
    notify: false,
  },
  validationSchema: Yup.object({
    nombre: Yup.string().required("Nombre es requerido"),
    apellido: Yup.string().required("Apellido es requerido"),
    CI: Yup.number().required("CI es requerido"),
    passport: Yup.number(),
    direccion: Yup.string().required("Dirección es requerida"),
    zona: Yup.string().required("Zona es requerida"),
    ciudad: Yup.string().required("Ciudad es requerida"),
    favFood: Yup.string().required("Comida favorita es requerida"),
    favSport: Yup.string().required("Deporte favorito es requerido"),
    notify: Yup.boolean(),
  }),
  title: "Datos personales",
  children: (
    <>
      <Form.Column>
        <Form.Section title="Nombres" expandable>
          <Form.Input name="nombre" title="Nombre" />
          <Form.Input name="apellido" title="Apellido" />
        </Form.Section>
        <Form.Section title="Historial" expandable>
          <Form.Input name="CI" title="CI" />
          <Form.Input name="passport" title="Pasaporte" />
        </Form.Section>
      </Form.Column>
      <Form.Column>
        <Form.Section title="Ubicación" expandable>
          <Form.Input name="direccion" title="Dirección" />
          <Form.Input name="zona" title="Zona" />
          <Form.Select
            name="ciudad"
            title="Ciudad"
            placeholder="Seleccione una ciudad"
          >
            <Form.Option value="Cochabamba">Cochabamba</Form.Option>
            <Form.Option value="Santa Cruz">Santa Cruz</Form.Option>
            <Form.Option value="La Paz">La Paz</Form.Option>
          </Form.Select>
        </Form.Section>
        <Form.Section title="Gustos" expandable>
          <Form.Input name="favFood" title="Comida favorita" />
          <Form.Input name="favSport" title="Deporte favorito" />
        </Form.Section>
        <Form.Section title="Preferencias">
          <Form.Checkbox name="notify" title="Notificarme por correo" />
        </Form.Section>
      </Form.Column>
    </>
  ),
  post: (values) => alertSuccess(JSON.stringify(values)),
};

export const BigForm2 = Template.bind({});
BigForm2.args = {
  initialValues: {
    nombre: "",
    apellido: "",
    CI: "",
    passport: "",
    direccion: "",
    zona: "",
    ciudad: "",
    favFood: "",
    favSport: "",
    notify: false,
    terms: false,
    conditions: false,
  },
  validationSchema: Yup.object({
    nombre: Yup.string().required("Nombre es requerido"),
    apellido: Yup.string().required("Apellido es requerido"),
    apodo: Yup.string().required("Apodo es requerido"),
    CI: Yup.number().required("CI es requerido"),
    passport: Yup.number(),
    direccion: Yup.string().required("Dirección es requerida"),
    zona: Yup.string().required("Zona es requerida"),
    ciudad: Yup.string().required("Ciudad es requerida"),
    favFood: Yup.string().required("Comida favorita es requerida"),
    favSport: Yup.string().required("Deporte favorito es requerido"),
    notify: Yup.boolean(),
    terms: Yup.boolean(),
    conditions: Yup.boolean(),
  }),
  title: "Datos personales",
  children: (
    <>
      <Form.Section row title="Nombres" expandable>
        <Form.Input name="nombre" title="Nombre" />
        <Form.Input name="apellido" title="Apellido" />
        <Form.Input name="apodo" title="Apodo" />
      </Form.Section>
      <Form.Column>
        <Form.Section title="Historial" expandable>
          <Form.Input name="CI" title="CI" />
          <Form.Input name="passport" title="Pasaporte" />
        </Form.Section>
        <Form.Section title="Gustos" expandable>
          <Form.Input name="favFood" title="Comida favorita" />
          <Form.Input name="favSport" title="Deporte favorito" />
        </Form.Section>
      </Form.Column>
      <Form.Column>
        <Form.Section title="Ubicación" expandable>
          <Form.Input name="direccion" title="Dirección" />
          <Form.Input name="zona" title="Zona" />
          <Form.Select
            name="ciudad"
            title="Ciudad"
            placeholder="Seleccione una ciudad"
          >
            <Form.Option value="Cochabamba">Cochabamba</Form.Option>
            <Form.Option value="Santa Cruz">Santa Cruz</Form.Option>
            <Form.Option value="La Paz">La Paz</Form.Option>
          </Form.Select>
        </Form.Section>
      </Form.Column>
      <Form.Section row title="Preferencias">
        <Form.Checkbox name="notify" title="Notificarme por correo" />
        <Form.Checkbox name="terms" title="Acepto los términos de la empresa" />
        <Form.Checkbox
          name="conditions"
          title="Acepto las condiciones de la empresa"
        />
      </Form.Section>
    </>
  ),
  post: (values) => alertSuccess(JSON.stringify(values)),
};
