import CheckBox from "@/components/CheckBox";
import JobPostCard from "@/components/JobPost/JobPostCard";
import NavigationHeader from "@/components/NavigationHeader";
import StepIndicator from "@/components/StepIndicator";
import WorkerCard from "@/components/WorkerCard";
import { mockWorkers, type Worker } from "@/fixtures/workers";
import { useJobPosting } from "@/providers/JobPostingProvider";
import SadIcon from "@/svgs/SadIcon";
import { getPerPersonAmount } from "@/utils/jobPostingHelpers";
import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

type Props = {
  className?: string;
};

const MatchingResultsPageContent: React.FC<Props> = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const navigationState = (location.state || {}) as Partial<{
    selectedMatchingType: "smart" | "direct" | null;
    jobPosts: Array<{
      id: string;
      activeCategory: string;
      selectedDemolitionWork: string[];
      selectedJobTypes: string[];
      selectedEquipment: string[];
      selectedExperience?: string[];
      workStartTime: string;
      workEndTime: string;
      workMonth: number;
      workDay: number;
      selectedPersonCount: number;
    }>;
    activeCategory: string;
    selectedDemolitionWork: string[];
    selectedJobTypes: string[];
    selectedEquipment: string[];
    workStartTime: string;
    workEndTime: string;
    workMonth: number;
    workDay: number;
    selectedPersonCount: number;
  }>;
  const [isAgreedSameDayPay, setIsAgreedSameDayPay] = useState(false);
  const [shouldShakeAgreement, setShouldShakeAgreement] = useState(false);
  const [selectedWorkers, setSelectedWorkers] = useState<string[]>([]);
  const {
    selectedMatchingType,
    jobPosts,
    selectedJobTypes,
    selectedDemolitionWork,
    selectedEquipment,
    workStartTime,
    workEndTime,
    workMonth,
    workDay,
    selectedPersonCount,
  } = useJobPosting();

  const effectiveSelectedMatchingType =
    navigationState.selectedMatchingType ?? selectedMatchingType;
  const effectiveJobPosts = navigationState.jobPosts ?? jobPosts;

  const latestJobPost = useMemo(() => {
    return effectiveJobPosts.length > 0
      ? effectiveJobPosts[effectiveJobPosts.length - 1]
      : null;
  }, [effectiveJobPosts]);

  const sourceSelectedJobTypes =
    latestJobPost?.selectedJobTypes ?? selectedJobTypes;
  const sourceSelectedDemolitionWork =
    latestJobPost?.selectedDemolitionWork ?? selectedDemolitionWork;
  const sourceSelectedEquipment =
    latestJobPost?.selectedEquipment ?? selectedEquipment;
  const sourceSelectedPersonCount =
    latestJobPost?.selectedPersonCount ?? selectedPersonCount;
  const sourceActiveCategory =
    latestJobPost?.activeCategory ||
    effectiveJobPosts[0]?.activeCategory ||
    "general";
  const sourceWorkStartTime =
    latestJobPost?.workStartTime ??
    navigationState.workStartTime ??
    workStartTime;
  const sourceWorkEndTime =
    latestJobPost?.workEndTime ?? navigationState.workEndTime ?? workEndTime;
  const sourceWorkMonth =
    latestJobPost?.workMonth ?? navigationState.workMonth ?? workMonth;
  const sourceWorkDay =
    latestJobPost?.workDay ?? navigationState.workDay ?? workDay;

  const perPersonAmount = useMemo(
    () =>
      getPerPersonAmount({
        selectedJobTypes: sourceSelectedJobTypes,
        selectedDemolitionWork: sourceSelectedDemolitionWork,
        selectedEquipment: sourceSelectedEquipment,
      }),
    [
      sourceSelectedJobTypes,
      sourceSelectedDemolitionWork,
      sourceSelectedEquipment,
    ],
  );
  const totalAmount = useMemo(
    () => perPersonAmount * (sourceSelectedPersonCount || 1),
    [perPersonAmount, sourceSelectedPersonCount],
  );

  const combinedTotalAmount = useMemo(() => {
    if (effectiveJobPosts.length > 0) {
      return effectiveJobPosts.reduce((sum, jp) => {
        const per = getPerPersonAmount({
          selectedJobTypes: jp.selectedJobTypes,
          selectedDemolitionWork: jp.selectedDemolitionWork,
          selectedEquipment: jp.selectedEquipment,
        });
        return sum + per * jp.selectedPersonCount;
      }, 0);
    }
    return totalAmount;
  }, [effectiveJobPosts, totalAmount]);

  const handleBackToJobPosting = () => {
    navigate("/job-posting");
  };

  const handlePaymentClick = () => {
    console.log("Button clicked!");
    console.log("isPaymentDisabled:", isPaymentDisabled);

    if (effectiveSelectedMatchingType === "smart") {
      if (isPaymentDisabled) {
        console.log("Payment disabled, triggering shake animation");
        setShouldShakeAgreement(true);
        setTimeout(() => {
          console.log("Shake animation ended");
          setShouldShakeAgreement(false);
        }, 500);
        return;
      }
      if (!isSelectionComplete) {
        console.log("Selection not complete");
        return;
      }
      console.log(
        "Navigating to payment with selected workers:",
        selectedWorkers,
      );
      navigate("/payment");
    } else {
      // 직접 매칭
      console.log("Navigating to payment");
      navigate("/payment");
    }
  };

  const isPaymentDisabled = useMemo(() => {
    return effectiveSelectedMatchingType === "smart" && !isAgreedSameDayPay;
  }, [effectiveSelectedMatchingType, isAgreedSameDayPay]);

  // 추천 인력과 일반 인력 분리
  const recommendedWorkers = useMemo((): Worker[] => {
    return (mockWorkers as Worker[]).filter((worker) => worker.isRecommended);
  }, []);

  const regularWorkers = useMemo((): Worker[] => {
    return (mockWorkers as Worker[]).filter((worker) => !worker.isRecommended);
  }, []);

  // 빈 상태 여부 확인
  const isEmpty = mockWorkers.length === 0;

  // 선택 완료 여부 확인
  const isSelectionComplete = useMemo(() => {
    return selectedWorkers.length >= sourceSelectedPersonCount;
  }, [selectedWorkers.length, sourceSelectedPersonCount]);

  // 인력 선택 핸들러
  const handleWorkerSelect = (workerId: string) => {
    setSelectedWorkers((prev) => {
      if (prev.includes(workerId)) {
        return prev.filter((id) => id !== workerId);
      } else if (prev.length < sourceSelectedPersonCount) {
        return [...prev, workerId];
      }
      return prev;
    });
  };

  useEffect(() => {
    console.log("shouldShakeAgreement changed:", shouldShakeAgreement);
    console.log("isPaymentDisabled:", isPaymentDisabled);
    console.log(
      "effectiveSelectedMatchingType:",
      effectiveSelectedMatchingType,
    );
    console.log("isAgreedSameDayPay:", isAgreedSameDayPay);
  }, [
    shouldShakeAgreement,
    isPaymentDisabled,
    effectiveSelectedMatchingType,
    isAgreedSameDayPay,
  ]);

  return (
    <div className="safe-area-top safe-area-bottom relative flex h-screen w-full flex-col">
      <div className="flex-shrink-0 bg-white px-6">
        <NavigationHeader
          title="매칭 결과"
          className="mb-7"
          onBack={handleBackToJobPosting}
        />
        <StepIndicator currentStep={2} totalSteps={3} />
      </div>
      <div className="flex flex-1 flex-col overflow-y-auto">
        {effectiveSelectedMatchingType === "smart" && (
          <div className="bg-gray-100">
            <div className="pt-7.5 bg-white px-6 pb-4">
              <div className="mb-3">
                <p className="text-[1.375rem] font-bold text-neutral-600">
                  <span className="text-blue-600">최적의 근로자</span>를
                  찾아드릴게요
                </p>
                <p className="mt-2 text-xs text-gray-400">
                  요청 사항에 맞는 최적의 근로자로 자동 배정됩니다
                </p>
              </div>
              {effectiveJobPosts.length > 0 ? (
                <>
                  {effectiveJobPosts.map((jp) => (
                    <JobPostCard
                      key={jp.id}
                      variant="matching"
                      activeCategory={jp.activeCategory}
                      selectedDemolitionWork={jp.selectedDemolitionWork}
                      selectedJobTypes={jp.selectedJobTypes}
                      selectedEquipment={jp.selectedEquipment}
                      workStartTime={jp.workStartTime}
                      workEndTime={jp.workEndTime}
                      workMonth={jp.workMonth}
                      workDay={jp.workDay}
                      selectedPersonCount={jp.selectedPersonCount}
                    />
                  ))}
                </>
              ) : (
                <JobPostCard
                  variant="matching"
                  activeCategory={sourceActiveCategory}
                  selectedDemolitionWork={sourceSelectedDemolitionWork}
                  selectedJobTypes={sourceSelectedJobTypes}
                  selectedEquipment={sourceSelectedEquipment}
                  workStartTime={sourceWorkStartTime}
                  workEndTime={sourceWorkEndTime}
                  workMonth={sourceWorkMonth}
                  workDay={sourceWorkDay}
                  selectedPersonCount={sourceSelectedPersonCount}
                />
              )}
            </div>

            <div className="mt-2 bg-white px-6 py-5 pb-10">
              <p className="text-[1.375rem] font-bold text-neutral-600">
                결제 금액을 확인 해주세요
              </p>
              <div className="mt-4 flex flex-col gap-3.5 px-2.5 text-base text-zinc-700">
                <div className="flex items-center justify-between">
                  <p className="flex flex-col text-base font-normal">
                    인건비
                    <span className="text-xs text-gray-400">
                      근로자에게 현장에서 당일 지급
                    </span>
                  </p>
                  <p>{combinedTotalAmount.toLocaleString()}원</p>
                </div>
                <div className="flex items-center justify-between">
                  <p>매칭 수수료</p>
                  <p>+0원</p>
                </div>
                <div className="flex items-center justify-between">
                  <p>앱 런칭 수수료 할인</p>
                  <p className="text-blue-600">-5,000원</p>
                </div>
                <div className="h-[0.5px] w-full bg-neutral-400" />
                <div className="flex items-center justify-between font-bold">
                  <p className="">결제 예정 금액</p>
                  <p className="text-blue-600">
                    {combinedTotalAmount.toLocaleString()}원
                  </p>
                </div>
                <div
                  className={`mt-2 flex items-center gap-2 ${
                    shouldShakeAgreement ? "animate-shake-vertical" : ""
                  }`}
                >
                  <CheckBox
                    theme="secondary"
                    checked={isAgreedSameDayPay}
                    size="sm"
                    onChange={setIsAgreedSameDayPay}
                  />
                  <p
                    className={`text-xs font-medium transition-colors duration-300 ${
                      shouldShakeAgreement ? "text-red-600" : "text-neutral-600"
                    }`}
                  >
                    [필수] 인건비는 당일에 현장에서 직접 지급해야합니다
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {effectiveSelectedMatchingType === "direct" && (
          <div className="flex flex-1 flex-col p-6 pb-14">
            {/* 인력 리스트가 비어있는 경우 */}
            {isEmpty ? (
              <>
                {/* 중앙 콘텐츠 */}
                <div className="flex flex-1 flex-col items-center justify-center">
                  <SadIcon className="mb-4" />
                  <div className="text-center">
                    <p className="font-bold text-neutral-600">
                      리스트가 비었여요
                      <br />
                      지금은 스마트 매칭을 이용해주세요
                    </p>
                  </div>
                </div>
                {/* 하단 고정 버튼 */}
                <div className="flex-shrink-0">
                  <button
                    onClick={handleBackToJobPosting}
                    className="w-full rounded-xl bg-blue-600 py-3 font-bold text-white"
                  >
                    돌아가기
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* 인력특공대 추천 Pick! 섹션 */}
                <div className="mb-8">
                  <p className="mb-4 text-2xl font-bold text-neutral-700">
                    인력특공대<span className="text-blue-600"> 추천 Pick!</span>
                  </p>
                  <div className="space-y-4">
                    {recommendedWorkers.length > 0 &&
                      recommendedWorkers.map((worker) => (
                        <WorkerCard
                          key={worker.id}
                          worker={worker}
                          isSelected={selectedWorkers.includes(worker.id)}
                          onSelect={handleWorkerSelect}
                          onViewDetails={(workerId) => {
                            console.log("View details for worker:", workerId);
                          }}
                        />
                      ))}
                  </div>
                </div>

                {/* 인력 리스트 섹션 */}
                <div className="mb-8">
                  <h2 className="mb-4 text-xl font-bold text-neutral-700">
                    인력 리스트
                  </h2>
                  <div className="space-y-4">
                    {regularWorkers.length > 0 &&
                      regularWorkers.map((worker) => (
                        <WorkerCard
                          key={worker.id}
                          worker={worker}
                          isSelected={selectedWorkers.includes(worker.id)}
                          onSelect={handleWorkerSelect}
                          onViewDetails={(workerId) => {
                            console.log("View details for worker:", workerId);
                          }}
                        />
                      ))}
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* 고정 하단 버튼 - 직접 매칭에서 인력이 있을 때만 표시 */}
      {!(effectiveSelectedMatchingType === "direct" && isEmpty) && (
        <button
          onClick={handlePaymentClick}
          className={`absolute bottom-14 left-6 right-6 rounded-xl py-3 font-bold shadow-lg transition-all duration-150 ${
            effectiveSelectedMatchingType === "smart"
              ? isPaymentDisabled
                ? "cursor-not-allowed border border-neutral-200 bg-zinc-100 text-gray-500"
                : "bg-blue-600 text-white hover:bg-blue-700"
              : isSelectionComplete
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "cursor-not-allowed border border-neutral-200 bg-zinc-100 text-gray-500"
          }`}
        >
          {effectiveSelectedMatchingType === "smart"
            ? "결제하기"
            : `${sourceSelectedPersonCount}명 중 ${selectedWorkers.length}명 선택완료`}
        </button>
      )}
    </div>
  );
};

const MatchingResultsPage: React.FC<Props> = () => {
  return <MatchingResultsPageContent />;
};

export default MatchingResultsPage;
