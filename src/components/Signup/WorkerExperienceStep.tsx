import React, { useEffect, useState } from "react";
import useSignupContext from "../../hooks/useSignupContext";
import { SignupStep } from "../../types/signup";
import { cn } from "../../utils/classname";
import Button from "../Button";

type WorkerExperienceStepProps = {
  className?: string;
  onValidityChange: (isValid: boolean) => void;
  onSelectedJobsChange?: (count: number) => void;
};

const WorkerExperienceStep: React.FC<WorkerExperienceStepProps> = ({
  className,
  onValidityChange,
  onSelectedJobsChange,
}) => {
  const {
    stepState: [, setCurrentStep],
  } = useSignupContext();

  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedJobs, setSelectedJobs] = useState<string[]>([]);

  // 업무 종류 정의
  const jobCategories = {
    보통인부: [
      "보통 인부",
      "자재 정리",
      "신호수",
      "해체 정리",
      "곰방",
      "양중",
      "철거",
    ],
    기능공: [
      "형틀 목수",
      "철근공",
      "전기공",
      "미장공",
      "조적공",
      "탕리공",
      "설비공",
      "용접공",
      "내장목수",
      "페인트공",
      "방수공",
      "도배사",
      "석공",
      "판넬공",
      "메지공",
      "실리콘",
      "시트지",
      "마루장판",
      "샷시 창호",
      "보도블럭",
      "경계석",
      "산소 절단",
    ],
  };

  // 유효성 검사 - 항상 유효 (선택하지 않아도 건너뛸 수 있음)
  const isValid = true;

  // 카테고리 선택 핸들러
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setSelectedJobs([]); // 카테고리 변경 시 선택된 업무 초기화
  };

  // 업무 선택/해제 핸들러
  const handleJobToggle = (job: string) => {
    setSelectedJobs((prev) => {
      if (prev.includes(job)) {
        return prev.filter((j) => j !== job);
      } else {
        return [...prev, job];
      }
    });
  };

  // 건너뛰기 버튼 핸들러
  const handleSkip = () => {
    // 이수증 등록 페이지로 이동
    setCurrentStep(SignupStep.WORKER_LICENSE);
  };

  // 다음 단계 버튼 핸들러
  const handleNext = () => {
    // 선택된 경험을 저장하고 다음 단계로 이동
    // 이수증 등록 페이지로 이동
    setCurrentStep(SignupStep.WORKER_LICENSE);
  };

  useEffect(() => {
    onValidityChange(isValid);
    onSelectedJobsChange?.(selectedJobs.length);
  }, [isValid, onValidityChange, selectedJobs.length, onSelectedJobsChange]);

  return (
    <div className={cn("", className)}>
      <div className="mt-8">
        <div className="text-2xl font-bold text-gray-900">
          이전에 <span className="text-blue-500">어떤 경험</span>을
        </div>
        <div className="mt-1 text-2xl font-bold text-gray-900">
          했는지 체크해주세요
        </div>
      </div>

      {/* 카테고리 선택 버튼들 */}
      <div className="mt-12">
        <div className="relative flex overflow-hidden rounded-xl border border-gray-500 bg-white">
          {/* 보통인부 버튼 */}
          <button
            onClick={() => handleCategorySelect("보통인부")}
            className={cn(
              "flex-1 px-6 py-3 text-center font-medium",
              selectedCategory === "보통인부"
                ? "bg-[#D3DFFF] font-bold text-[#247AF2]"
                : "bg-white text-gray-300 hover:bg-gray-50",
            )}
          >
            보통인부
          </button>

          {/* 중앙 세로선 */}
          <div className="w-px bg-gray-500"></div>

          {/* 기능공 버튼 */}
          <button
            onClick={() => handleCategorySelect("기능공")}
            className={cn(
              "flex-1 px-6 py-3 text-center font-medium",
              selectedCategory === "기능공"
                ? "bg-[#D3DFFF] font-bold text-[#247AF2]"
                : "bg-white text-gray-300 hover:bg-gray-50",
            )}
          >
            기능공
          </button>
        </div>
      </div>

      {/* 선택된 카테고리의 업무 목록 */}
      {selectedCategory && (
        <div className="animate-slide-up mt-8">
          <div className="grid grid-cols-4 gap-3">
            {jobCategories[selectedCategory as keyof typeof jobCategories].map(
              (job) => (
                <button
                  key={job}
                  onClick={() => handleJobToggle(job)}
                  className={cn(
                    "rounded-lg px-3 py-3 text-center text-sm font-medium transition-all duration-150 active:scale-[0.95]",
                    selectedJobs.includes(job)
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-400 hover:bg-gray-200",
                  )}
                >
                  {job}
                </button>
              ),
            )}
          </div>

          {/* 선택된 업무 개수 표시 */}
          {selectedJobs.length > 0 && (
            <div className="mt-4 text-center text-sm text-gray-600">
              {selectedJobs.length}개의 경험을 선택했습니다
            </div>
          )}
        </div>
      )}

      {/* 하단 버튼 영역 - 화면 하단 고정 */}
      <div className="animate-slide-up fixed bottom-8 left-4 right-4">
        {selectedJobs.length === 0 ? (
          // 아무것도 선택하지 않았을 때 - 건너뛰기 버튼
          <Button
            onClick={handleSkip}
            theme="primary"
            size="md"
            className="w-full transition-transform duration-150 active:scale-[0.95]"
          >
            건너뛰기
          </Button>
        ) : (
          // 하나 이상 선택했을 때 - 다음 단계 버튼
          <Button
            onClick={handleNext}
            theme="primary"
            size="md"
            className="w-full transition-transform duration-150 active:scale-[0.95]"
          >
            다음 단계
          </Button>
        )}
      </div>
    </div>
  );
};

export default WorkerExperienceStep;
