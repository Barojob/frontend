import Button from "@/components/Button";
import { usePhoneVerification } from "@/hooks/usePhoneVerification";
import { cn } from "@/utils/classname";
import { formatTime } from "@/utils/formatters";
import React, { useRef } from "react";

type PhoneVerificationCodeStepProps = {
  className?: string;
  onValidityChange: (isValid: boolean) => void;
};

const PhoneVerificationCodeStep: React.FC<PhoneVerificationCodeStepProps> = ({
  className,
  onValidityChange,
}) => {
  const {
    verificationInfo,
    setVerificationInfo,
    timer,
    isVerificationCodeValid,
    handleResendVerification,
    handleNextStep,
  } = usePhoneVerification(onValidityChange);

  const inputsRef = useRef<HTMLInputElement[]>([]);

  return (
    <div className={cn("", className)}>
      <div className="mt-8">
        <div className="text-2xl font-bold text-gray-900">문자로 온</div>
        <div className="mt-1 text-2xl font-bold text-gray-900">
          인증번호를 입력해주세요
        </div>
        <div className="mt-2">
          <div className="text-sm text-gray-600">
            이제 회원가입 절차가 끝났어요
          </div>
        </div>
      </div>

      <div className="mt-12">
        <div className="animate-slide-up">
          <div className="flex justify-center gap-3">
            {[0, 1, 2, 3].map((index) => (
              <input
                key={index}
                ref={(el) => {
                  if (el) {
                    inputsRef.current[index] = el;
                  }
                }}
                type="text"
                maxLength={1}
                value={verificationInfo.verificationCode[index] || ""}
                onChange={(e) => handleInputChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="h-16 w-16 rounded-lg border border-gray-200 bg-gray-100 text-center text-2xl font-bold transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                inputMode="numeric"
              />
            ))}
          </div>

          <div className="mt-4 flex justify-center">
            <button
              onClick={handleResendVerification}
              disabled={timer > 0}
              className="text-xs text-neutral-500 underline disabled:cursor-not-allowed disabled:text-neutral-300"
            >
              인증번호 다시 받기 ({formatTime(timer)})
            </button>
          </div>
        </div>
      </div>

      {isVerificationCodeValid && (
        <div className="animate-slide-up fixed-bottom-button">
          <Button size="md" theme="primary" onClick={handleNextStep}>
            다음
          </Button>
        </div>
      )}
    </div>
  );

  function handleInputChange(
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) {
    const newCode = verificationInfo.verificationCode.split("");
    newCode[index] = e.target.value;
    setVerificationInfo((prev) => ({
      ...prev,
      verificationCode: newCode.join(""),
    }));

    if (e.target.value && index < 3) {
      inputsRef.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) {
    if (
      e.key === "Backspace" &&
      !verificationInfo.verificationCode[index] &&
      index > 0
    ) {
      inputsRef.current[index - 1]?.focus();
    }
  }
};

export default PhoneVerificationCodeStep;
