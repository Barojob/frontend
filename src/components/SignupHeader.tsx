import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import React from "react";
import { SignupStep } from "../types/signup";
import { cn } from "../utils/classname";

type Props = {
  className?: string;
  step: SignupStep;
  onStepChange: (step: SignupStep) => void;
};

const SignupHeader: React.FC<Props> = ({ className, step, onStepChange }) => {
  const showBackButton = step !== SignupStep.TERMS;

  return (
    <div className={cn("flex items-center gap-x-1 text-gray-500", className)}>
      {showBackButton && (
        <button onClick={handleBack}>
          <ChevronLeftIcon className="-mt-0.5 size-6 text-gray-500" />
        </button>
      )}
      {getStepTitle(step)}
    </div>
  );

  function handleBack() {
    if (step === SignupStep.TERMS) {
      return;
    }

    onStepChange(step - 1);
  }

  function getStepTitle(step: SignupStep) {
    switch (step) {
      case SignupStep.TERMS:
        return "회원가입";
      case SignupStep.PHONE_VERIFICATION:
        return "휴대폰 번호 입력";
      default:
        console.error("Unknown step", step);
        return "";
    }
  }
};

export default SignupHeader;
