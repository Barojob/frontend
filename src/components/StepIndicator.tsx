import React from "react";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  className?: string;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({
  currentStep,
  totalSteps,
  className = "",
}) => {
  return (
    <div className={`w-full ${className}`}>
      <div className="mx-auto max-w-2xl">
        <div className="flex gap-2.5">
          {Array.from({ length: totalSteps }, (_, index) => {
            const stepNumber = index + 1;
            const isActive = stepNumber <= currentStep;

            return (
              <div
                key={stepNumber}
                className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                  isActive ? "bg-blue-600" : "bg-zinc-200"
                }`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StepIndicator;
