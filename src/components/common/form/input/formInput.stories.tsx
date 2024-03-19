import "../../../../index.css";
import type { Meta, StoryFn } from "@storybook/react";
import Form from "../form";
import { BrowserRouter } from "react-router-dom";

const meta: Meta<typeof Form.Input> = {
  title: "Form/Input",
  component: Form.Input,
};

export default meta;

const Template: StoryFn<typeof Form.Input> = (args) => (
  <BrowserRouter>
    <div className="w-96">
      <Form initialValues={{}}>
        <Form.Input {...args} />
      </Form>
    </div>
  </BrowserRouter>
);

export const Blank = Template.bind({});
Blank.args = {
  name: "username",
  title: "Username",
  placeholder: "Ingrese username",
  type: "text",
  error: "",
  disabled: false,
};

export const Error = Template.bind({});
Error.args = {
  name: "username",
  title: "Username",
  placeholder: "Ingrese username",
  type: "text",
  error: "Username is required",
  disabled: false,
};

export const Disabled = Template.bind({});
Disabled.args = {
  name: "username",
  title: "Username",
  placeholder: "Ingrese username",
  type: "text",
  error: "",
  disabled: true,
};
