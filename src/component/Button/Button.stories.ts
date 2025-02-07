import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Button } from "./Button";

const meta = {
  title: "Example/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    backgroundColor: { control: "color" },
    primary: { control: "boolean" },
    size: {
      control: "radio",
      options: ["small", "medium", "large"],
    },
    label: { control: "text" },
    isLoading: { control: "boolean" },
    icon: { control: "text" },
  },
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    primary: true,
    label: "Primary Button",
    size: "medium",
  },
};
