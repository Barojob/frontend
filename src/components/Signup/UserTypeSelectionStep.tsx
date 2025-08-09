import React, { useEffect, useState } from "react";
import { cn } from "../../utils/classname";
import BoxButton from "../BoxButton/BoxButton";

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
  const [selectedUserType, setSelectedUserType] = useState<string>("");

  // 유효성 검사 - 유형이 선택되었을 때만 유효
  const isValid = selectedUserType !== "";

  useEffect(() => {
    onValidityChange(isValid);
  }, [isValid, onValidityChange]);

  const handleUserTypeSelect = (userType: string) => {
    setSelectedUserType(userType);
    onUserTypeChange?.(userType);
    // 선택만 하고 자동으로 다음 단계로 넘어가지 않음
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
            selected={selectedUserType === "employer"}
            className="flex-1"
            image="/images/employer.svg" // 구인자 SVG 이미지
          />

          <BoxButton
            name="근로자"
            onClick={() => handleUserTypeSelect("worker")}
            selected={selectedUserType === "worker"}
            className="flex-1"
            image="/images/worker.svg" // 근로자 SVG 이미지
          />
        </div>
      </div>
    </div>
  );
};

export default UserTypeSelectionStep;
