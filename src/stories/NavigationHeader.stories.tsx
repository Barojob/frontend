import NavigationHeader from "@/components/NavigationHeader";
import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

const meta: Meta<typeof NavigationHeader> = {
  title: "Layouts/NavigationHeader",
  component: NavigationHeader,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      description: "헤더에 표시될 제목",
      control: "text",
    },
    onBack: {
      description: "뒤로가기 버튼 클릭 핸들러",
      action: "onBack",
    },
    showBackButton: {
      description: "뒤로가기 버튼 표시 여부",
      control: "boolean",
    },
    className: {
      description: "추가 CSS 클래스",
      control: "text",
    },
  },
  decorators: [
    (Story: React.FC) => (
      <div className="w-full bg-white p-4">
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const WithBackButton: Story = {
  args: {
    title: "휴대폰 인증",
    onBack: () => console.log("뒤로가기 클릭"),
    showBackButton: true,
  },
};

export const WithoutBackButton: Story = {
  args: {
    title: "로그인",
    showBackButton: false,
  },
};

export const Signup: Story = {
  args: {
    title: "회원가입",
    showBackButton: false,
  },
};

export const CareerQualification: Story = {
  args: {
    title: "경력 체크",
    showBackButton: true,
  },
};

export const PhoneVerification: Story = {
  args: {
    title: "휴대폰 인증",
    onBack: () => console.log("뒤로가기 클릭"),
    showBackButton: true,
  },
};
