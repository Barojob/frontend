import { useEffect, useState } from "react";
import { SignupStep } from "../types/signup";
import useSignupContext from "./useSignupContext";

export const useWorkerAccount = (
  onValidityChange: (isValid: boolean) => void,
) => {
  const {
    stepState: [, setCurrentStep],
  } = useSignupContext();

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

  const handleConfirmModalClose = () => {
    setShowConfirmModal(false);
    setCurrentStep(SignupStep.SIGNUP_SUCCESS);
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
  };
};
