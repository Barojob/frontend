import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import BaseCheckBox from "./BaseCheckBox";
import CheckBoxWithLabel from "./CheckBoxWithLabel";
import { BaseCircleCheckBox, CircleCheckBoxWithLabel } from "./CircleCheckBox";
import OptionCheckBox from "./OptionCheckBox";

const meta: Meta = {
  title: "Components/CheckBox",
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
체크박스 컴포넌트 라이브러리입니다. 다섯 가지 종류의 체크박스를 제공합니다:

- **BaseCheckBox**: 순수 체크박스, 최대 유연성
- **CheckBoxWithLabel**: 라벨 포함 범용 체크박스  
- **OptionCheckBox**: 옵션 선택용 특화 디자인
- **BaseCircleCheckBox**: 순수 원형 체크박스
- **CircleCheckBoxWithLabel**: 라벨 포함 원형 체크박스 (전체 동의용)

각 컴포넌트는 독립적으로 사용할 수 있으며, 용도에 맞게 선택하여 사용하세요.
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
      description: "체크박스 크기",
    },
    isChecked: {
      control: "boolean",
      description: "체크 상태",
    },
    disabled: {
      control: "boolean",
      description: "비활성화 상태",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ===== BaseCheckBox =====
export const BaseCheckBox_Default: Story = {
  name: "BaseCheckBox - 기본",
  render: (args) => {
    const [checked, setChecked] = useState(args.isChecked || false);
    return <BaseCheckBox {...args} isChecked={checked} onChange={setChecked} />;
  },
  args: {
    isChecked: false,
    disabled: false,
    size: "md",
  },
  parameters: {
    docs: {
      description: {
        story:
          "순수 체크박스 컴포넌트입니다. 최대한의 유연성을 제공하며 커스텀 레이아웃에 적합합니다.",
      },
    },
  },
};

export const BaseCheckBox_Sizes: Story = {
  name: "BaseCheckBox - 크기별",
  render: () => {
    const [checkedSm, setCheckedSm] = useState(false);
    const [checkedMd, setCheckedMd] = useState(true);
    const [checkedLg, setCheckedLg] = useState(false);

    return (
      <div className="flex items-center gap-6">
        <div className="flex flex-col items-center gap-2">
          <BaseCheckBox
            size="sm"
            isChecked={checkedSm}
            onChange={setCheckedSm}
          />
          <span className="text-xs">Small</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <BaseCheckBox
            size="md"
            isChecked={checkedMd}
            onChange={setCheckedMd}
          />
          <span className="text-xs">Medium</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <BaseCheckBox
            size="lg"
            isChecked={checkedLg}
            onChange={setCheckedLg}
          />
          <span className="text-xs">Large</span>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "BaseCheckBox의 세 가지 크기 옵션을 보여줍니다.",
      },
    },
  },
};

export const BaseCheckBox_Disabled: Story = {
  name: "BaseCheckBox - 비활성화",
  render: () => (
    <div className="flex items-center gap-4">
      <BaseCheckBox isChecked={false} onChange={() => {}} disabled={true} />
      <BaseCheckBox isChecked={true} onChange={() => {}} disabled={true} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "비활성화된 상태의 BaseCheckBox입니다.",
      },
    },
  },
};

// ===== CheckBoxWithLabel =====
export const CheckBoxWithLabel_Default: Story = {
  name: "CheckBoxWithLabel - 기본",
  render: (args) => {
    const [checked, setChecked] = useState(args.isChecked || false);
    return (
      <CheckBoxWithLabel
        {...args}
        label="약관에 동의합니다"
        isChecked={checked}
        onChange={setChecked}
      />
    );
  },
  args: {
    isChecked: false,
    disabled: false,
    size: "md",
  },
  parameters: {
    docs: {
      description: {
        story:
          "라벨이 포함된 범용 체크박스입니다. 일반적인 폼에서 사용하기 적합합니다.",
      },
    },
  },
};

