import React from "react";
import useSignupContext from "../hooks/useSignupContext";
import { SignupStep } from "../types/signup";
import { cn } from "../utils/classname";
import Button from "./Button";
import SignUpTerms from "./SignUpTerms";

type Props = {
  className?: string;
  onStepChange?: () => void; // 이제 선택적으로 만듦
};

const SignupTermsStep: React.FC<Props> = ({ className, onStepChange }) => {
  const {
    termsState: [terms, setTerms],
    stepState: [, setStep],
  } = useSignupContext();

  const isRequiredAllChecked = terms
    .filter((term) => term.required)
    .every((term) => term.checked);

  const handleNextStep = () => {
    if (onStepChange) {
      onStepChange(); // 기존 prop이 있으면 사용
    } else {
      setStep(SignupStep.PERSONAL_INFO); // Context를 통해 다음 단계로 이동
    }
  };

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
        terms={terms}
        isRequiredAllChecked={isRequiredAllChecked}
        onChange={setTerms}
      />

      <div className="bottom-0-responsive pb-12.5 absolute inset-x-0 px-6">
        <Button
          theme="primary"
          size="md"
          block
          disabled={!isRequiredAllChecked}
          onClick={handleNextStep}
          className="transition-transform duration-150 active:scale-[0.95]"
        >
          동의합니다
        </Button>
      </div>
    </div>
  );
};

export default SignupTermsStep;
