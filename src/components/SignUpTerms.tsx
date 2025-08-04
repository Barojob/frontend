import React from "react";
import { cn } from "../utils/classname";
import CheckBoxWithLabel from "./CheckBoxWithLabel";
import TermCheckBox from "./TermCheckBox";

export type CheckItem = {
  label: string;
  checked: boolean;
  required: boolean;
  content: string;
};

type Props = {
  className?: string;
  items: CheckItem[];
  isRequiredAllChecked: boolean;
  onChange: (items: CheckItem[]) => void;
};

const SignUpTerms: React.FC<Props> = ({
  className,
  items,
  isRequiredAllChecked,
  onChange,
}) => {
  return (
    <div className={cn("space-y-5", className)}>
      <CheckBoxWithLabel
        theme="secondary"
        size="md"
        label="전체 동의하기"
        id="all-checkbox"
        checked={isRequiredAllChecked}
        onChange={handleToggleAll}
      />

      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item.label}>
            <TermCheckBox
              id={item.label}
              theme="secondary"
              label={
                item.required ? `[필수] ${item.label}` : `[선택] ${item.label}`
              }
              checked={item.checked}
              onChange={handleToggleItem(item.label)}
              onView={handleViewItem(item)}
            />
          </li>
        ))}
      </ul>
    </div>
  );

  function handleToggleItem(label: string) {
    return () => {
      const newItems = items.map((item) =>
        item.label === label ? { ...item, checked: !item.checked } : item,
      );

      onChange(newItems);
    };
  }

  function handleToggleAll() {
    onChange(
      items.map((item) => ({ ...item, checked: !isRequiredAllChecked })),
    );
  }

  function handleViewItem(item: CheckItem) {
    return () => {
      // TODO: 모달이나 새 페이지로 상세 내용 표시
      alert(`${item.label}\n\n${item.content}`);
    };
  }
};

export default SignUpTerms;
