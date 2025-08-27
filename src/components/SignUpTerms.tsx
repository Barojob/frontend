import CheckBoxWithLabel from "@/components/CheckBoxWithLabel";
import TermCheckBox from "@/components/TermCheckBox";
import { cn } from "@/utils/classname";
import React from "react";

export type CheckItem = {
  label: string;
  checked: boolean;
  required: boolean;
  content: string;
};

type Props = {
  className?: string;
  terms: CheckItem[];
  isRequiredAllChecked: boolean;
  onChange: (terms: CheckItem[]) => void;
};

const SignUpTerms: React.FC<Props> = ({
  className,
  terms,
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
        {terms.map((term) => (
          <li key={term.label}>
            <TermCheckBox
              id={term.label}
              theme="secondary"
              label={
                term.required ? `[필수] ${term.label}` : `[선택] ${term.label}`
              }
              checked={term.checked}
              onChange={handleToggleItem(term.label)}
              onView={handleViewItem(term)}
            />
          </li>
        ))}
      </ul>
    </div>
  );

  function handleToggleItem(label: string) {
    return () => {
      const newTerms = terms.map((term) =>
        term.label === label ? { ...term, checked: !term.checked } : term,
      );

      onChange(newTerms);
    };
  }

  function handleToggleAll() {
    onChange(
      terms.map((term) => ({ ...term, checked: !isRequiredAllChecked })),
    );
  }

  function handleViewItem(term: CheckItem) {
    return () => {
      alert(`${term.label}\n\n${term.content}`);
    };
  }
};

export default SignUpTerms;
