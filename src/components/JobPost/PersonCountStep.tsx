import PersonCountSelector from "@/components/JobPost/PersonCountSelector";
import React from "react";

interface PersonCountStepProps {
  selectedPersonCount: number;
  onPersonCountChange: (count: number) => void;
  onConfirm: () => void;
}

const PersonCountStep: React.FC<PersonCountStepProps> = ({
  selectedPersonCount,
  onPersonCountChange,
  onConfirm,
}) => {
  return (
    <>
      <div className="mb-4 text-2xl font-bold text-neutral-600">
        <span className="text-blue-600">인원</span>을 선택해주세요
      </div>
      <div className="mb-8">
        <PersonCountSelector
          personCount={selectedPersonCount}
          onPersonCountChange={onPersonCountChange}
          className="justify-center"
        />
      </div>

      {/* 확인 버튼 */}
      <div className="mb-4">
        <button
          onClick={onConfirm}
          className="w-full rounded-xl bg-blue-600 py-3 text-lg text-white"
        >
          확인
        </button>
      </div>
    </>
  );
};

export default PersonCountStep;
