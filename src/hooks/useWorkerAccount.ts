import { useEmployerSignUp } from "@/hooks/useEmployerSignUp";
import useSignupContext from "@/hooks/useSignupContext";
import { useWorkerSignUp } from "@/hooks/useWorkerSignUp";
import { SignupStep } from "@/types/signup";
import { createEmployerSignUpRequest } from "@/utils/employerSignupHelpers";
import { createWorkerSignUpRequest } from "@/utils/workerSignupHelpers";
import { useEffect, useState } from "react";

export const useWorkerAccount = (
  onValidityChange: (isValid: boolean) => void,
) => {
  const {
    stepState: [, setCurrentStep],
    userTypeState: [userType],
    personalInfoState: [personalInfo],
    employerInfoState: [employerInfo],
    workerExperienceState: [workerExperience],
  } = useSignupContext();

  const {
    mutateAsync: employerSignUpAsync,
    isPending: isEmployerSignUpPending,
  } = useEmployerSignUp();

  const { mutateAsync: workerSignUpAsync, isPending: isWorkerSignUpPending } =
    useWorkerSignUp();

  const [selectedBank, setSelectedBank] = useState<string>("");
  const [accountNumber, setAccountNumber] = useState<string>("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    onValidityChange(true);
  }, [onValidityChange]);

  const handleAccountNumberChange = (value: string) => {
    const numericValue = value.replace(/[^0-9]/g, "");
    setAccountNumber(numericValue);
  };

  const handleAddAccount = () => {
    if (!selectedBank || !accountNumber) {
      const missingFields = [
        ...(!selectedBank ? ["은행"] : []),
        ...(!accountNumber ? ["계좌번호"] : []),
      ];
      setErrorMessage(`${missingFields.join(", ")}을(를) 입력해주세요.`);
      setShowErrorModal(true);
      return;
    }
    setShowConfirmModal(true);
  };

  const handleSkip = () => {
    setShowConfirmModal(true);
  };

  const handleConfirmModalClose = async () => {
    setShowConfirmModal(false);

    try {
      if (userType === "employer") {
        const requestData = createEmployerSignUpRequest({
          personalInfo,
          employerInfo,
        });
        await employerSignUpAsync(requestData);
      } else {
        const requestData = createWorkerSignUpRequest({
          personalInfo,
          experienceCategories: workerExperience.experienceCategories,
          bankName: selectedBank,
          accountNumber,
        });
        await workerSignUpAsync(requestData);
      }

      setCurrentStep(SignupStep.SIGNUP_SUCCESS);
    } catch (error) {
      console.error("회원가입 중 오류가 발생했습니다:", error);
    }
  };

  const handleErrorModalClose = () => {
    setShowErrorModal(false);
  };

  return {
    selectedBank,
    setSelectedBank,
    accountNumber,
    handleAccountNumberChange,
    showConfirmModal,
    showErrorModal,
    errorMessage,
    handleAddAccount,
    handleSkip,
    handleConfirmModalClose,
    handleErrorModalClose,
    isSignUpPending: isEmployerSignUpPending || isWorkerSignUpPending,
  };
};
