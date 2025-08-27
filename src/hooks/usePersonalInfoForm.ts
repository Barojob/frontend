import useSignupContext from "@/hooks/useSignupContext";
import { useEffect, useMemo, useState } from "react";

export const usePersonalInfoForm = (
  onValidityChange: (isValid: boolean) => void,
) => {
  const {
    personalInfoState: [personalInfo, setPersonalInfo],
    stepState: [, setCurrentStep],
  } = useSignupContext();

  const [showBirthDateField, setShowBirthDateField] = useState(false);
  const [showPhoneFields, setShowPhoneFields] = useState(false);
  const [showBirthDateError, setShowBirthDateError] = useState(false);

  const isNameValid = useMemo(
    () => personalInfo.name.trim().length > 0,
    [personalInfo.name],
  );
  const isBirthDateValid = useMemo(
    () => personalInfo.birthDate.trim().length === 8,
    [personalInfo.birthDate],
  );
  const isCarrierSelected = useMemo(
    () => !!personalInfo.carrier,
    [personalInfo.carrier],
  );
  const isPhoneNumberValid = useMemo(
    () => personalInfo.phoneNumber.replace(/[^0-9]/g, "").length === 11,
    [personalInfo.phoneNumber],
  );

  const isFormValid = useMemo(
    () =>
      isNameValid &&
      isBirthDateValid &&
      isCarrierSelected &&
      isPhoneNumberValid,
    [isNameValid, isBirthDateValid, isCarrierSelected, isPhoneNumberValid],
  );

  useEffect(() => {
    if (isNameValid) setShowBirthDateField(true);
  }, [isNameValid]);

  useEffect(() => {
    if (isBirthDateValid) setShowPhoneFields(true);
  }, [isBirthDateValid]);

  useEffect(() => {
    onValidityChange(isFormValid);
  }, [isFormValid, onValidityChange]);

  useEffect(() => {
    if (personalInfo.name) setShowBirthDateField(true);
    if (personalInfo.birthDate) setShowPhoneFields(true);
  }, []);

  return {
    personalInfo,
    setPersonalInfo,
    setCurrentStep,
    showBirthDateField,
    showPhoneFields,
    showBirthDateError,
    setShowBirthDateError,
    isFormValid,
    isBirthDateValid,
  };
};
