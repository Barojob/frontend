import React from "react";
import WorkTimeSelector from "./WorkTimeSelector";

interface WorkTimeStepProps {
  workStartTime: string;
  workEndTime: string;
  onTimeChange: (startTime: string, endTime: string) => void;
  month: number;
  day: number;
  onDateChange: (month: number, day: number) => void;
  onConfirm: () => void;
}

const WorkTimeStep: React.FC<WorkTimeStepProps> = ({
  workStartTime,
  workEndTime,
  onTimeChange,
  month,
  day,
  onDateChange,
  onConfirm,
}) => {
  return (
    <>
      <div className="mb-4 text-2xl font-bold text-neutral-600">
        <span className="text-blue-600">업무 날짜와 시간</span>을 선택해주세요
      </div>
      <WorkTimeSelector
        startTime={workStartTime}
        endTime={workEndTime}
        onTimeChange={onTimeChange}
        month={month}
        day={day}
        onDateChange={onDateChange}
        className="mb-8"
      />

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
