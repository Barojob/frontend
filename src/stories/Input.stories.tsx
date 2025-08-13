import { Meta, StoryFn } from "@storybook/react";
import React from "react";
import Input, { InputProps } from "../components/Input";

export default {
  title: "Components/Input",
  component: Input,
  argTypes: {
    type: {
      control: {
        type: "select",
        options: ["text", "password", "email", "textarea"],
      },
    },
    value: { control: "text" },
    placeholder: { control: "text" },
    rounded: {
      control: {
        type: "select",
        options: ["full", "lg", "md"],
      },
    },
    size: {
      control: {
        type: "select",
        options: ["lg", "md", "sm"],
      },
    },
    onValueChange: { action: "value changed" },
  },
} as Meta;

const Template: StoryFn<InputProps> = (args) => {
  const [value, setValue] = React.useState("");
  return <Input {...args} value={value} onValueChange={setValue} />;
};

export const Default = Template.bind({});
Default.args = {
  type: "text",
  placeholder: "Enter text...",
  rounded: "lg",
  size: "md",
};

export const Password = Template.bind({});
Password.args = {
  type: "password",
  placeholder: "Enter password...",
  rounded: "lg",
  size: "md",
};

export const Email = Template.bind({});
Email.args = {
  type: "email",
  placeholder: "Enter email...",
  rounded: "lg",
  size: "md",
};

export const TextArea = Template.bind({});
TextArea.args = {
  type: "textarea",
  placeholder: "Enter your message...",
  rounded: "lg",
  size: "md",
};
