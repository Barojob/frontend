import React from "react";
import { cn } from "../../utils/classname";
import SignUpTerms, { CheckItem } from "../SignUpTerms";

type Props = {
  className?: string;
  items: CheckItem[];
  onChange: (items: CheckItem[]) => void;
};

const SignupTermsStep: React.FC<Props> = ({ className, items, onChange }) => {
  const isRequiredAllChecked = items
    .filter((item) => item.required)
    .every((item) => item.checked);

  return (
    <div className={cn("", className)}>
      <div className="mt-8 space-y-2">
        <h2 className="text-3xl font-bold text-gray-900">환영해요</h2>
        <p className="text-3xl font-semibold text-gray-800">
          지금 바로 시작해 볼까요?
        </p>
      </div>
      <div className="mt-4 text-base text-gray-500">
        서비스를 이용하려면 약관 동의가 필요합니다.
      </div>

      <SignUpTerms
        className="mt-12"
        items={items}
        isRequiredAllChecked={isRequiredAllChecked}
        onChange={onChange}
      />
    </div>
  );
};

export default SignupTermsStep;
