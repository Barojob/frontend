import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { SignupStep } from "../types/signup";
import { cn } from "../utils/classname";
import {
  getPreviousSignupStep,
  getSignupStepTitle,
} from "../utils/signupHelpers";

type Props = {
  className?: string;
  step: SignupStep;
  onStepChange: (step: SignupStep) => void;
};

const SignupHeader: React.FC<Props> = ({ className, step, onStepChange }) => {
  const navigate = useNavigate();

  const showBackButton = useMemo(
    () => step !== SignupStep.TERMS && step !== SignupStep.SIGNUP_SUCCESS,
    [step],
  );

  return (
    <header
      className={cn(
        "pt-safe-top flex items-center gap-x-1 text-gray-500",
        className,
      )}
    >
      {showBackButton && (
        <button onClick={handleBack} className="touch-manipulation p-2">
          <ChevronLeftIcon className="size-6 text-gray-500" />
        </button>
      )}
      <h1 className="text-lg font-medium text-gray-800">
        {getSignupStepTitle(step)}
      </h1>
    </header>
  );

  function handleBack() {
    const previousStep = getPreviousSignupStep(step);

    if (previousStep !== null) {
      onStepChange(previousStep);
    } else if (step === SignupStep.TERMS) {
      navigate("/intro");
    }
  }
};

export default SignupHeader;
