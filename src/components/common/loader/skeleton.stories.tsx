import type { Meta, StoryFn } from "@storybook/react";
import Skeleton from "./skeleton";

const meta: Meta<typeof Skeleton> = {
  title: "Skeleton",
  component: Skeleton,
  argTypes: {
    containerWidth: {
      control: "number",
      defaultValue: 40,
    },
    containerHeight: {
      control: "number",
      defaultValue: 40,
    },
  },
};

export default meta;

const Template: StoryFn<typeof Skeleton> = ({
  containerWidth,
  containerHeight,
}: any) => (
  <div
    style={{
      height: `${containerHeight}px`,
      width: `${containerWidth}px`,
    }}
  >
    <Skeleton />
  </div>
);

export const Primary = Template.bind({});
Primary.args = {
  type: "Primary",
};

export const Text = Template.bind({});
Text.args = {
  type: "Text",
};
