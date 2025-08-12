import React, { useEffect } from "react";
import useSignupContext from "../hooks/useSignupContext";
import { SignupStep } from "../types/signup";
import { cn } from "../utils/classname";
import BoxButton from "./BoxButton";
import Button from "./Button";

type UserTypeSelectionStepProps = {
  className?: string;
  onValidityChange: (isValid: boolean) => void;
  onUserTypeChange?: (userType: string) => void;
};

const UserTypeSelectionStep: React.FC<UserTypeSelectionStepProps> = ({
  className,
  onValidityChange,
  onUserTypeChange,
}) => {
  const {
    userTypeState: [userTypeInfo, setUserTypeInfo],
    stepState: [currentStep, setCurrentStep],
  } = useSignupContext();

  // 유효성 검사 - 유형이 선택되었을 때만 유효
  const isValid = userTypeInfo.userType !== "";

  useEffect(() => {
    onValidityChange(isValid);
  }, [isValid, onValidityChange]);

  const handleUserTypeSelect = (userType: "employer" | "worker") => {
    setUserTypeInfo({ userType });
    onUserTypeChange?.(userType);
  };

  // 다음 스텝으로 이동
  const handleNextStep = () => {
    if (userTypeInfo.userType === "employer") {
      setCurrentStep(SignupStep.EMPLOYER_INFO);
    } else if (userTypeInfo.userType === "worker") {
      setCurrentStep(SignupStep.WORKER_EXPERIENCE);
    }
  };

  return (
    <div className={cn("", className)}>
      {/* 상단 타이틀 */}
      <div className="mt-8">
        <div className="text-2xl font-bold text-gray-900">
          <span className="text-blue-500">회원가입 유형</span>을
        </div>
        <div className="mt-1 text-2xl font-bold text-gray-900">
          선택해주세요
        </div>
      </div>

      {/* 유형 선택 버튼들 - 화면 중단에 배치 */}
      <div className="mt-40 flex justify-center">
        <div className="flex w-full max-w-md gap-4">
          <BoxButton
            name="구인자"
            onClick={() => handleUserTypeSelect("employer")}
            selected={userTypeInfo.userType === "employer"}
            className="flex-1"
            image="/images/employer.svg" // 구인자 SVG 이미지
          />

          <BoxButton
            name="근로자"
            onClick={() => handleUserTypeSelect("worker")}
            selected={userTypeInfo.userType === "worker"}
            className="flex-1"
            image="/images/worker.svg" // 근로자 SVG 이미지
          />
        </div>
      </div>

      {/* 다음 버튼 */}
      {isValid && (
        <div className="animate-slide-up fixed bottom-8 left-4 right-4">
          <Button
            size="md"
            theme="primary"
            onClick={handleNextStep}
            className="w-full"
          >
            다음
          </Button>
        </div>
      )}
    </div>
  );
};

export default UserTypeSelectionStep;
