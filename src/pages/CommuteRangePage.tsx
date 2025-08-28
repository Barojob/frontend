import CommuteRangePolygon from "@/components/CommuteRangePolygon";
import Map from "@/components/Map";
import NavigationHeader from "@/components/NavigationHeader";
import { COMMUTE_RANGE_ORDER } from "@/fixtures/commuteAreas";
import { useCommuteRangePage } from "@/hooks/useCommuteRangePage";
import { cn } from "@/utils/classname";
import React, { useState } from "react";

const CommuteRangePage: React.FC = () => {
  const [isDragging, setIsDragging] = useState(false);
  const {
    selectedRange,
    handleSliderChange,
    selectedTransport,
    setSelectedTransport,
    currentStepInfo,
    handleNext,
  } = useCommuteRangePage();

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-white">
      <NavigationHeader title="출퇴근 가능 범위" backTo="/" />

      <div className="relative flex-1">
        {/* initialLevel prop 제거 */}
        <Map>
          <CommuteRangePolygon radiusKm={currentStepInfo.radius / 1000} />
        </Map>
      </div>

      <div className="border-t bg-white p-6">
        <h2 className="mb-8 text-lg font-semibold">
          출퇴근 가능 범위를 설정해주세요.
        </h2>

        <div className="relative h-6 w-full">
          <div className="absolute top-1/2 h-1 w-full -translate-y-1/2 rounded-full bg-gray-200" />
          <div
            className="absolute top-1/2 h-1 -translate-y-1/2 rounded-full bg-blue-500 transition-all duration-500 ease-out"
            style={{
              width: `${
                ((selectedRange - 1) / (COMMUTE_RANGE_ORDER.length - 1)) * 100
              }%`,
            }}
          />
          {COMMUTE_RANGE_ORDER.map((stepKey, index) => {
            const stepNumber = index + 1;
            const isActive = selectedRange >= stepNumber;
            const isCurrent = selectedRange === stepNumber;
            const position = (index / (COMMUTE_RANGE_ORDER.length - 1)) * 100;

            return (
              <div
                key={stepKey}
                className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${position}%` }}
              >
                <div
                  className={cn(
                    "h-4 w-4 rounded-full border-2 transition-all duration-500 ease-out",
                    {
                      "border-blue-500 bg-blue-500": isActive,
                      "border-gray-300 bg-white": !isActive,
                      "h-5 w-5 shadow-lg": isCurrent,
                    },
                  )}
                />
                {(stepNumber === 1 ||
                  stepNumber === COMMUTE_RANGE_ORDER.length) && (
                  <div
                    className={cn("absolute -bottom-6 w-20 whitespace-nowrap", {
                      "-left-0": stepNumber === 1,
                      "right-0 text-right":
                        stepNumber === COMMUTE_RANGE_ORDER.length,
                    })}
                  >
                    <span
                      className={cn("text-xs font-medium", {
                        "text-blue-600": isActive,
                        "text-gray-400": !isActive,
                      })}
                    >
                      {stepNumber === 1 ? "가까운 동네" : "먼 동네"}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
          <input
            type="range"
            min="1"
            max={COMMUTE_RANGE_ORDER.length}
            step="1"
            value={selectedRange}
            onChange={handleSliderChange}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onTouchStart={() => setIsDragging(true)}
            onTouchEnd={() => setIsDragging(false)}
            className="absolute inset-0 h-full w-full cursor-pointer appearance-none bg-transparent opacity-0"
          />
        </div>
        <div
          className={cn(
            "mt-8 text-center text-sm transition-opacity duration-200",
            isDragging ? "opacity-100" : "opacity-0",
          )}
        >
          <p className="text-gray-600">
            드래그해서 출퇴근 가능 범위를 조절하세요
          </p>
        </div>
        <div className="mt-8">
          <h3 className="mb-2 text-lg font-semibold">어떻게 이동하시나요?</h3>
          <div className="mt-4 flex gap-4">
            <button
              onClick={() => setSelectedTransport("대중교통 + 도보")}
              className={cn(
                "flex-1 rounded-lg border-2 p-3 text-center",
                selectedTransport === "대중교통 + 도보"
                  ? "border-blue-400 bg-blue-100 text-blue-600"
                  : "border-gray-300 bg-gray-100 text-gray-600",
              )}
            >
              대중교통 + 도보
            </button>
            <button
              onClick={() => setSelectedTransport("자차")}
              className={cn(
                "flex-1 rounded-lg border-2 p-3 text-center",
                selectedTransport === "자차"
                  ? "border-blue-400 bg-blue-100 text-blue-600"
                  : "border-gray-300 bg-gray-100 text-gray-600",
              )}
            >
              자차
            </button>
          </div>
        </div>
        {selectedTransport && (
          <div className="animate-slide-up mt-12">
            <button
              className="w-full rounded-lg bg-blue-500 py-3 text-lg text-white"
              onClick={handleNext}
            >
              다음
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommuteRangePage;
