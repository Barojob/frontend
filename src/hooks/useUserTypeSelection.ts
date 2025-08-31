import useSignupContext from "@/hooks/useSignupContext";
import { SignupStep } from "@/types/signup";
import { useEffect, useMemo } from "react";

type UseUserTypeSelectionProps = {
  onValidityChange: (isValid: boolean) => void;
  onUserTypeChange?: (userType: string) => void;
};

export const useUserTypeSelection = ({
  onValidityChange,
  onUserTypeChange,
}: UseUserTypeSelectionProps) => {
  const {
    userTypeState: [userType, setUserTypeInfo],
    stepState: [, setCurrentStep],
  } = useSignupContext();

  const isValid = useMemo(() => userType !== null, [userType]);

  useEffect(() => {
    onValidityChange(isValid);
  }, [isValid, onValidityChange]);

  const handleUserTypeSelect = (selectedType: "employer" | "worker") => {
    setUserTypeInfo(selectedType);
    onUserTypeChange?.(selectedType);
  };

  const handleNextStep = () => {
    if (userType === "employer") {
      setCurrentStep(SignupStep.EMPLOYER_INFO);
    } else if (userType === "worker") {
      setCurrentStep(SignupStep.WORKER_EXPERIENCE);
    }
  };

  return {
    userType,
    isValid,
    handleUserTypeSelect,
    handleNextStep,
  };
};