export const CheckBoxWithLabel_Positions: Story = {
  name: "CheckBoxWithLabel - 라벨 위치",
  render: () => {
    const [checkedLeft, setCheckedLeft] = useState(false);
    const [checkedRight, setCheckedRight] = useState(true);

    return (
      <div className="flex flex-col gap-4">
        <CheckBoxWithLabel
          label="왼쪽 라벨"
          isChecked={checkedLeft}
          onChange={setCheckedLeft}
          labelPosition="left"
        />
        <CheckBoxWithLabel
          label="오른쪽 라벨"
          isChecked={checkedRight}
          onChange={setCheckedRight}
          labelPosition="right"
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "라벨을 체크박스의 왼쪽 또는 오른쪽에 배치할 수 있습니다.",
      },
    },
  },
};

export const CheckBoxWithLabel_Sizes: Story = {
  name: "CheckBoxWithLabel - 크기별",
  render: () => {
    const [checkedSm, setCheckedSm] = useState(false);
    const [checkedMd, setCheckedMd] = useState(true);
    const [checkedLg, setCheckedLg] = useState(false);

    return (
      <div className="flex flex-col gap-4">
        <CheckBoxWithLabel
          label="작은 크기"
          size="sm"
          isChecked={checkedSm}
          onChange={setCheckedSm}
        />
        <CheckBoxWithLabel
          label="중간 크기"
          size="md"
          isChecked={checkedMd}
          onChange={setCheckedMd}
        />
        <CheckBoxWithLabel
          label="큰 크기"
          size="lg"
          isChecked={checkedLg}
          onChange={setCheckedLg}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "CheckBoxWithLabel의 세 가지 크기 옵션입니다.",
      },
    },
  },
};

// ===== OptionCheckBox =====
export const OptionCheckBox_Default: Story = {
  name: "OptionCheckBox - 기본",
  render: (args) => {
    const [checked, setChecked] = useState(args.isChecked || false);
    const [viewCount, setViewCount] = useState(0);

    return (
      <div className="w-80 space-y-4">
        <OptionCheckBox
          {...args}
          label="프론트엔드 개발자"
          isChecked={checked}
          onChange={setChecked}
          onView={() => {
            setViewCount((prev) => prev + 1);
            alert("상세 정보를 확인합니다!");
          }}
        />
        <div className="text-xs text-gray-500">
          체크 상태: {checked ? "선택됨" : "선택 안됨"} | 보기 클릭 횟수:{" "}
          {viewCount}
        </div>
      </div>
    );
  },
  args: {
    isChecked: false,
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          "옵션 선택에 특화된 체크박스입니다. 체크박스와 '보기' 버튼이 독립적으로 작동합니다.",
      },
    },
  },
};

export const OptionCheckBox_Variations: Story = {
  name: "OptionCheckBox - 다양한 옵션",
  render: () => {
    const [states, setStates] = useState({
      withButton: false,
      withoutButton: true,
      disabled: false,
      noLabel: false,
    });

    const handleView = (type: string) => {
      alert(`${type} 상세 정보 보기`);
    };

    return (
      <div className="w-80 space-y-3">
        <OptionCheckBox
          label="보기 버튼 포함"
          isChecked={states.withButton}
          onChange={(checked) =>
            setStates((prev) => ({ ...prev, withButton: checked }))
          }
          onView={() => handleView("보기 버튼 포함")}
        />
        <OptionCheckBox
          label="보기 버튼 없음"
          isChecked={states.withoutButton}
          onChange={(checked) =>
            setStates((prev) => ({ ...prev, withoutButton: checked }))
          }
        />
        <OptionCheckBox
          label="비활성화됨"
          isChecked={states.disabled}
          onChange={(checked) =>
            setStates((prev) => ({ ...prev, disabled: checked }))
          }
          onView={() => handleView("비활성화됨")}
          disabled={true}
        />
        <OptionCheckBox
          label="라벨이 있는 체크박스"
          isChecked={states.noLabel}
          onChange={(checked) =>
            setStates((prev) => ({ ...prev, noLabel: checked }))
          }
          onView={() => handleView("라벨이 있는 체크박스")}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "OptionCheckBox의 다양한 설정 옵션들을 보여줍니다. 각 보기 버튼을 클릭해보세요!",
      },
    },
  },
};

