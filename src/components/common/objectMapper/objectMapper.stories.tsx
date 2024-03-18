import { Meta, StoryFn } from "@storybook/react";
import "../../../index.css";
import ObjectMapper from "./objectMapper";

const meta: Meta<typeof ObjectMapper> = {
  title: "ObjectMapper",
  component: ObjectMapper,
};

export default meta;

const Template: StoryFn<typeof ObjectMapper> = (args) => {
  return (
    <div className="w-64">
      <ObjectMapper {...args} />
    </div>
  );
};

export const Primary = Template.bind({});
Primary.args = {
  obj: {
    nombre: "Pepito",
    apellido: "Lopez",
    cargo: "Obrero",
  },
};
