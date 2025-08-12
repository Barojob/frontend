import React, { useEffect, useState } from "react";
import useSignupContext from "../hooks/useSignupContext";
import { SignupStep } from "../types/signup";
import { cn } from "../utils/classname";
import Button from "./Button";

type PhoneVerificationCodeStepProps = {
  className?: string;
  onValidityChange: (isValid: boolean) => void;
};

const PhoneVerificationCodeStep: React.FC<PhoneVerificationCodeStepProps> = ({
  className,
  onValidityChange,
}) => {
  const {
    verificationState: [verificationInfo, setVerificationInfo],
    stepState: [, setCurrentStep],
  } = useSignupContext();

  const [timer, setTimer] = useState(120);

  // 유효성 검사
  const isVerificationCodeValid = verificationInfo.verificationCode.length >= 4;

  // 인증번호 다시 받기
  const handleResendVerification = () => {
    setTimer(120);
    setVerificationInfo((prev) => ({ ...prev, verificationCode: "" }));
  };

  // 다음 스텝으로 이동
  const handleNextStep = () => {
    // 인증 완료 상태로 업데이트
    setVerificationInfo((prev) => ({
      ...prev,
      isVerified: true,
    }));

    // 다음 스텝으로 이동
    setCurrentStep(SignupStep.USER_TYPE_SELECTION);
  };

  // 시간 포맷팅
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  useEffect(() => {
    onValidityChange(isVerificationCodeValid);
  }, [isVerificationCodeValid, onValidityChange]);

  // 컴포넌트 마운트 시 인증번호 발송 상태로 설정
  useEffect(() => {
    setVerificationInfo((prev) => ({
      ...prev,
      verificationSent: true,
    }));
  }, [setVerificationInfo]);

  // 타이머 관리
  useEffect(() => {
    let countdown: ReturnType<typeof setInterval>;
    if (timer > 0) {
      countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(countdown);
  }, [timer]);

  return (
    <div className={cn("", className)}>
      {/* 상단 타이틀 */}
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

      {/* 인증번호 입력 */}
      <div className="mt-12">
        <div className="animate-slide-up">
          {/* 4자리 인증번호 입력칸 */}
          <div className="mb-4 flex justify-center gap-3">
            {[0, 1, 2, 3].map((index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                value={verificationInfo.verificationCode[index] || ""}
                onChange={(e) => {
                  const newCode = verificationInfo.verificationCode.split("");
                  newCode[index] = e.target.value;
                  const updatedCode = newCode.join("");
                  setVerificationInfo((prev) => ({
                    ...prev,
                    verificationCode: updatedCode,
                  }));

                  // 자동으로 다음 칸으로 이동
                  if (e.target.value && index < 3) {
                    const target = e.target as HTMLInputElement;
                    const nextInput = target.parentElement?.children[
                      index + 1
                    ] as HTMLInputElement;
                    nextInput?.focus();
                  }
                }}
                onKeyDown={(e) => {
                  // 백스페이스 시 이전 칸으로 이동
                  if (
                    e.key === "Backspace" &&
                    !verificationInfo.verificationCode[index] &&
                    index > 0
                  ) {
                    const target = e.target as HTMLInputElement;
                    const prevInput = target.parentElement?.children[
                      index - 1
                    ] as HTMLInputElement;
                    prevInput?.focus();
                  }
                }}
                className="w-17 h-19 rounded-[0.625rem] border border-gray-100 bg-gray-100 text-center text-2xl font-bold transition-all duration-150 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 active:scale-[0.99]"
                inputMode="numeric"
                pattern="[0-9]*"
              />
            ))}
          </div>

          {/* 인증번호 다시 받기 */}
          <div className="flex justify-center">
            <button
              onClick={handleResendVerification}
              className="text-xs text-neutral-500 underline transition-all duration-150 hover:text-neutral-700 active:scale-[0.98]"
            >
              인증번호 다시 받기 ({formatTime(timer)})
            </button>
          </div>
        </div>
      </div>

      {/* 다음 버튼 */}
      {isVerificationCodeValid && (
        <div className="animate-slide-up fixed bottom-8 left-4 right-4">
          <Button
            size="md"
            theme="primary"
            onClick={handleNextStep}
            className="w-full transition-transform duration-150 active:scale-[0.95]"
          >
            다음
          </Button>
        </div>
      )}
    </div>
  );
};

export default PhoneVerificationCodeStep;
