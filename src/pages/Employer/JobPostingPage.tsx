import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import CompleteBar from "../../components/JobPost/CompleteBar";
import DemolitionWorkStep from "../../components/JobPost/DemolitionWorkStep";
import EquipmentStep from "../../components/JobPost/EquipmentStep";
import JobPostCard from "../../components/JobPost/JobPostCard";
import JobTypeStep from "../../components/JobPost/JobTypeStep";
import MatchingCard from "../../components/JobPost/MatchingCard";
import PersonCountStep from "../../components/JobPost/PersonCountStep";
import SelectedItemsDisplay from "../../components/JobPost/SelectedItemsDisplay";
import SpecialNoteStep from "../../components/JobPost/SpecialNoteStep";
import WorkTimeStep from "../../components/JobPost/WorkTimeStep";
import Modal from "../../components/Modal";
import NavigationHeader from "../../components/NavigationHeader";
import PresenceTransition from "../../components/PresenceTransition";
import StepIndicator from "../../components/StepIndicator";
import { useKeyboardOpen } from "../../hooks/useKeyboardHandler";
import { useJobPosting } from "../../providers/JobPostingProvider";

type Props = {
  className?: string;
};

const JobPostingPage: React.FC<Props> = () => {
  const navigate = useNavigate();
  const {
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
    isJobTypeCompleted,
    isDemolitionWorkCompleted,
    isEquipmentCompleted,
    isExperienceCompleted,
    isWorkTimeCompleted,
    isPersonCountCompleted,
    isEditing,
    isAddingNewJob,
    jobPosts,
    selectedMatchingType,
    handleMatchingTypeSelect,

    // 핸들러
    handleJobTypeToggle,
    handleDemolitionWorkToggle,
    handleEquipmentToggle,
    handleWorkTimeChange,
    handleWorkDateChange,
    handlePersonCountChange,
    handleCategoryChange,
    handleJobTypeConfirm,
    handleDemolitionWorkConfirm,
    handleEquipmentConfirm,
    handleWorkTimeConfirm,
    handlePersonCountConfirm,

    handleJobTypeEdit,
    handleDemolitionWorkEdit,
    handleEquipmentEdit,
    handleExperienceEdit,
    handleWorkTimeEdit,
    handlePersonCountEdit,

    handleJobTypeConfirmAfterEdit,
    handleDemolitionWorkConfirmAfterEdit,
    handleEquipmentConfirmAfterEdit,
    handleWorkTimeConfirmAfterEdit,
    handlePersonCountConfirmAfterEdit,

    handleComplete,
    handleDeleteJobPost,
    handleEditJobPost,
    handleAddNewJobPost,
    expandedSection,
    setExpandedSection,
    handleCancelEditOrAdd,
  } = useJobPosting();

  const { isKeyboardOpen } = useKeyboardOpen();
  const [isSkilledModalOpen, setIsSkilledModalOpen] = useState(false);

  // 뒤로가기 핸들러
  const handleBackNavigation = () => {
    // 새 업무 추가 중이거나 편집 중일 때는 취소 처리
    if (isAddingNewJob || isEditing) {
      handleCancelEditOrAdd();
      return;
    }

    // 일반적인 경우 지도 페이지로 이동
    navigate("/job-post-location");
  };

  // setExpandedSection을 useRef로 안정화
  const setExpandedSectionRef = useRef(setExpandedSection);

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

  // 카드 화면이 표시되어야 하는지 확인 (업무가 있고 편집/추가 모드가 아닐 때만)
  const shouldShowCards = jobPosts.length > 0 && !isEditing && !isAddingNewJob;
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
      setExpandedSectionRef.current("specialNote");
    }
  }, [
    isJobTypeCompleted,
    isDemolitionWorkCompleted,
    isEquipmentCompleted,
    isWorkTimeCompleted,
    isPersonCountCompleted,
    expandedSection,
  ]);

  const renderJobTypeEditor = () => {
    if (isJobTypeCompleted && expandedSection !== "jobType") return null;

    return (
      <JobTypeStep
        activeCategory={activeCategory}
        selectedJobTypes={selectedJobTypes}
        onCategoryChange={handleCategoryChange}
        onJobTypeToggle={handleJobTypeToggle}
        onOpenSkilledModal={() => setIsSkilledModalOpen(true)}
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
    );
  };

  const renderDemolitionEditor = () => {
    if (!isJobTypeCompleted) return null;
    if (isDemolitionWorkCompleted && expandedSection !== "demolitionWork")
      return null;

    return (
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
    );
  };

  const renderEquipmentEditor = () => {
    if (!isJobTypeCompleted || !isDemolitionWorkCompleted) return null;
    if (isEquipmentCompleted && expandedSection !== "equipment") return null;

    return (
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
    );
  };

  const renderWorkTimeEditor = () => {
    if (
      !isJobTypeCompleted ||
      !isDemolitionWorkCompleted ||
      !isEquipmentCompleted
    )
      return null;
    if (isWorkTimeCompleted && expandedSection !== "workTime") return null;

    return (
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
    );
  };

  const renderPersonCountEditor = () => {
    if (
      !isJobTypeCompleted ||
      !isDemolitionWorkCompleted ||
      !isEquipmentCompleted ||
      !isWorkTimeCompleted
    )
      return null;
    if (isPersonCountCompleted && expandedSection !== "personCount")
      return null;

    return (
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
    );
  };

  const renderCardsView = () => (
    <div className="flex-1 px-6 py-9 pb-32">
      {/* 기존 구인 게시물 카드들 */}
      {jobPosts.map((jobPost, index) => (
        <JobPostCard
          key={jobPost.id}
          activeCategory={jobPost.activeCategory}
          selectedDemolitionWork={jobPost.selectedDemolitionWork}
          selectedJobTypes={jobPost.selectedJobTypes}
          selectedEquipment={jobPost.selectedEquipment}
          workStartTime={jobPost.workStartTime}
          workEndTime={jobPost.workEndTime}
          workMonth={jobPost.workMonth}
          workDay={jobPost.workDay}
          selectedPersonCount={jobPost.selectedPersonCount}
          onEdit={() => {
            console.log("Edit button clicked");
            handleEditJobPost(jobPost);
          }}
          onDelete={() => {
            console.log("Delete button clicked");
            handleDeleteJobPost(jobPost.id);
          }}
          onChangeContent={() => {
            console.log("Change content button clicked");
            handleEditJobPost(jobPost);
          }}
          onAddNewJob={
            index === jobPosts.length - 1
              ? () => {
                  console.log("Add new job button clicked");
                  handleAddNewJobPost();
                }
              : undefined
          }
        />
      ))}

      {/* 매칭 선택 카드들 */}
      <div className="mt-6 pb-10">
        <p className="mb-4 text-[1.375rem] font-bold text-neutral-600">
          매칭 방법을 선택해주세요
        </p>
        <div className="flex flex-col gap-2.5">
          <MatchingCard
            type="smart"
            onClick={() => handleMatchingTypeSelect("smart")}
            isSelected={selectedMatchingType === "smart"}
          />
          <MatchingCard
            type="direct"
            onClick={() => handleMatchingTypeSelect("direct")}
            isSelected={selectedMatchingType === "direct"}
          />
        </div>
      </div>
    </div>
  );

  const renderSelectionView = () => (
    <>
      {/* 상단: 선택 완료된 내용들 표시 영역 */}
      <SelectedItemsDisplay
        activeCategory={activeCategory}
        selectedJobTypes={selectedJobTypes}
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
        renderJobTypeEditor={renderJobTypeEditor()}
        renderDemolitionEditor={renderDemolitionEditor()}
        renderEquipmentEditor={renderEquipmentEditor()}
        renderExperienceEditor={null}
        renderWorkTimeEditor={renderWorkTimeEditor()}
        renderPersonCountEditor={renderPersonCountEditor()}
        onJobTypeTabClick={() => setExpandedSection("jobType")}
        onDemolitionWorkTabClick={() => setExpandedSection("demolitionWork")}
        onEquipmentTabClick={() => setExpandedSection("equipment")}
        onExperienceTabClick={() => setExpandedSection("experience")}
        onWorkTimeTabClick={() => setExpandedSection("workTime")}
        onPersonCountTabClick={() => setExpandedSection("personCount")}
      />

      {/* 특이사항 단계: 근무 인원 완료 후 별도로 렌더링 */}
      {expandedSection === "specialNote" && (
        <PresenceTransition
          transitionKey="specialNote-block"
          variant="subtleRise"
        >
          <div className="bg-white px-6 py-4">
            <SpecialNoteStep
              initialNote={""}
              onChange={() => {}}
              onConfirm={() => {
                setExpandedSection(null);
              }}
            />
          </div>
        </PresenceTransition>
      )}

      {/* 하단: 선택 영역 */}
      <div
        className={`flex flex-1 flex-col px-6 py-4 ${
          hasAnyCompleted ? "mt-2" : ""
        } ${isPersonCountCompleted ? "pb-20" : ""}`}
      >
        {/* 선택 컨텐츠 영역: 초기 상태에는 1단계 폴백 렌더링 */}
        <div className="flex-1">
          {!hasAnyCompleted && renderJobTypeEditor()}
        </div>
      </div>
    </>
  );

  return (
    <>
      <div className="flex h-screen w-full flex-col bg-white">
        {/* 고정 헤더 영역 */}
        <div className="flex-shrink-0 bg-white px-6 pt-12">
          <NavigationHeader
            title="인력 구하기"
            className="mb-7"
            onBack={handleBackNavigation}
          />
          <StepIndicator currentStep={1} totalSteps={3} />
        </div>

        {/* 스크롤 가능한 내용 영역 */}
        <div className="flex-1 overflow-y-auto">
          {shouldShowCards ? renderCardsView() : renderSelectionView()}
        </div>

        {/* 고정 하단 바 영역 */}
        <div className="flex-shrink-0">
          {/* 카드 화면일 때 완료 바 */}
          {shouldShowCards && (
            <CompleteBar
              selectedJobTypes={jobPosts[0]?.selectedJobTypes}
              selectedDemolitionWork={jobPosts[0]?.selectedDemolitionWork}
              selectedEquipment={jobPosts[0]?.selectedEquipment}
              selectedMatchingType={selectedMatchingType}
              totalPersonCount={jobPosts.reduce(
                (sum, job) => sum + job.selectedPersonCount,
                0,
              )}
              isMatchingStep={true}
              onClick={() => {
                if (selectedMatchingType === "smart") {
                  console.log("스마트 매칭 시작");
                  navigate("/matching-results");
                } else if (selectedMatchingType === "direct") {
                  console.log("직접 매칭 시작");
                  navigate("/matching-results");
                }
              }}
            />
          )}

          {/* 작업 특이사항 단계일 때 완료 바 */}
          {expandedSection === "specialNote" && !isKeyboardOpen && (
            <CompleteBar
              onClick={handleComplete}
              selectedJobTypes={selectedJobTypes}
              selectedDemolitionWork={selectedDemolitionWork}
              selectedEquipment={selectedEquipment}
              totalPersonCount={selectedPersonCount}
            />
          )}
        </div>

        {/* 기능공 모달 */}
        <Modal
          visible={isSkilledModalOpen}
          onClose={() => setIsSkilledModalOpen(false)}
        >
          <div className="px-6 py-6">
            <h2 className="mb-3 text-xl font-bold text-neutral-700">
              기능공 선택
            </h2>
            <p className="text-sm text-neutral-500">준비중입니다.</p>
            <div className="mt-5">
              <button
                className="w-full rounded-xl bg-blue-600 py-3 text-white"
                onClick={() => setIsSkilledModalOpen(false)}
              >
                닫기
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default JobPostingPage;