export const OptionCheckBox_MultipleSelection: Story = {
  name: "OptionCheckBox - 다중 선택 예시",
  render: () => {
    const [options, setOptions] = useState([
      { id: 1, label: "프론트엔드 개발자", checked: false },
      { id: 2, label: "백엔드 개발자", checked: true },
      { id: 3, label: "UI/UX 디자이너", checked: false },
      { id: 4, label: "데이터 분석가", checked: false },
      { id: 5, label: "프로덕트 매니저", checked: true },
    ]);

    const handleToggle = (id: number) => {
      setOptions((prev) =>
        prev.map((option) =>
          option.id === id ? { ...option, checked: !option.checked } : option,
        ),
      );
    };

    const handleView = (label: string) => {
      alert(
        `${label} 상세 정보:\n\n• 업무 내용\n• 필요 기술\n• 연봉 정보\n• 근무 조건`,
      );
    };

    const selectedCount = options.filter((opt) => opt.checked).length;

    return (
      <div className="w-80">
        <div className="mb-4 text-sm text-gray-600">
          선택된 항목: {selectedCount}개
        </div>
        <div className="space-y-2">
          {options.map((option) => (
            <OptionCheckBox
              key={option.id}
              label={option.label}
              isChecked={option.checked}
              onChange={() => handleToggle(option.id)}
              onView={() => handleView(option.label)}
            />
          ))}
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "OptionCheckBox를 사용한 다중 선택 리스트의 실제 사용 예시입니다. 체크박스와 보기 버튼이 독립적으로 작동합니다.",
      },
    },
  },
};

// ===== CircleCheckBox =====
export const BaseCircleCheckBox_Default: Story = {
  name: "BaseCircleCheckBox - 기본",
  render: (args) => {
    const [checked, setChecked] = useState(args.isChecked || false);
    return (
      <BaseCircleCheckBox {...args} isChecked={checked} onChange={setChecked} />
    );
  },
  args: {
    isChecked: false,
    disabled: false,
    size: "md",
  },
  parameters: {
    docs: {
      description: {
        story:
          "순수 원형 체크박스 컴포넌트입니다. 강조나 특별한 의미를 부여할 때 사용합니다.",
      },
    },
  },
};

export const BaseCircleCheckBox_Sizes: Story = {
  name: "BaseCircleCheckBox - 크기별",
  render: () => {
    const [checkedSm, setCheckedSm] = useState(false);
    const [checkedMd, setCheckedMd] = useState(true);
    const [checkedLg, setCheckedLg] = useState(false);

    return (
      <div className="flex items-center gap-6">
        <div className="flex flex-col items-center gap-2">
          <BaseCircleCheckBox
            size="sm"
            isChecked={checkedSm}
            onChange={setCheckedSm}
          />
          <span className="text-xs">Small</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <BaseCircleCheckBox
            size="md"
            isChecked={checkedMd}
            onChange={setCheckedMd}
          />
          <span className="text-xs">Medium</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <BaseCircleCheckBox
            size="lg"
            isChecked={checkedLg}
            onChange={setCheckedLg}
          />
          <span className="text-xs">Large</span>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "BaseCircleCheckBox의 세 가지 크기 옵션을 보여줍니다.",
      },
    },
  },
};

export const BaseCircleCheckBox_Disabled: Story = {
  name: "BaseCircleCheckBox - 비활성화",
  render: () => (
    <div className="flex items-center gap-4">
      <BaseCircleCheckBox
        isChecked={false}
        onChange={() => {}}
        disabled={true}
      />
      <BaseCircleCheckBox
        isChecked={true}
        onChange={() => {}}
        disabled={true}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "비활성화된 상태의 BaseCircleCheckBox입니다.",
      },
    },
  },
};

