import React from "react";
import Button from "../../components/Button";
import useSignupContext from "../../hooks/useSignupContext";
import { SignupStep } from "../../types/signup";
import { cn } from "../../utils/classname";
import SignUpTerms from "./SignUpTerms";

type Props = {
  className?: string;
  onStepChange?: () => void;
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
      onStepChange();
    } else {
      setStep(SignupStep.PERSONAL_INFO);
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

      <div className="fixed-bottom-button">
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
