import React, { useEffect, useState } from "react";
import { cn } from "../../utils/classname";
import BoxButton from "../BoxButton/BoxButton";

type UserTypeSelectionStepProps = {
  className?: string;
  onValidityChange: (isValid: boolean) => void;
  onUserTypeChange?: (userType: string) => void;
  onUserTypeSelect?: (userType: string) => void;
};

const UserTypeSelectionStep: React.FC<UserTypeSelectionStepProps> = ({
  className,
  onValidityChange,
  onUserTypeChange,
  onUserTypeSelect,
}) => {
  const [selectedUserType, setSelectedUserType] = useState<string>("");

  // 유효성 검사 - 항상 true로 설정 (선택 시 바로 다음 단계로)
  const isValid = true;

  useEffect(() => {
    onValidityChange(isValid);
  }, [isValid, onValidityChange]);

  const handleUserTypeSelect = (userType: string) => {
    setSelectedUserType(userType);
    onUserTypeChange?.(userType);
    // 선택과 동시에 다음 단계로 진행
    setTimeout(() => {
      onUserTypeSelect?.(userType);
    }, 200); // 선택 애니메이션을 위한 짧은 딜레이
  };

  return (
    <div className={cn("", className)}>
      {/* 상단 타이틀 */}
      <div className="mt-8">
        <div className="text-2xl font-bold text-gray-900">회원가입 유형을</div>
        <div className="mt-1 text-2xl font-bold text-gray-900">
          선택해주세요
        </div>
      </div>

      {/* 유형 선택 버튼들 - 화면 중단에 배치 */}
      <div className="mt-40 flex justify-center">
        <div className="flex w-full max-w-md gap-4">
          <BoxButton
            name=""
            onClick={() => handleUserTypeSelect("employer")}
            selected={selectedUserType === "employer"}
            className="flex-1"
            image="/images/employer.svg" // 구인자 SVG 이미지
          >
            구인자
          </BoxButton>

          <BoxButton
            name=""
            onClick={() => handleUserTypeSelect("worker")}
            selected={selectedUserType === "worker"}
            className="flex-1"
            image="/images/worker.svg" // 근로자 SVG 이미지
          >
            근로자
          </BoxButton>
        </div>
      </div>
    </div>
  );
};

export default UserTypeSelectionStep;
