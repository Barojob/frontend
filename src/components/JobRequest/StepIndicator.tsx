// StepIndicator.tsx
import React from "react";
import { cn } from "@/utils/classname";

interface StepIndicatorProps {
  className?: string;
  currentStep: number; // 1, 2, 또는 3
  totalSteps?: number; // 기본값 3
}

const StepIndicator: React.FC<StepIndicatorProps> = ({
  className,
  currentStep,
  totalSteps = 3,
}) => {
  return (
    <div className={cn("w-full my-4", className)}>
      <div className="flex items-center">
        {Array.from({ length: totalSteps }).map((_, index) => {
          const step = index + 1;
          const isActive = step <= currentStep;
          return (
            <React.Fragment key={step}>
              <div className="flex-1">
                {/* 각 세그먼트를 배경으로 그리고, 활성화 된 경우 채워준다 */}
                <div className="w-full h-[2px] rounded-2xl bg-gray-300 relative">
                  {isActive && (
                    <div
                      className="h-full bg-blue-500"
                      style={{ width: "100%" }}
                    ></div>
                  )}
                </div>
              </div>
              {/* 마지막 세그먼트 이후에는 구분 간격을 주지 않음 */}
              {step < totalSteps && <div className="w-2" />}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default StepIndicator;
