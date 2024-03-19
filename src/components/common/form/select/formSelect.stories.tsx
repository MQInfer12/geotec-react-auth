import "../../../../index.css";
import type { Meta, StoryFn } from "@storybook/react";
import { BrowserRouter } from "react-router-dom";
import Form from "../form";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { alertSuccess } from "../../../../utils/alertsToast";

const meta: Meta<typeof Form.Select> = {
  title: "Form/Select",
  component: Form.Select,
};

export default meta;

const Template: StoryFn<typeof Form.Select> = (args) => (
  <BrowserRouter>
    <ToastContainer />
    <div className="w-96">
      <Form
        initialValues={{ fruits: "" }}
        post={(values) => alertSuccess(JSON.stringify(values))}
      >
        <Form.Select {...args} />
      </Form>
    </div>
  </BrowserRouter>
);

export const Blank = Template.bind({});
Blank.args = {
  title: "Frutas",
  name: "fruits",
  placeholder: "Seleccione una fruta",
  children: (
    <>
      <Form.Option value="Manzana">Manzana</Form.Option>
      <Form.Option value="Plátano">Plátano</Form.Option>
      <Form.Option value="Sandía">Sandía</Form.Option>
    </>
  ),
  error: "",
  disabled: false,
};

export const Error = Template.bind({});
Error.args = {
  title: "Frutas",
  name: "fruits",
  placeholder: "Seleccione una fruta",
  children: (
    <>
      <Form.Option value="Manzana">Manzana</Form.Option>
      <Form.Option value="Plátano">Plátano</Form.Option>
      <Form.Option value="Sandía">Sandía</Form.Option>
    </>
  ),
  error: "Fruta es requerida",
  disabled: false,
};

export const Disabled = Template.bind({});
Disabled.args = {
  title: "Frutas",
  name: "fruits",
  placeholder: "Seleccione una fruta",
  children: (
    <>
      <Form.Option value="Manzana">Manzana</Form.Option>
      <Form.Option value="Plátano">Plátano</Form.Option>
      <Form.Option value="Sandía">Sandía</Form.Option>
    </>
  ),
  error: "",
  disabled: true,
};

export const Searchable = Template.bind({});
Searchable.args = {
  title: "Frutas",
  name: "fruits",
  placeholder: "Seleccione una fruta",
  children: (
    <>
      <Form.Option value="Manzana">Manzana</Form.Option>
      <Form.Option value="Plátano">Plátano</Form.Option>
      <Form.Option value="Sandía">Sandía</Form.Option>
    </>
  ),
  searchable: true,
  error: "",
  disabled: false,
};

export const AlwaysShow = Template.bind({});
AlwaysShow.args = {
  title: "Frutas",
  name: "fruits",
  placeholder: "Seleccione una fruta",
  children: (
    <>
      <Form.Option value="Manzana">Manzana</Form.Option>
      <Form.Option value="Plátano">Plátano</Form.Option>
      <Form.Option value="Sandía">Sandía</Form.Option>
    </>
  ),
  searchable: false,
  error: "",
  disabled: false,
  alwaysShow: true,
};

const MTemplate: StoryFn<typeof Form.Select> = (args) => (
  <BrowserRouter>
    <ToastContainer />
    <div className="w-96">
      <Form
        initialValues={{ fruits: [] }}
        post={(values) => alertSuccess(JSON.stringify(values))}
      >
        <Form.Select {...args} />
      </Form>
    </div>
  </BrowserRouter>
);

export const Multiple = MTemplate.bind({});
Multiple.args = {
  title: "Frutas",
  name: "fruits",
  placeholder: "Seleccione varias frutas",
  children: (
    <>
      <Form.Option value="1">Manzana</Form.Option>
      <Form.Option value="2">Plátano</Form.Option>
      <Form.Option value="3">Sandía</Form.Option>
      <Form.Option value="4">Papaya</Form.Option>
      <Form.Option value="5">Naranja</Form.Option>
      <Form.Option value="6">Mandarina</Form.Option>
    </>
  ),
  searchable: false,
  error: "",
  disabled: false,
};

export const AlwaysShowMultiple = MTemplate.bind({});
AlwaysShowMultiple.args = {
  title: "Frutas",
  name: "fruits",
  placeholder: "Seleccione varias frutas",
  children: (
    <>
      <Form.Option value="1">Manzana</Form.Option>
      <Form.Option value="2">Plátano</Form.Option>
      <Form.Option value="3">Sandía</Form.Option>
      <Form.Option value="4">Papaya</Form.Option>
    </>
  ),
  searchable: false,
  error: "",
  disabled: false,
  alwaysShow: true,
};