export const CircleCheckBoxWithLabel_Default: Story = {
  name: "CircleCheckBoxWithLabel - 기본",
  render: (args) => {
    const [checked, setChecked] = useState(args.isChecked || false);
    return (
      <CircleCheckBoxWithLabel
        {...args}
        label="전체 동의하기"
        isChecked={checked}
        onChange={setChecked}
      />
    );
  },
  args: {
    isChecked: false,
    disabled: false,
    size: "md",
  },
  parameters: {
    docs: {
      description: {
        story:
          "라벨이 포함된 원형 체크박스입니다. 전체 동의 등 특별한 강조가 필요한 경우에 사용합니다.",
      },
    },
  },
};

export const CircleCheckBoxWithLabel_Positions: Story = {
  name: "CircleCheckBoxWithLabel - 라벨 위치",
  render: () => {
    const [checkedLeft, setCheckedLeft] = useState(false);
    const [checkedRight, setCheckedRight] = useState(true);

    return (
      <div className="flex flex-col gap-4">
        <CircleCheckBoxWithLabel
          label="왼쪽 라벨"
          isChecked={checkedLeft}
          onChange={setCheckedLeft}
          labelPosition="left"
        />
        <CircleCheckBoxWithLabel
          label="오른쪽 라벨"
          isChecked={checkedRight}
          onChange={setCheckedRight}
          labelPosition="right"
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "라벨을 원형 체크박스의 왼쪽 또는 오른쪽에 배치할 수 있습니다.",
      },
    },
  },
};

export const CircleCheckBoxWithLabel_AllAgree: Story = {
  name: "CircleCheckBoxWithLabel - 전체 동의 시나리오",
  render: () => {
    const [agreements, setAgreements] = useState([
      { id: 1, label: "서비스 이용약관 동의", checked: false, required: true },
      {
        id: 2,
        label: "개인정보 처리방침 동의",
        checked: false,
        required: true,
      },
      {
        id: 3,
        label: "마케팅 정보 수신 동의",
        checked: false,
        required: false,
      },
      {
        id: 4,
        label: "이벤트 정보 수신 동의",
        checked: false,
        required: false,
      },
    ]);

    const isAllChecked = agreements.every((item) => item.checked);
    const requiredCount = agreements.filter(
      (item) => item.required && item.checked,
    ).length;
    const totalRequired = agreements.filter((item) => item.required).length;

    const toggleAll = () => {
      setAgreements((prev) =>
        prev.map((item) => ({ ...item, checked: !isAllChecked })),
      );
    };

    const toggleItem = (id: number) => {
      setAgreements((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, checked: !item.checked } : item,
        ),
      );
    };

    return (
      <div className="w-80 space-y-4">
        <CircleCheckBoxWithLabel
          label="전체 동의하기"
          isChecked={isAllChecked}
          onChange={toggleAll}
          size="md"
        />

        <div className="space-y-3 border-t pt-4">
          {agreements.map((item) => (
            <CheckBoxWithLabel
              key={item.id}
              label={`${item.required ? "[필수]" : "[선택]"} ${item.label}`}
              isChecked={item.checked}
              onChange={() => toggleItem(item.id)}
              size="sm"
            />
          ))}
        </div>

        <div className="pt-2 text-xs text-gray-500">
          필수 동의: {requiredCount}/{totalRequired} | 전체:{" "}
          {agreements.filter((i) => i.checked).length}/{agreements.length}
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "전체 동의 기능의 실제 사용 예시입니다. 원형 체크박스로 전체를 제어하고 개별 항목들을 사각 체크박스로 표시합니다.",
      },
    },
  },
};

