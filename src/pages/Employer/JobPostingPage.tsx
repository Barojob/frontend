import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CategoryTabs from "../../components/JobPost/CategoryTabs";
import MultiSelector from "../../components/JobPost/MultiSelector";
import PersonCountSelector from "../../components/JobPost/PersonCountSelector";
import SelectedTab from "../../components/JobPost/SelectedTab";
import WorkTimeSelector from "../../components/JobPost/WorkTimeSelector";
import NavigationHeader from "../../components/NavigationHeader/NavigationHeader";
import StepIndicator from "../../components/StepIndicator";
import { labelMappings } from "../../utils/labelMappings";
type Props = {
  className?: string;
};

const JobPostingPage: React.FC<Props> = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("general");
  const [selectedDemolitionWork, setSelectedDemolitionWork] = useState<
    string[]
  >([]);
  const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>([]);
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([]);
  const [selectedExperience, setSelectedExperience] = useState<string[]>([]);
  const [workStartTime, setWorkStartTime] = useState("");
  const [workEndTime, setWorkEndTime] = useState("");
  const [selectedPersonCount, setSelectedPersonCount] = useState(1);
  const [isPersonCountSelected, setIsPersonCountSelected] = useState(false);

  const handleJobTypeToggle = (jobTypeId: string) => {
    setSelectedJobTypes((prev) =>
      prev.includes(jobTypeId)
        ? prev.filter((id) => id !== jobTypeId)
        : [...prev, jobTypeId],
    );
  };

  const handleDemolitionWorkToggle = (demolitionWorkId: string) => {
    setSelectedDemolitionWork((prev) =>
      prev.includes(demolitionWorkId)
        ? prev.filter((id) => id !== demolitionWorkId)
        : [...prev, demolitionWorkId],
    );
  };

  const handleEquipmentToggle = (equipmentId: string) => {
    setSelectedEquipment((prev) =>
      prev.includes(equipmentId)
        ? prev.filter((id) => id !== equipmentId)
        : [...prev, equipmentId],
    );
  };

  const handleExperienceToggle = (experienceId: string) => {
    setSelectedExperience((prev) =>
      prev.includes(experienceId)
        ? prev.filter((id) => id !== experienceId)
        : [...prev, experienceId],
    );
  };

  const handleWorkTimeChange = (startTime: string, endTime: string) => {
    setWorkStartTime(startTime);
    setWorkEndTime(endTime);
  };

  const handlePersonCountChange = (count: number) => {
    setSelectedPersonCount(count);
    setIsPersonCountSelected(true);
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setSelectedJobTypes([]);
    setSelectedDemolitionWork([]);
    setSelectedEquipment([]);
    setSelectedExperience([]);
    setWorkStartTime("");
    setWorkEndTime("");
    setSelectedPersonCount(1);
    setIsPersonCountSelected(false);
  };

  const getCategoryLabel = (categoryId: string) => {
    return categoryId === "general" ? "보통 인부" : "기능공";
  };

  // 라벨 매핑을 사용한 헬퍼 함수들
  const getSelectedDemolitionWorkLabels = () => {
    return selectedDemolitionWork
      .map(
        (id) =>
          labelMappings.demolitionWork[
            id as keyof typeof labelMappings.demolitionWork
          ],
      )
      .join(", ");
  };

  const getSelectedEquipmentLabels = () => {
    return selectedEquipment
      .map(
        (id) =>
          labelMappings.equipment[id as keyof typeof labelMappings.equipment],
      )
      .join(", ");
  };

  const getSelectedExperienceLabels = () => {
    return selectedExperience
      .map(
        (id) =>
          labelMappings.experience[id as keyof typeof labelMappings.experience],
      )
      .join(", ");
  };

  const getWorkTimeLabel = () => {
    if (workStartTime && workEndTime) {
      // 시간 포맷 변경: "09:00" -> "09시"
      const formatTime = (time: string) => {
        const [hour] = time.split(":");
        return `${parseInt(hour)}시`;
      };
      return `${formatTime(workStartTime)} ~ ${formatTime(workEndTime)}`;
    }
    return "";
  };

  const getPersonCountLabel = () => {
    return `${selectedPersonCount}명`;
  };

  // 예상 금액 계산
  const calculateEstimatedCost = () => {
    if (!isPersonCountSelected) return { min: 0, max: 0 };

    // 기본 인건비
    let baseCost = 140700;

    // 세부업무 수당
    if (selectedDemolitionWork.length > 0) {
      baseCost += 3000;
    }

    // 장비 수당
    if (selectedEquipment.length > 0) {
      baseCost += 100000;
    }

    // 경력 수당
    if (selectedExperience.length > 0) {
      baseCost += 5000;
    }

    // 인원수 적용
    const totalCost = baseCost * selectedPersonCount;

    // 최소/최대 범위 (±10%)
    const minCost = Math.floor(totalCost * 0.9);
    const maxCost = Math.floor(totalCost * 1.1);

    return { min: minCost, max: maxCost };
  };

  return (
    <>
      <div className="flex min-h-screen w-full flex-col justify-start bg-gray-200">
        <div className="bg-white px-6">
          <NavigationHeader
            title="인력 구하기"
            className="mb-7"
            onBack={() => {
              navigate("/location-selector");
            }}
          />
          <StepIndicator currentStep={1} totalSteps={3} />
        </div>

        {/* 상단: 선택 완료된 내용들 표시 영역 */}
        {(selectedJobTypes.length > 0 ||
          selectedDemolitionWork.length > 0 ||
          selectedEquipment.length > 0 ||
          selectedExperience.length > 0 ||
          (workStartTime && workEndTime) ||
          isPersonCountSelected) && (
          <div className="bg-white px-6 py-2">
            {selectedJobTypes.length > 0 && (
              <>
                <SelectedTab
                  title="업무"
                  priceTitle="인건비 평균 금액 측정"
                  selectedContent={getCategoryLabel(activeCategory)}
                  amount={140700}
                  className="py-4"
                  onClick={() => {
                    setSelectedJobTypes([]);
                    setSelectedDemolitionWork([]);
                    setSelectedEquipment([]);
                    setSelectedExperience([]);
                    setWorkStartTime("");
                    setWorkEndTime("");
                    setSelectedPersonCount(1);
                    setIsPersonCountSelected(false);
                  }}
                />
                {selectedDemolitionWork.length > 0 && (
                  <div className="h-px bg-gray-200"></div>
                )}
              </>
            )}

            {selectedDemolitionWork.length > 0 && (
              <>
                <SelectedTab
                  title="세부업무"
                  priceTitle="업무 수당"
                  selectedContent={getSelectedDemolitionWorkLabels()}
                  amount={3000}
                  className="py-4"
                  onClick={() => {
                    setSelectedDemolitionWork([]);
                    setSelectedEquipment([]);
                    setSelectedExperience([]);
                    setWorkStartTime("");
                    setWorkEndTime("");
                    setSelectedPersonCount(1);
                    setIsPersonCountSelected(false);
                  }}
                />
                {selectedEquipment.length > 0 && (
                  <div className="h-px bg-gray-200"></div>
                )}
              </>
            )}

            {selectedEquipment.length > 0 && (
              <>
                <SelectedTab
                  title="필요장비"
                  priceTitle="장비 경력 수당"
                  selectedContent={getSelectedEquipmentLabels()}
                  amount={100000}
                  className="py-4"
                  onClick={() => {
                    setSelectedEquipment([]);
                    setSelectedExperience([]);
                    setWorkStartTime("");
                    setWorkEndTime("");
                    setSelectedPersonCount(1);
                    setIsPersonCountSelected(false);
                  }}
                />
                {selectedExperience.length > 0 && (
                  <div className="h-px bg-gray-200"></div>
                )}
              </>
            )}

            {selectedExperience.length > 0 && (
              <>
                <SelectedTab
                  title="최소경력"
                  priceTitle="경력 수당"
                  selectedContent={getSelectedExperienceLabels()}
                  amount={5000}
                  className="py-4"
                  onClick={() => {
                    setSelectedExperience([]);
                    setWorkStartTime("");
                    setWorkEndTime("");
                    setSelectedPersonCount(1);
                    setIsPersonCountSelected(false);
                  }}
                />
                {workStartTime && workEndTime && (
                  <div className="h-px bg-gray-200"></div>
                )}
              </>
            )}

            {workStartTime && workEndTime && (
              <>
                <SelectedTab
                  title="근무시간"
                  selectedContent={getWorkTimeLabel()}
                  className="py-4"
                  onClick={() => {
                    setWorkStartTime("");
                    setWorkEndTime("");
                    setSelectedPersonCount(1);
                    setIsPersonCountSelected(false);
                  }}
                />
                {isPersonCountSelected && (
                  <div className="h-px bg-gray-200"></div>
                )}
              </>
            )}

            {isPersonCountSelected && (
              <SelectedTab
                title="근무인원"
                selectedContent={getPersonCountLabel()}
                className="py-4"
                onClick={() => {
                  setIsPersonCountSelected(false);
                }}
              />
            )}
          </div>
        )}

        {/* 하단: 선택 영역 */}
        <div
          className={`flex flex-1 flex-col bg-white px-6 py-4 ${
            selectedJobTypes.length > 0 ||
            selectedDemolitionWork.length > 0 ||
            selectedEquipment.length > 0 ||
            selectedExperience.length > 0 ||
            (workStartTime && workEndTime) ||
            isPersonCountSelected
              ? "mt-2"
              : ""
          } ${isPersonCountSelected ? "pb-20" : ""}`}
        >
          {/* 선택 컨텐츠 영역 */}
          <div className="flex-1">
            {/* 1단계: 세부 업무 선택 (어떤 사람?) */}
            {selectedJobTypes.length === 0 && (
              <>
                <div className="mb-4 mt-2 text-2xl font-bold text-neutral-600">
                  <span className="text-blue-600">어떤 사람</span>이
                  필요하신가요?
                </div>

                <CategoryTabs
                  activeCategory={activeCategory}
                  onCategoryChange={handleCategoryChange}
                  className="mb-6"
                />

                <MultiSelector
                  selectedItems={selectedJobTypes}
                  onItemToggle={handleJobTypeToggle}
                  type="jobType"
                  category={activeCategory}
                  className="mb-8"
                />
              </>
            )}

            {/* 2단계: 세부 업무 선택 */}
            {selectedJobTypes.length > 0 &&
              selectedDemolitionWork.length === 0 && (
                <>
                  <div className="mb-4 text-2xl font-bold text-neutral-600">
                    <span className="text-blue-600">세부 업무</span>를
                    선택해주세요
                  </div>
                  <MultiSelector
                    selectedItems={selectedDemolitionWork}
                    onItemToggle={handleDemolitionWorkToggle}
                    type="demolitionWork"
                    className="mb-8"
                  />
                </>
              )}

            {/* 3단계: 장비 선택 */}
            {selectedDemolitionWork.length > 0 &&
              selectedEquipment.length === 0 && (
                <>
                  <div className="mb-4 text-2xl font-bold text-neutral-600">
                    <span className="text-blue-600">필요하신 장비</span>를
                    선택해주세요
                  </div>
                  <MultiSelector
                    selectedItems={selectedEquipment}
                    onItemToggle={handleEquipmentToggle}
                    type="equipment"
                    className="mb-8"
                  />
                </>
              )}

            {/* 4단계: 경력 선택 */}
            {selectedEquipment.length > 0 &&
              selectedExperience.length === 0 && (
                <>
                  <div className="mb-4 text-2xl font-bold text-neutral-600">
                    <span className="text-blue-600">최소 경력</span>을
                    선택해주세요
                  </div>
                  <MultiSelector
                    selectedItems={selectedExperience}
                    onItemToggle={handleExperienceToggle}
                    type="experience"
                    className="mb-8"
                  />
                </>
              )}

            {/* 5단계: 업무 시간 선택 */}
            {selectedExperience.length > 0 &&
              (!workStartTime || !workEndTime) && (
                <>
                  <div className="mb-4 text-2xl font-bold text-neutral-600">
                    <span className="text-blue-600">업무 시간</span>을
                    선택해주세요
                  </div>
                  <WorkTimeSelector
                    startTime={workStartTime}
                    endTime={workEndTime}
                    onTimeChange={handleWorkTimeChange}
                    className="mb-8"
                  />
                </>
              )}

            {/* 6단계: 인원 선택 */}
            {workStartTime && workEndTime && !isPersonCountSelected && (
              <>
                <div className="mb-4 text-2xl font-bold text-neutral-600">
                  <span className="text-blue-600">인원</span>을 선택해주세요
                </div>
                <div className="mb-8">
                  <PersonCountSelector
                    personCount={selectedPersonCount}
                    onPersonCountChange={handlePersonCountChange}
                    className="justify-center"
                  />
                </div>
              </>
            )}

            {/* 예상 금액 표시 */}
            {isPersonCountSelected && (
              <div>
                <div className="text-2xl font-bold text-neutral-600">
                  예상 금액
                </div>
                <div className="mt-3">
                  <div className="rounded-lg bg-gray-100 px-4 py-3 text-center">
                    <div className="text-lg font-bold text-neutral-600">
                      최소{" "}
                      <span className="text-red-400">
                        {calculateEstimatedCost().min.toLocaleString()}원
                      </span>{" "}
                      - 최대{" "}
                      <span className="text-indigo-600">
                        {calculateEstimatedCost().max.toLocaleString()}원
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 하단 고정 버튼 */}
        {isPersonCountSelected && (
          <div className="fixed bottom-0 left-0 right-0 bg-white px-6 py-4 shadow-lg">
            <button className="w-full rounded-xl bg-blue-600 py-3 text-lg font-bold text-white">
              설정완료
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default JobPostingPage;
