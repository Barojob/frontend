import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import Button from "./Button";

const meta: Meta<typeof Button> = {
  title: "Atoms/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      description: "버튼 스타일",
      control: "select",
      options: ["primary", "secondary"],
    },
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
    },
  },
  decorators: [
    (Story: React.FC) => (
      <div className="w-full max-w-[15rem]">
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "primary",
    size: "md",
    children: "로그인",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    size: "md",
    children: "회원가입",
  },
};