// ===== 비교 및 가이드 =====
export const ComparisonGuide: Story = {
  name: "📚 컴포넌트 비교 및 사용 가이드",
  render: () => {
    const [examples, setExamples] = useState({
      base: false,
      label: false,
      option: true,
      baseCircle: false,
      circleLabel: true,
    });

    return (
      <div className="max-w-6xl space-y-8 p-6">
        <div className="mb-8">
          <h2 className="mb-4 text-2xl font-bold">체크박스 컴포넌트 가이드</h2>
          <p className="text-gray-600">
            용도에 맞는 체크박스 컴포넌트를 선택하여 사용하세요.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* BaseCheckBox */}
          <div className="rounded-lg border p-6">
            <div className="mb-4 flex items-center gap-3">
              <BaseCheckBox
                isChecked={examples.base}
                onChange={() =>
                  setExamples((prev) => ({ ...prev, base: !prev.base }))
                }
              />
              <h3 className="text-lg font-semibold text-blue-600">
                BaseCheckBox
              </h3>
            </div>
            <div className="space-y-2 text-sm">
              <p className="font-medium">✅ 사용하기 좋은 경우:</p>
              <ul className="ml-4 space-y-1 text-gray-600">
                <li>• 커스텀 레이아웃 필요</li>
                <li>• 다른 컴포넌트와 조합</li>
                <li>• 최대 유연성 필요</li>
              </ul>
              <p className="mt-3 text-xs text-gray-500">
                순수 체크박스만 제공하는 기본 컴포넌트
              </p>
            </div>
          </div>

          {/* CheckBoxWithLabel */}
          <div className="rounded-lg border p-6">
            <div className="mb-4">
              <CheckBoxWithLabel
                label="CheckBoxWithLabel"
                isChecked={examples.label}
                onChange={() =>
                  setExamples((prev) => ({ ...prev, label: !prev.label }))
                }
              />
            </div>
            <div className="space-y-2 text-sm">
              <p className="font-medium text-green-600">
                ✅ 사용하기 좋은 경우:
              </p>
              <ul className="ml-4 space-y-1 text-gray-600">
                <li>• 일반적인 폼</li>
                <li>• 동의 체크박스</li>
                <li>• 라벨과 함께 사용</li>
              </ul>
              <p className="mt-3 text-xs text-gray-500">
                라벨이 포함된 범용 체크박스
              </p>
            </div>
          </div>

          {/* OptionCheckBox */}
          <div className="rounded-lg border p-6">
            <div className="mb-4">
              <div className="w-full">
                <OptionCheckBox
                  label="OptionCheckBox"
                  isChecked={examples.option}
                  onChange={() =>
                    setExamples((prev) => ({ ...prev, option: !prev.option }))
                  }
                  onView={() => alert("OptionCheckBox 상세 정보 보기")}
                />
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <p className="font-medium text-purple-600">
                ✅ 사용하기 좋은 경우:
              </p>
              <ul className="ml-4 space-y-1 text-gray-600">
                <li>• 선택 옵션 리스트</li>
                <li>• 상세 보기 필요</li>
                <li>• 특화된 UI 디자인</li>
              </ul>
              <p className="mt-3 text-xs text-gray-500">
                옵션 선택용 특화 디자인 (체크박스와 보기 버튼 분리)
              </p>
            </div>
          </div>

          {/* BaseCircleCheckBox */}
          <div className="rounded-lg border p-6">
            <div className="mb-4 flex items-center gap-3">
              <BaseCircleCheckBox
                isChecked={examples.baseCircle}
                onChange={() =>
                  setExamples((prev) => ({
                    ...prev,
                    baseCircle: !prev.baseCircle,
                  }))
                }
              />
              <h3 className="text-lg font-semibold text-orange-600">
                BaseCircleCheckBox
              </h3>
            </div>
            <div className="space-y-2 text-sm">
              <p className="font-medium">✅ 사용하기 좋은 경우:</p>
              <ul className="ml-4 space-y-1 text-gray-600">
                <li>• 강조 표시 필요</li>
                <li>• 특별한 의미 부여</li>
                <li>• 커스텀 원형 레이아웃</li>
              </ul>
              <p className="mt-3 text-xs text-gray-500">순수 원형 체크박스</p>
            </div>
          </div>

          {/* CircleCheckBoxWithLabel */}
          <div className="rounded-lg border p-6 md:col-span-2 lg:col-span-1">
            <div className="mb-4">
              <CircleCheckBoxWithLabel
                label="CircleCheckBoxWithLabel"
                isChecked={examples.circleLabel}
                onChange={() =>
                  setExamples((prev) => ({
                    ...prev,
                    circleLabel: !prev.circleLabel,
                  }))
                }
              />
            </div>
            <div className="space-y-2 text-sm">
              <p className="font-medium text-red-600">✅ 사용하기 좋은 경우:</p>
              <ul className="ml-4 space-y-1 text-gray-600">
                <li>• 전체 동의 버튼</li>
                <li>• 중요한 선택사항</li>
                <li>• 눈에 띄는 강조</li>
              </ul>
              <p className="mt-3 text-xs text-gray-500">
                라벨 포함 원형 체크박스 (전체 동의용)
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-gray-50 p-6">
          <h4 className="mb-3 font-semibold">💡 사용 팁</h4>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="mb-2 text-sm font-medium">Import 방법:</p>
              <pre className="rounded bg-gray-100 p-2 text-xs">
                {`import { 
  BaseCheckBox,
  CheckBoxWithLabel,
  OptionCheckBox,
  BaseCircleCheckBox,
  CircleCheckBoxWithLabel
} from '@/components/CheckBox';`}
              </pre>
            </div>
            <div>
              <p className="mb-2 text-sm font-medium">선택 가이드:</p>
              <ul className="space-y-1 text-xs text-gray-600">
                <li>🎯 유연성 → BaseCheckBox</li>
                <li>📝 폼 → CheckBoxWithLabel</li>
                <li>📋 옵션 선택 → OptionCheckBox</li>
                <li>⭕ 강조 → BaseCircleCheckBox</li>
                <li>🎯 전체 동의 → CircleCheckBoxWithLabel</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        story:
          "모든 체크박스 컴포넌트의 특징과 사용 가이드를 한눈에 볼 수 있습니다.",
      },
    },
  },
};

