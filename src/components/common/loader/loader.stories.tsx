import { Meta, StoryFn } from "@storybook/react";
import Loader from "./loader";
import "../../../index.css";

const meta: Meta<typeof Loader> = {
  title: "Loader",
  component: Loader,
};

export default meta;

const Template: StoryFn<typeof Loader> = (args) => (
  <div className="w-full h-48">
    <Loader {...args} />
  </div>
);

export const Primary = Template.bind({});
Primary.args = {
  text: "Cargando...",
};
