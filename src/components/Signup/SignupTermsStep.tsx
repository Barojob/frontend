import React, { useEffect, useState } from "react";
import { cn } from "../../utils/classname";
import CheckList from "../CheckBox/CheckList";

type Props = {
  className?: string;
  onValidityChange: (valid: boolean) => void;
};

const SignupTermsStep: React.FC<Props> = ({ className, onValidityChange }) => {
  const [allChecked, setAllChecked] = useState(false);

  useEffect(() => {
    onValidityChange(allChecked);
  }, [allChecked, onValidityChange]);

  return (
    <div className={cn("", className)}>
      <div className="mt-8">
        <div className="text-3xl font-bold text-gray-900">환영해요</div>
        <div className="mt-2 text-3xl font-semibold text-gray-800">
          지금 바로 시작해 볼까요?
        </div>
      </div>
      <div className="mt-4 text-base text-gray-500">
        서비스를 이용하려면 약관 동의가 필요합니다.
      </div>
      <CheckList className="mt-12" onAllCheckedChange={setAllChecked} />
    </div>
  );
};

export default SignupTermsStep;
