import { SignupStep } from "@/types/signup";
import { cn } from "@/utils/classname";
import { getPreviousSignupStep, getSignupStepTitle } from "@/utils/signup";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import React from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  className?: string;
  step: SignupStep;
  onStepChange: (step: SignupStep) => void;
};

const SignupHeader: React.FC<Props> = ({ className, step, onStepChange }) => {
  const navigate = useNavigate();

  const showBackButton =
    step !== SignupStep.TERMS && step !== SignupStep.SIGNUP_SUCCESS;

  return (
    <header
      className={cn("flex items-center gap-x-1 text-gray-500", className)}
    >
      {showBackButton && (
        <button onClick={handleBack} className="p-2">
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

    if (!previousStep) {
      navigate("/intro");
      return;
    }

    onStepChange(previousStep);
  }
};

export default SignupHeader;
