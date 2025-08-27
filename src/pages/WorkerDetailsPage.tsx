import NavigationHeader from "@/components/NavigationHeader";
import { cn } from "@/utils/classname";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const usePackage = [
  "없음",
  "함마드릴",
  "그라인더",
  "유압크라샤",
  "타워크레인 신호수 자격",
];

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

const WorkerDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedJobs, setSelectedJobs] = useState<string[]>([]);
  const [selectedPackages, setSelectedPackages] = useState<string[]>([]);

  const isJobSelected = selectedJobs.length > 0;
  const isPackageSelected = selectedPackages.length > 0;

  // 카테고리 선택 핸들러
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setSelectedJobs([]); // 카테고리 변경 시 선택된 업무 초기화
    setSelectedPackages([]); // 카테고리 변경 시 선택된 장비도 초기화
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
    setSelectedPackages([]); // 다른 업무 선택 시 장비 선택 초기화
  };

  // 장비 선택/해제 핸들러
  const handlePackageToggle = (pkg: string) => {
    setSelectedPackages((prev) => {
      if (pkg === "없음") {
        // "없음" 선택 시 다른 모든 장비 체크 해제하고 "없음"만 선택
        return ["없음"];
      } else {
        // 다른 장비 선택 시 "없음" 체크 해제
        const newSelection = prev.filter((p) => p !== "없음");
        if (newSelection.includes(pkg)) {
          return newSelection.filter((p) => p !== pkg);
        } else {
          return [...newSelection, pkg];
        }
      }
    });
  };

  return (
    <div className="flex h-screen flex-col overflow-x-hidden bg-white">
      <NavigationHeader
        title=""
        className="px-6 py-4 font-bold"
        backTo="/commute-range"
      />

      <div className="ml-6 mt-4 text-2xl font-bold text-gray-900">
        원하시는 업무를 체크해주세요
      </div>

      {/* 카테고리 선택 버튼들 */}
      <div className="mx-6 mt-6">
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
        <div className="animate-slide-up mx-6 mt-8">
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

      {isJobSelected && (
        <div className="animate-slide-up">
          <div className="ml-6 mt-10 text-2xl font-bold text-gray-900">
            사용가능한 장비를 체크해주세요
          </div>
          <div className="mx-6 mt-4">
            <div className="flex flex-wrap gap-3">
              {usePackage.map((pkg) => (
                <button
                  key={pkg}
                  onClick={() => handlePackageToggle(pkg)}
                  className={cn(
                    "min-w-0 rounded-lg px-4 py-2 text-center text-sm font-medium transition-all duration-150 active:scale-[0.95]",
                    selectedPackages.includes(pkg)
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-400 hover:bg-gray-200",
                  )}
                >
                  {pkg}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {isPackageSelected && (
        <div className="animate-slide-up mx-6 mt-10">
          <div className="text-2xl font-bold text-gray-900">예상 수령 금액</div>

          <div className="mt-4 rounded-lg bg-gray-100 px-6 py-4">
            {/* 금액 표시 */}
            <div className="font-inter flex items-baseline justify-between text-xl font-bold">
              <span>
                최소 <span className="text-[#FD694B]">140,700원</span>
              </span>
              ~
              <span>
                최대 <span className="text-[#374BFF]">167,000원</span>
              </span>
            </div>

            {/* 고용보험 부분은 버전 1에서는 제거, 버전 2때는 쓸 듯*/}
            {/* <div className="mt-4 h-px w-full bg-gray-300"></div>

            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="font-Pretendard text-gray-700">
                    고용보험
                  </span>
                  <span className="text-sm text-gray-500">
                    <span className="ml-1 flex flex-wrap items-center justify-center rounded-full bg-gray-200 px-2 text-xs font-medium text-gray-600">
                      자세히
                    </span>
                  </span>
                </div>
                <span className="font- Pretendard text-gray-700">-920원</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="font-inter text-gray-700">
                  고용보험료 지원
                </span>
                <span className="font-Pretendard text-gray-700">+920원</span>
              </div>
            </div> */}
          </div>
          <div className="mt-12">
            <div className="mb-4 text-center text-sm leading-relaxed text-[#247AF2]">
              업무 내용에 따라 수령 금액이 달라집니다.
              <br />
              정확한 수령 금액은 공고에서 확인해주세요.
            </div>
            <button
              className="font-inter w-full rounded-lg bg-[#247AF2] py-3 text-lg text-white shadow transition-all duration-150 active:scale-[0.95]"
              onClick={() => navigate("/")}
            >
              18시에 알려드릴게요 매칭 등록
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkerDetailsPage;
