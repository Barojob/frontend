import { useEffect, useMemo, useState } from "react";
import { EMAIL_DOMAIN_OPTIONS } from "../fixtures/signup";
import useSignupContext from "./useSignupContext";

export const useEmployerInfoForm = (
  onValidityChange: (isValid: boolean) => void,
) => {
  const {
    employerInfoState: [employerInfo, setEmployerInfo],
    stepState: [, setCurrentStep],
  } = useSignupContext();

  const [emailLocal, setEmailLocal] = useState("");
  const [emailDomain, setEmailDomain] = useState("");
  const [isCustomDomain, setIsCustomDomain] = useState(false);
  const [showEmailField, setShowEmailField] = useState(false);
  const [showBusinessNumberField, setShowBusinessNumberField] = useState(false);

  const fullEmail = useMemo(
    () => (emailLocal && emailDomain ? `${emailLocal}@${emailDomain}` : ""),
    [emailLocal, emailDomain],
  );

  const isPositionValid = useMemo(
    () => employerInfo.position.trim().length > 0,
    [employerInfo.position],
  );
  const isEmailValid = useMemo(
    () => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fullEmail),
    [fullEmail],
  );
  const isBusinessNumberValid = useMemo(
    () => employerInfo.businessNumber.replace(/[^0-9]/g, "").length === 10,
    [employerInfo.businessNumber],
  );

  const isFormValid = useMemo(
    () => isPositionValid && isEmailValid && isBusinessNumberValid,
    [isPositionValid, isEmailValid, isBusinessNumberValid],
  );

  useEffect(() => {
    if (isPositionValid) setShowEmailField(true);
  }, [isPositionValid]);

  useEffect(() => {
    if (isEmailValid) setShowBusinessNumberField(true);
  }, [isEmailValid]);

  useEffect(() => {
    setEmployerInfo((prev) => ({ ...prev, email: fullEmail }));
  }, [fullEmail, setEmployerInfo]);

  useEffect(() => {
    onValidityChange(isFormValid);
  }, [isFormValid, onValidityChange]);

  useEffect(() => {
    if (employerInfo.position) setShowEmailField(true);
    if (employerInfo.email) {
      setShowBusinessNumberField(true);
      const [local, domain] = employerInfo.email.split("@");
      if (local && domain) {
        setEmailLocal(local);
        setEmailDomain(domain);
        if (!EMAIL_DOMAIN_OPTIONS.includes(domain)) {
          setIsCustomDomain(true);
        }
      }
    }
  }, []);

  return {
    employerInfo,
    setEmployerInfo,
    emailLocal,
    setEmailLocal,
    emailDomain,
    setEmailDomain,
    isCustomDomain,
    setIsCustomDomain,
    showEmailField,
    showBusinessNumberField,
    isFormValid,
    setCurrentStep,
  };
};
