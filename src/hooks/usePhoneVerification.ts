import useSignupContext from "@/hooks/useSignupContext";
import { SignupStep } from "@/types/signup";
import { useEffect, useMemo, useState } from "react";

const VERIFICATION_TIME_LIMIT = 120;

export const usePhoneVerification = (
  onValidityChange: (isValid: boolean) => void,
) => {
  const {
    verificationState: [verificationInfo, setVerificationInfo],
    stepState: [, setCurrentStep],
  } = useSignupContext();

  const [timer, setTimer] = useState(VERIFICATION_TIME_LIMIT);

  const isVerificationCodeValid = useMemo(
    () => verificationInfo.verificationCode.length === 4,
    [verificationInfo.verificationCode],
  );

  useEffect(() => {
    onValidityChange(isVerificationCodeValid);
  }, [isVerificationCodeValid, onValidityChange]);

  useEffect(() => {
    setVerificationInfo((prev) => ({
      ...prev,
      verificationSent: true,
    }));
  }, [setVerificationInfo]);

  useEffect(() => {
    if (timer <= 0) return;

    const countdown = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(countdown);
  }, [timer]);

  const handleResendVerification = () => {
    setTimer(VERIFICATION_TIME_LIMIT);
    setVerificationInfo((prev) => ({ ...prev, verificationCode: "" }));
    // FIXME: 실제 인증번호 재전송 API 호출 로직 필요
  };

  const handleNextStep = () => {
    setVerificationInfo((prev) => ({
      ...prev,
      isVerified: true, // FIXME: 실제로는 API 검증 성공 후 true로 변경해야 함
    }));
    setCurrentStep(SignupStep.USER_TYPE_SELECTION);
  };

  return {
    verificationInfo,
    setVerificationInfo,
    timer,
    isVerificationCodeValid,
    handleResendVerification,
    handleNextStep,
  };
};
