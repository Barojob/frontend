import React from "react";
import { cn } from "../../utils/classname";
import Button from "../Button";
import SignUpTerms, { CheckItem } from "../SignUpTerms";

type Props = {
  className?: string;
  items: CheckItem[];
  onTermsChange: (items: CheckItem[]) => void;
  onStepChange: () => void;
};

const SignupTermsStep: React.FC<Props> = ({
  className,
  items,
  onTermsChange,
  onStepChange,
}) => {
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
        onChange={onTermsChange}
      />

      <div className="bottom-0-responsive pb-12.5 absolute inset-x-0 px-6">
        <Button
          theme="primary"
          size="md"
          block
          disabled={!isRequiredAllChecked}
          onClick={onStepChange}
        >
          동의합니다
        </Button>
      </div>
    </div>
  );
};

export default SignupTermsStep;
