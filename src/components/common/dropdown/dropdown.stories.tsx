import { Meta, StoryFn } from "@storybook/react";
import Dropdown from "./dropdown";
import Button from "../button/button";
import "../../../index.css";

const meta: Meta<any> = {
  title: "Dropdown",
  component: Dropdown,
  argTypes: {
    align: {
      control: {
        type: "select",
      },
      options: ["start", "end"],
    },
  },
};

export default meta;

const Template: StoryFn<any> = (args) => {
  const classNames = ["flex"];
  if(args.align === "end") {
    classNames.push("justify-end");
  }
  return (
    <div className={classNames.join(" ")}>
      <Dropdown {...args} />
    </div>
  );
};

export const InLeft = Template.bind({});
InLeft.args = {
  title: "Dropdown",
  align: "start",
  disabled: false,
  children: "Hola mundo",
  toggleElement: <Button>Abrir dropdown</Button>,
};

export const InRight = Template.bind({});
InRight.args = {
  title: "Dropdown",
  align: "end",
  disabled: false,
  children: "Hola mundo",
  toggleElement: (
    <div className="w-full flex justify-end">
      <Button>Abrir dropdown</Button>
    </div>
  ),
};