// ===== Form Integration Examples =====
export const FormIntegration: Story = {
  name: "Form 통합 예제",
  render: () => {
    const [formData, setFormData] = useState({
      terms: false,
      privacy: false,
      marketing: false,
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const form = e.target as HTMLFormElement;
      const formDataObj = new FormData(form);
      const values = Object.fromEntries(formDataObj.entries());
      alert(`Form submitted with values: ${JSON.stringify(values, null, 2)}`);
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4 rounded border p-4">
        <h3 className="text-lg font-semibold">회원가입 약관 동의</h3>

        <CheckBoxWithLabel
          name="terms"
          value="agreed"
          id="terms-checkbox"
          label="이용약관에 동의합니다 (필수)"
          isChecked={formData.terms}
          onChange={(checked) =>
            setFormData((prev) => ({ ...prev, terms: checked }))
          }
        />

        <CheckBoxWithLabel
          name="privacy"
          value="agreed"
          id="privacy-checkbox"
          label="개인정보 처리방침에 동의합니다 (필수)"
          isChecked={formData.privacy}
          onChange={(checked) =>
            setFormData((prev) => ({ ...prev, privacy: checked }))
          }
        />

        <CheckBoxWithLabel
          name="marketing"
          value="agreed"
          id="marketing-checkbox"
          label="마케팅 정보 수신에 동의합니다 (선택)"
          isChecked={formData.marketing}
          onChange={(checked) =>
            setFormData((prev) => ({ ...prev, marketing: checked }))
          }
        />

        <button
          type="submit"
          className="mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          제출
        </button>
      </form>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "실제 HTML form과 통합된 체크박스 사용 예제입니다. name, value, id props를 사용하여 form 제출 시 데이터가 포함됩니다.",
      },
    },
  },
};

