import { Meta, StoryObj } from "@storybook/react";
import LabelInput from "./LabelInput";

const meta: Meta<typeof LabelInput> = {
  title: "Molecules/LabelInput",
  component: LabelInput,
  argTypes: {
    label: {
      description: "라벨 텍스트",
      control: "text",
    },
    type: {
      description: "input 타입",
      control: "select",
      options: ["text", "password", "email", "textarea"],
    },
    labelsize: {
      description: "라벨 크기",
      control: "select",
      options: ["lg", "md", "sm"],
    },
    size: {
      description: "input 크기",
      control: "select",
      options: ["lg", "md", "sm"],
    },
    error: {
      description: "에러 메시지",
      control: "text",
    },
    placeholder: {
      description: "placeholder 텍스트",
      control: "text",
    },
  },
  args: {
    label: "Label",
    type: "text",
    labelsize: "md",
    size: "md",
    placeholder: "Placeholder",
  },
};

export default meta;

type Story = StoryObj<typeof LabelInput>;

export const Default: Story = {
  args: {
    label: "Label",
    type: "text",
    labelsize: "md",
    size: "md",
    placeholder: "Placeholder",
  },
};

export const Error: Story = {
  args: {
    label: "error",
    type: "text",
    size: "md",
    labelsize: "lg",
    placeholder: "Placeholder",
    error: "에러 메시지",
  },
};

export const Textarea: Story = {
  args: {
    label: "Label",
    type: "textarea",
    size: "md",
    labelsize: "md",
    placeholder: "Placeholder",
  },
};

export const Password: Story = {
  args: {
    label: "비밀번호 입력",
    type: "password",
    size: "md",
    labelsize: "md",
    placeholder: "비밀번호를 입력하세요.",
  },
};

export const PasswordError: Story = {
  args: {
    label: "에러메시지 있는 비밀번호 입력",
    type: "password",
    size: "md",
    labelsize: "md",
    placeholder: "비밀번호를 입력하세요.",
    error: "비밀번호가 일치하지 않습니다.",
  },
};

export const Email: Story = {
  args: {
    label: "이메일",
    type: "email",
    size: "md",
    labelsize: "md",
    placeholder: "이메일을 입력하세요.",
  },
};
