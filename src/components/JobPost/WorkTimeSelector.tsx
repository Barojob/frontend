import React, { useState } from "react";

interface WorkTimeSelectorProps {
  startTime: string;
  endTime: string;
  onTimeChange: (startTime: string, endTime: string) => void;
  className?: string;
  month: number;
  day: number;
  onDateChange: (month: number, day: number) => void;
}

const WorkTimeSelector: React.FC<WorkTimeSelectorProps> = ({
  startTime,
  endTime,
  onTimeChange,
  className = "",
  month,
  day,
  onDateChange,
}) => {
  const [isStartTimeOpen, setIsStartTimeOpen] = useState(false);
  const [isEndTimeOpen, setIsEndTimeOpen] = useState(false);
  const [isMonthOpen, setIsMonthOpen] = useState(false);
  const [isDayOpen, setIsDayOpen] = useState(false);

  const timeOptions = [] as string[];
  for (let hour = 0; hour <= 23; hour++) {
    timeOptions.push(`${hour.toString().padStart(2, "0")}:00`);
  }

  const handleStartTimeSelect = (time: string) => {
    onTimeChange(time, endTime);
    setIsStartTimeOpen(false);
  };

  const handleEndTimeSelect = (time: string) => {
    onTimeChange(startTime, time);
    setIsEndTimeOpen(false);
  };

  const monthOptions = Array.from({ length: 12 }, (_, i) => i + 1);
  const dayOptions = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {/* 월 드롭다운 */}
      <div className="flex items-center gap-2">
        <p className="text-neutral-600">날짜</p>
        <div className="relative">
          <button
            onClick={() => {
              setIsMonthOpen(!isMonthOpen);
              setIsDayOpen(false);
              setIsStartTimeOpen(false);
              setIsEndTimeOpen(false);
            }}
            className="flex min-w-[70px] items-center justify-between rounded-lg border border-gray-100 bg-gray-100 px-3 py-2 text-base font-medium text-gray-500 transition-all duration-200"
          >
            <span>{month.toString().padStart(2, "0")}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="11"
              height="9"
              viewBox="0 0 11 9"
              fill="none"
              className={`transform transition-transform ${
                isMonthOpen ? "rotate-180" : ""
              }`}
            >
              <path
                d="M6.10324 8.4445C5.76111 9.03709 4.90577 9.03709 4.56364 8.4445L0.714639 1.77783C0.372506 1.18524 0.800173 0.444497 1.48444 0.444497L9.18245 0.444498C9.86671 0.444498 10.2944 1.18524 9.95224 1.77783L6.10324 8.4445Z"
                fill="#247AF2"
              />
            </svg>
          </button>
          {isMonthOpen && (
            <div className="absolute top-full z-10 mt-1 max-h-60 w-full overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg">
              {monthOptions.map((m) => (
                <button
                  key={m}
                  onClick={() => {
                    onDateChange(m, day);
                    setIsMonthOpen(false);
                  }}
                  className={`w-full px-4 py-2 text-left text-sm transition-colors hover:bg-blue-50 ${
                    month === m ? "bg-blue-100 text-blue-600" : "text-gray-700"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          )}
        </div>
        <span className="text-base font-medium text-neutral-600">월</span>

        {/* 일 드롭다운 */}
        <div className="relative">
          <button
            onClick={() => {
              setIsDayOpen(!isDayOpen);
              setIsMonthOpen(false);
              setIsStartTimeOpen(false);
              setIsEndTimeOpen(false);
            }}
            className="flex min-w-[70px] items-center justify-between rounded-lg border border-gray-100 bg-gray-100 px-3 py-2 text-base font-medium text-gray-500 transition-all duration-200"
          >
            <span>{day.toString().padStart(2, "0")}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="11"
              height="9"
              viewBox="0 0 11 9"
              fill="none"
              className={`transform transition-transform ${
                isDayOpen ? "rotate-180" : ""
              }`}
            >
              <path
                d="M6.10324 8.4445C5.76111 9.03709 4.90577 9.03709 4.56364 8.4445L0.714639 1.77783C0.372506 1.18524 0.800173 0.444497 1.48444 0.444497L9.18245 0.444498C9.86671 0.444498 10.2944 1.18524 9.95224 1.77783L6.10324 8.4445Z"
                fill="#247AF2"
              />
            </svg>
          </button>
          {isDayOpen && (
            <div className="absolute top-full z-10 mt-1 max-h-60 w-full overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg">
              {dayOptions.map((d) => (
                <button
                  key={d}
                  onClick={() => {
                    onDateChange(month, d);
                    setIsDayOpen(false);
                  }}
                  className={`w-full px-4 py-2 text-left text-sm transition-colors hover:bg-blue-50 ${
                    day === d ? "bg-blue-100 text-blue-600" : "text-gray-700"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          )}
        </div>
        <span className="text-base font-medium text-neutral-600">일</span>
      </div>
      <div className="flex items-center gap-2">
        <p className="text-neutral-600">시간</p>
        <div className="relative">
          <button
            onClick={() => setIsStartTimeOpen(!isStartTimeOpen)}
            className="flex min-w-[100px] items-center justify-between rounded-lg border border-gray-100 bg-gray-100 px-4 py-2 text-base font-medium text-gray-500 transition-all duration-200"
          >
            <span>{startTime || "09:00"}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="11"
              height="9"
              viewBox="0 0 11 9"
              fill="none"
              className={`transform transition-transform ${
                isStartTimeOpen ? "rotate-180" : ""
              }`}
            >
              <path
                d="M6.10324 8.4445C5.76111 9.03709 4.90577 9.03709 4.56364 8.4445L0.714639 1.77783C0.372506 1.18524 0.800173 0.444497 1.48444 0.444497L9.18245 0.444498C9.86671 0.444498 10.2944 1.18524 9.95224 1.77783L6.10324 8.4445Z"
                fill="#247AF2"
              />
            </svg>
          </button>

          {isStartTimeOpen && (
            <div className="absolute top-full z-10 mt-1 max-h-60 w-full overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg">
              {timeOptions.map((time) => (
                <button
                  key={time}
                  onClick={() => handleStartTimeSelect(time)}
                  className={`w-full px-4 py-2 text-left text-sm transition-colors hover:bg-blue-50 ${
                    startTime === time
                      ? "bg-blue-100 text-blue-600"
                      : "text-gray-700"
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          )}
        </div>

        <span className="text-base font-medium text-neutral-600">시부터</span>

        <div className="relative">
          <button
            onClick={() => setIsEndTimeOpen(!isEndTimeOpen)}
            className="flex min-w-[100px] items-center justify-between rounded-lg border border-gray-100 bg-gray-100 px-4 py-2 text-base font-medium text-gray-500 transition-all duration-200"
          >
            <span>{endTime || "17:00"}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="11"
              height="9"
              viewBox="0 0 11 9"
              fill="none"
              className={`transform transition-transform ${
                isEndTimeOpen ? "rotate-180" : ""
              }`}
            >
              <path
                d="M6.10324 8.4445C5.76111 9.03709 4.90577 9.03709 4.56364 8.4445L0.714639 1.77783C0.372506 1.18524 0.800173 0.444497 1.48444 0.444497L9.18245 0.444498C9.86671 0.444498 10.2944 1.18524 9.95224 1.77783L6.10324 8.4445Z"
                fill="#247AF2"
              />
            </svg>
          </button>
          {isEndTimeOpen && (
            <div className="absolute top-full z-10 mt-1 max-h-60 w-full overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg">
              {timeOptions.map((time) => (
                <button
                  key={time}
                  onClick={() => handleEndTimeSelect(time)}
                  className={`w-full px-4 py-2 text-left text-sm transition-colors hover:bg-blue-50 ${
                    endTime === time
                      ? "bg-blue-100 text-blue-600"
                      : "text-gray-700"
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          )}
        </div>
        <span className="text-base font-medium text-neutral-600">시까지</span>
      </div>

      {(isStartTimeOpen || isEndTimeOpen || isMonthOpen || isDayOpen) && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => {
            setIsStartTimeOpen(false);
            setIsEndTimeOpen(false);
            setIsMonthOpen(false);
            setIsDayOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default WorkTimeSelector;