export const FormWithOptionCheckBox: Story = {
  name: "Form + OptionCheckBox 예제",
  render: () => {
    const [formData, setFormData] = useState({
      terms: false,
      privacy: false,
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const form = e.target as HTMLFormElement;
      const formDataObj = new FormData(form);
      const values = Object.fromEntries(formDataObj.entries());
      alert(`Form submitted with values: ${JSON.stringify(values, null, 2)}`);
    };

    const showTerms = () => {
      alert("이용약관 상세 내용을 표시합니다.");
    };

    const showPrivacy = () => {
      alert("개인정보 처리방침 상세 내용을 표시합니다.");
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4 rounded border p-4">
        <h3 className="text-lg font-semibold">약관 동의 (보기 버튼 포함)</h3>

        <OptionCheckBox
          name="terms"
          value="agreed"
          id="terms-option-checkbox"
          label="이용약관에 동의합니다"
          isChecked={formData.terms}
          onChange={(checked) =>
            setFormData((prev) => ({ ...prev, terms: checked }))
          }
          onView={showTerms}
        />

        <OptionCheckBox
          name="privacy"
          value="agreed"
          id="privacy-option-checkbox"
          label="개인정보 처리방침에 동의합니다"
          isChecked={formData.privacy}
          onChange={(checked) =>
            setFormData((prev) => ({ ...prev, privacy: checked }))
          }
          onView={showPrivacy}
        />

        <button
          type="submit"
          className="mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          제출
        </button>
      </form>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "OptionCheckBox를 form과 함께 사용하는 예제입니다. 체크박스와 보기 버튼이 독립적으로 작동하며, form 데이터에 포함됩니다.",
      },
    },
  },
};

export const FormWithCircleCheckBox: Story = {
  name: "Form + CircleCheckBox 예제",
  render: () => {
    const [allAgreed, setAllAgreed] = useState(false);
    const [individualTerms, setIndividualTerms] = useState({
      terms: false,
      privacy: false,
      marketing: false,
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const form = e.target as HTMLFormElement;
      const formDataObj = new FormData(form);
      const values = Object.fromEntries(formDataObj.entries());
      alert(`Form submitted with values: ${JSON.stringify(values, null, 2)}`);
    };

    const handleAllAgreed = (checked: boolean) => {
      setAllAgreed(checked);
      setIndividualTerms({
        terms: checked,
        privacy: checked,
        marketing: checked,
      });
    };

    const handleIndividualChange = (
      key: keyof typeof individualTerms,
      checked: boolean,
    ) => {
      const newTerms = { ...individualTerms, [key]: checked };
      setIndividualTerms(newTerms);

      // 모든 항목이 체크되었는지 확인
      const allChecked = Object.values(newTerms).every(Boolean);
      setAllAgreed(allChecked);
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4 rounded border p-4">
        <h3 className="text-lg font-semibold">전체 동의 + 개별 동의</h3>

        <CircleCheckBoxWithLabel
          name="all_agreed"
          value="true"
          id="all-agreed-checkbox"
          label="전체 동의"
          isChecked={allAgreed}
          onChange={handleAllAgreed}
          size="lg"
        />

        <div className="ml-6 space-y-2">
          <CheckBoxWithLabel
            name="terms"
            value="agreed"
            id="terms-individual-checkbox"
            label="이용약관에 동의합니다 (필수)"
            isChecked={individualTerms.terms}
            onChange={(checked) => handleIndividualChange("terms", checked)}
            size="sm"
          />

          <CheckBoxWithLabel
            name="privacy"
            value="agreed"
            id="privacy-individual-checkbox"
            label="개인정보 처리방침에 동의합니다 (필수)"
            isChecked={individualTerms.privacy}
            onChange={(checked) => handleIndividualChange("privacy", checked)}
            size="sm"
          />

          <CheckBoxWithLabel
            name="marketing"
            value="agreed"
            id="marketing-individual-checkbox"
            label="마케팅 정보 수신에 동의합니다 (선택)"
            isChecked={individualTerms.marketing}
            onChange={(checked) => handleIndividualChange("marketing", checked)}
            size="sm"
          />
        </div>

        <button
          type="submit"
          className="mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          제출
        </button>
      </form>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "원형 체크박스를 사용한 전체 동의와 개별 동의 form 예제입니다. 각 체크박스는 고유한 name과 id를 가져 form 데이터에 포함됩니다.",
      },
    },
  },
};
