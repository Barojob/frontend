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
    // 변경된 플로우: 타입 선택 후 약관 동의로 이동
    setCurrentStep(SignupStep.TERMS);
  };

  return {
    userType,
    isValid,
    handleUserTypeSelect,
    handleNextStep,
  };
};
