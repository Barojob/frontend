import WorkTimeSelector from "@/components/JobPost/WorkTimeSelector";
import React from "react";

interface WorkTimeStepProps {
  workStartTime: string;
  workEndTime: string;
  onTimeChange: (startTime: string, endTime: string) => void;
  onConfirm: () => void;
}

const WorkTimeStep: React.FC<WorkTimeStepProps> = ({
  workStartTime,
  workEndTime,
  onTimeChange,
  onConfirm,
}) => {
  return (
    <>
      <div className="mb-4 text-2xl font-bold text-neutral-600">
        <span className="text-blue-600">업무 시간</span>을 선택해주세요
      </div>
      <WorkTimeSelector
        startTime={workStartTime}
        endTime={workEndTime}
        onTimeChange={onTimeChange}
        className="mb-8"
      />

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

export default WorkTimeStep;
