import BoxButton from "@/components/BoxButton";
import Button from "@/components/Button";
import { useUserTypeSelection } from "@/hooks/useUserTypeSelection";
import { cn } from "@/utils/classname";
import React from "react";

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
  const { userType, isValid, handleUserTypeSelect, handleNextStep } =
    useUserTypeSelection({ onValidityChange, onUserTypeChange });

  return (
    <div
      className={cn(
        "safe-area-top safe-area-bottom flex h-screen flex-col",
        className,
      )}
    >
      <div className="mt-8">
        <div className="text-2xl font-bold text-gray-900">
          <span className="text-blue-500">회원가입 유형</span>을
        </div>
        <div className="mt-1 text-2xl font-bold text-gray-900">
          선택해주세요
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center">
        <div className="mb-40 flex w-full max-w-md gap-4">
          <BoxButton
            name="구인자"
            onClick={() => handleUserTypeSelect("employer")}
            selected={userType === "employer"}
            className="flex-1"
            image="/images/employer.svg"
          />
          <BoxButton
            name="근로자"
            onClick={() => handleUserTypeSelect("worker")}
            selected={userType === "worker"}
            className="flex-1"
            image="/images/worker.svg"
          />
        </div>
      </div>

      {isValid && (
        <div className="animate-slide-up fixed-bottom-button">
          <Button size="md" theme="primary" block onClick={handleNextStep}>
            다음
          </Button>
        </div>
      )}
    </div>
  );
};

export default UserTypeSelectionStep;
