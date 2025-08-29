import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddJobPostCard from "../../components/JobPost/AddJobPostCard";
import DemolitionWorkStep from "../../components/JobPost/DemolitionWorkStep";
import EquipmentStep from "../../components/JobPost/EquipmentStep";
// import EstimatedCostDisplay from "../../components/JobPost/EstimatedCostDisplay";
import CompleteBar from "../../components/JobPost/CompleteBar";
// ExperienceStep 비활성화
import JobPostCard from "../../components/JobPost/JobPostCard";
import JobTypeStep from "../../components/JobPost/JobTypeStep";
import PersonCountStep from "../../components/JobPost/PersonCountStep";
import SelectedItemsDisplay from "../../components/JobPost/SelectedItemsDisplay";
import SpecialNoteStep from "../../components/JobPost/SpecialNoteStep";
import WorkTimeStep from "../../components/JobPost/WorkTimeStep";
import NavigationHeader from "../../components/NavigationHeader";
import StepIndicator from "../../components/StepIndicator";
import { useJobPosting } from "../../hooks/useJobPosting";

type Props = {
  className?: string;
};

const JobPostingPage: React.FC<Props> = () => {
  const navigate = useNavigate();
  const {
    // 상태
    activeCategory,
    selectedDemolitionWork,
    selectedJobTypes,
    selectedEquipment,
    selectedExperience,
    workStartTime,
    workEndTime,
    workMonth,
    workDay,
    selectedPersonCount,
    // specialNote,
    isJobTypeCompleted,
    isDemolitionWorkCompleted,
    isEquipmentCompleted,
    isExperienceCompleted,
    isWorkTimeCompleted,
    isPersonCountCompleted,
    // isSpecialNoteOpen,
    isEditing,
    jobPosts,

    // 핸들러
    handleJobTypeToggle,
    handleDemolitionWorkToggle,
    handleEquipmentToggle,
    // handleExperienceToggle,
    handleWorkTimeChange,
    handleWorkDateChange,
    handlePersonCountChange,
    handleCategoryChange,
    handleJobTypeConfirm,
    handleDemolitionWorkConfirm,
    handleEquipmentConfirm,
    // handleExperienceConfirm,
    handleWorkTimeConfirm,
    handlePersonCountConfirm,
    // setSpecialNote,
    // setIsSpecialNoteOpen,

    // 편집 핸들러
    handleJobTypeEdit,
    handleDemolitionWorkEdit,
    handleEquipmentEdit,
    handleExperienceEdit,
    handleWorkTimeEdit,
    handlePersonCountEdit,

    // 편집 후 자동 완료 핸들러
    handleJobTypeConfirmAfterEdit,
    handleDemolitionWorkConfirmAfterEdit,
    handleEquipmentConfirmAfterEdit,
    // handleExperienceConfirmAfterEdit,
    handleWorkTimeConfirmAfterEdit,
    handlePersonCountConfirmAfterEdit,

    // 구인 게시물 핸들러
    handleComplete,
    handleDeleteJobPost,
    handleEditJobPost,
    handleAddNewJobPost,

    // 계산 함수 (현재 미사용)
  } = useJobPosting();

  // const estimatedCost = calculateEstimatedCost();

  // 상단 선택 탭 클릭 시, 하단에서 해당 섹션 펼치기 관리
  const [expandedSection, setExpandedSection] = useState<
    | "jobType"
    | "demolitionWork"
    | "equipment"
    | "experience"
    | "workTime"
    | "personCount"
    | "specialNote"
    | null
  >(null);

  // 섹션 위치 스크롤을 위한 참조
  const jobTypeRef = useRef<HTMLDivElement | null>(null);
  const demolitionRef = useRef<HTMLDivElement | null>(null);
  const equipmentRef = useRef<HTMLDivElement | null>(null);
  const experienceRef = useRef<HTMLDivElement | null>(null);
  const workTimeRef = useRef<HTMLDivElement | null>(null);
  const personCountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!expandedSection) return;
    const sectionToElement: Record<string, HTMLDivElement | null> = {
      jobType: jobTypeRef.current,
      demolitionWork: demolitionRef.current,
      equipment: equipmentRef.current,
      experience: experienceRef.current,
      workTime: workTimeRef.current,
      personCount: personCountRef.current,
    } as const;

    const el = sectionToElement[expandedSection];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [expandedSection]);

  // 카드 화면이 표시되어야 하는지 확인
  const shouldShowCards = jobPosts.length > 0;
  const hasAnyCompleted =
    isJobTypeCompleted ||
    isDemolitionWorkCompleted ||
    isEquipmentCompleted ||
    isWorkTimeCompleted ||
    isPersonCountCompleted;

  // 다음 미완료 스텝 계산
  type SectionKey =
    | "jobType"
    | "demolitionWork"
    | "equipment"
    | "workTime"
    | "personCount"
    | "specialNote";

  const getNextIncompleteSection = (
    overrides?: Partial<{
      isJobTypeCompleted: boolean;
      isDemolitionWorkCompleted: boolean;
      isEquipmentCompleted: boolean;
      isWorkTimeCompleted: boolean;
      isPersonCountCompleted: boolean;
    }>,
  ): SectionKey | null => {
    const flags = {
      isJobTypeCompleted,
      isDemolitionWorkCompleted,
      isEquipmentCompleted,
      isWorkTimeCompleted,
      isPersonCountCompleted,
      ...overrides,
    };

    const order: Array<{ key: SectionKey; done: boolean }> = [
      { key: "jobType", done: flags.isJobTypeCompleted },
      { key: "demolitionWork", done: flags.isDemolitionWorkCompleted },
      { key: "equipment", done: flags.isEquipmentCompleted },
      { key: "workTime", done: flags.isWorkTimeCompleted },
      { key: "personCount", done: flags.isPersonCountCompleted },
      { key: "specialNote", done: true },
    ];

    for (const item of order) {
      if (!item.done) return item.key;
    }
    return null;
  };

  // 5개 스텝이 모두 완료되었을 때 자동으로 작업 특이사항 열기
  useEffect(() => {
    if (
      isJobTypeCompleted &&
      isDemolitionWorkCompleted &&
      isEquipmentCompleted &&
      isWorkTimeCompleted &&
      isPersonCountCompleted &&
      expandedSection === null
    ) {
      setExpandedSection("specialNote");
    }
  }, [
    isJobTypeCompleted,
    isDemolitionWorkCompleted,
    isEquipmentCompleted,
    isWorkTimeCompleted,
    isPersonCountCompleted,
    expandedSection,
  ]);

  return (
    <>
      <div className="flex min-h-screen w-full flex-col justify-start overflow-y-auto bg-white">
        <div className="bg-white px-6 pt-12">
          <NavigationHeader
            title="인력 구하기"
            className="mb-7"
            onBack={() => {
              navigate("/job-post-location");
            }}
          />
          <StepIndicator currentStep={1} totalSteps={3} />
        </div>

        {shouldShowCards ? (
          // 카드 화면
          <div className="flex-1 px-6 py-9 pb-32">
            {/* 기존 구인 게시물 카드들 */}
            {jobPosts.map((jobPost) => (
              <JobPostCard
                key={jobPost.id}
                activeCategory={jobPost.activeCategory}
                selectedDemolitionWork={jobPost.selectedDemolitionWork}
                selectedEquipment={jobPost.selectedEquipment}
                selectedExperience={jobPost.selectedExperience}
                workStartTime={jobPost.workStartTime}
                workEndTime={jobPost.workEndTime}
                selectedPersonCount={jobPost.selectedPersonCount}
                estimatedCost={jobPost.estimatedCost}
                onEdit={() => handleEditJobPost(jobPost)}
                onDelete={() => handleDeleteJobPost(jobPost.id)}
              />
            ))}

            {/* 새로운 구인 게시물 추가 카드 */}
            <AddJobPostCard onClick={handleAddNewJobPost} />
          </div>
        ) : (
          // 기존 선택 화면
          <>
            {/* 상단: 선택 완료된 내용들 표시 영역 */}
            <SelectedItemsDisplay
              activeCategory={activeCategory}
              selectedDemolitionWork={selectedDemolitionWork}
              selectedEquipment={selectedEquipment}
              selectedExperience={selectedExperience}
              workStartTime={workStartTime}
              workEndTime={workEndTime}
              workMonth={workMonth}
              workDay={workDay}
              selectedPersonCount={selectedPersonCount}
              isJobTypeCompleted={isJobTypeCompleted}
              isDemolitionWorkCompleted={isDemolitionWorkCompleted}
              isEquipmentCompleted={isEquipmentCompleted}
              isExperienceCompleted={isExperienceCompleted}
              isWorkTimeCompleted={isWorkTimeCompleted}
              isPersonCountCompleted={isPersonCountCompleted}
              onJobTypeEdit={handleJobTypeEdit}
              onDemolitionWorkEdit={handleDemolitionWorkEdit}
              onEquipmentEdit={handleEquipmentEdit}
              onExperienceEdit={handleExperienceEdit}
              onWorkTimeEdit={handleWorkTimeEdit}
              onPersonCountEdit={handlePersonCountEdit}
              expandedSection={expandedSection}
              renderJobTypeEditor={
                (!isJobTypeCompleted || expandedSection === "jobType") && (
                  <JobTypeStep
                    activeCategory={activeCategory}
                    selectedJobTypes={selectedJobTypes}
                    onCategoryChange={handleCategoryChange}
                    onJobTypeToggle={handleJobTypeToggle}
                    onConfirm={() => {
                      if (isEditing) {
                        handleJobTypeConfirmAfterEdit();
                      } else {
                        handleJobTypeConfirm();
                      }
                      const next = getNextIncompleteSection({
                        isJobTypeCompleted: true,
                      });
                      setExpandedSection(next);
                    }}
                  />
                )
              }
              renderDemolitionEditor={
                isJobTypeCompleted &&
                (!isDemolitionWorkCompleted ||
                  expandedSection === "demolitionWork") && (
                  <DemolitionWorkStep
                    selectedDemolitionWork={selectedDemolitionWork}
                    onDemolitionWorkToggle={handleDemolitionWorkToggle}
                    onConfirm={() => {
                      if (isEditing) {
                        handleDemolitionWorkConfirmAfterEdit();
                      } else {
                        handleDemolitionWorkConfirm();
                      }
                      const next = getNextIncompleteSection({
                        isDemolitionWorkCompleted: true,
                      });
                      setExpandedSection(next);
                    }}
                    selectedJobTypes={selectedJobTypes}
                  />
                )
              }
              renderEquipmentEditor={
                isJobTypeCompleted &&
                isDemolitionWorkCompleted &&
                (!isEquipmentCompleted || expandedSection === "equipment") && (
                  <EquipmentStep
                    selectedEquipment={selectedEquipment}
                    onEquipmentToggle={handleEquipmentToggle}
                    onConfirm={() => {
                      if (isEditing) {
                        handleEquipmentConfirmAfterEdit();
                      } else {
                        handleEquipmentConfirm();
                      }
                      const next = getNextIncompleteSection({
                        isEquipmentCompleted: true,
                      });
                      setExpandedSection(next);
                    }}
                  />
                )
              }
              renderExperienceEditor={null}
              renderWorkTimeEditor={
                isJobTypeCompleted &&
                isDemolitionWorkCompleted &&
                isEquipmentCompleted &&
                (!isWorkTimeCompleted || expandedSection === "workTime") && (
                  <WorkTimeStep
                    workStartTime={workStartTime}
                    workEndTime={workEndTime}
                    onTimeChange={handleWorkTimeChange}
                    month={workMonth}
                    day={workDay}
                    onDateChange={handleWorkDateChange}
                    onConfirm={() => {
                      if (isEditing) {
                        handleWorkTimeConfirmAfterEdit();
                      } else {
                        handleWorkTimeConfirm();
                      }
                      const next = getNextIncompleteSection({
                        isWorkTimeCompleted: true,
                      });
                      setExpandedSection(next);
                    }}
                  />
                )
              }
              renderPersonCountEditor={
                isJobTypeCompleted &&
                isDemolitionWorkCompleted &&
                isEquipmentCompleted &&
                isWorkTimeCompleted &&
                (!isPersonCountCompleted ||
                  expandedSection === "personCount") && (
                  <PersonCountStep
                    selectedPersonCount={selectedPersonCount}
                    onPersonCountChange={handlePersonCountChange}
                    onConfirm={() => {
                      if (isEditing) {
                        handlePersonCountConfirmAfterEdit();
                      } else {
                        handlePersonCountConfirm();
                      }
                      setExpandedSection("specialNote");
                    }}
                  />
                )
              }
              onJobTypeTabClick={() => setExpandedSection("jobType")}
              onDemolitionWorkTabClick={() =>
                setExpandedSection("demolitionWork")
              }
              onEquipmentTabClick={() => setExpandedSection("equipment")}
              onExperienceTabClick={() => setExpandedSection("experience")}
              onWorkTimeTabClick={() => setExpandedSection("workTime")}
              onPersonCountTabClick={() => setExpandedSection("personCount")}
            />

            {/* 특이사항 단계: 근무 인원 완료 후 별도로 렌더링 */}
            {expandedSection === "specialNote" && (
              <div className="bg-white px-6 py-4">
                <SpecialNoteStep
                  initialNote={""}
                  onChange={() => {}}
                  onConfirm={() => {
                    setExpandedSection(null);
                  }}
                />
              </div>
            )}

            {/* 하단: 선택 영역 */}
            <div
              className={`flex flex-1 flex-col px-6 py-4 ${
                isJobTypeCompleted ||
                isDemolitionWorkCompleted ||
                isEquipmentCompleted ||
                isExperienceCompleted ||
                isWorkTimeCompleted ||
                isPersonCountCompleted
                  ? "mt-2"
                  : ""
              } ${isPersonCountCompleted ? "pb-20" : ""}`}
            >
              {/* 선택 컨텐츠 영역: 초기 상태에는 1단계 폴백 렌더링 */}
              <div className="flex-1">
                {!hasAnyCompleted && (
                  <JobTypeStep
                    activeCategory={activeCategory}
                    selectedJobTypes={selectedJobTypes}
                    onCategoryChange={handleCategoryChange}
                    onJobTypeToggle={handleJobTypeToggle}
                    onConfirm={() => {
                      if (isEditing) {
                        handleJobTypeConfirmAfterEdit();
                      } else {
                        handleJobTypeConfirm();
                      }
                      setExpandedSection("demolitionWork");
                    }}
                  />
                )}
              </div>
            </div>

            {/* 하단 완료 바: 작업 특이사항 단계일 때만 표시 */}
            {expandedSection === "specialNote" && (
              <CompleteBar onClick={handleComplete} />
            )}
          </>
        )}

        {/* 카드 화면 하단 고정 버튼들 */}
        {shouldShowCards && (
          <div className="fixed bottom-0 left-0 right-0 bg-white px-6 py-8 shadow-lg">
            <div className="flex gap-3">
              <button className="w-full rounded-xl bg-gray-100 py-3 font-medium text-gray-700">
                직접 고르기
              </button>
              <button className="w-full rounded-xl bg-gray-100 py-3 font-medium text-gray-700">
                자동 매칭
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default JobPostingPage;
