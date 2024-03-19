import "../../../../index.css";
import type { Meta, StoryFn } from "@storybook/react";
import Form from "../form";
import { BrowserRouter } from "react-router-dom";

const meta: Meta<typeof Form.Checkbox> = {
  title: "Form/Checkbox",
  component: Form.Checkbox,
};

export default meta;

const Template: StoryFn<typeof Form.Checkbox> = (args) => (
  <BrowserRouter>
    <div className="w-96">
      <Form
        initialValues={{
          notify: false,
        }}
      >
        <Form.Column>
          <Form.Checkbox {...args} />
        </Form.Column>
      </Form>
    </div>
  </BrowserRouter>
);

export const Blank = Template.bind({});
Blank.args = {
  name: "notify",
  title: "Notificarme",
  disabled: false,
};
