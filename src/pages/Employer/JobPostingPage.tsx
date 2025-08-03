import React from "react";
import { useNavigate } from "react-router-dom";
import AddJobPostCard from "../../components/JobPost/AddJobPostCard";
import DemolitionWorkStep from "../../components/JobPost/DemolitionWorkStep";
import EquipmentStep from "../../components/JobPost/EquipmentStep";
import EstimatedCostDisplay from "../../components/JobPost/EstimatedCostDisplay";
import ExperienceStep from "../../components/JobPost/ExperienceStep";
import JobPostCard from "../../components/JobPost/JobPostCard";
import JobTypeStep from "../../components/JobPost/JobTypeStep";
import PersonCountStep from "../../components/JobPost/PersonCountStep";
import SelectedItemsDisplay from "../../components/JobPost/SelectedItemsDisplay";
import WorkTimeStep from "../../components/JobPost/WorkTimeStep";
import NavigationHeader from "../../components/NavigationHeader/NavigationHeader";
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
    selectedPersonCount,
    isJobTypeCompleted,
    isDemolitionWorkCompleted,
    isEquipmentCompleted,
    isExperienceCompleted,
    isWorkTimeCompleted,
    isPersonCountCompleted,
    isEditing,
    jobPosts,

    // 핸들러
    handleJobTypeToggle,
    handleDemolitionWorkToggle,
    handleEquipmentToggle,
    handleExperienceToggle,
    handleWorkTimeChange,
    handlePersonCountChange,
    handleCategoryChange,
    handleJobTypeConfirm,
    handleDemolitionWorkConfirm,
    handleEquipmentConfirm,
    handleExperienceConfirm,
    handleWorkTimeConfirm,
    handlePersonCountConfirm,

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
    handleExperienceConfirmAfterEdit,
    handleWorkTimeConfirmAfterEdit,
    handlePersonCountConfirmAfterEdit,

    // 구인 게시물 핸들러
    handleComplete,
    handleDeleteJobPost,
    handleEditJobPost,
    handleAddNewJobPost,

    // 계산 함수
    calculateEstimatedCost,
  } = useJobPosting();

  const estimatedCost = calculateEstimatedCost();

  // 카드 화면이 표시되어야 하는지 확인
  const shouldShowCards = jobPosts.length > 0;

  return (
    <>
      <div className="flex min-h-screen w-full flex-col justify-start overflow-y-auto bg-gray-200">
        <div className="bg-white px-6">
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
          <div className="flex-1 bg-white px-6 py-9 pb-32">
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
            />

            {/* 하단: 선택 영역 */}
            <div
              className={`flex flex-1 flex-col bg-white px-6 py-4 ${
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
              {/* 선택 컨텐츠 영역 */}
              <div className="flex-1">
                {/* 1단계: 업무 선택 */}
                {!isJobTypeCompleted && (
                  <JobTypeStep
                    activeCategory={activeCategory}
                    selectedJobTypes={selectedJobTypes}
                    onCategoryChange={handleCategoryChange}
                    onJobTypeToggle={handleJobTypeToggle}
                    onConfirm={
                      isEditing
                        ? handleJobTypeConfirmAfterEdit
                        : handleJobTypeConfirm
                    }
                  />
                )}

                {/* 2단계: 세부 업무 선택 */}
                {isJobTypeCompleted && !isDemolitionWorkCompleted && (
                  <DemolitionWorkStep
                    selectedDemolitionWork={selectedDemolitionWork}
                    onDemolitionWorkToggle={handleDemolitionWorkToggle}
                    onConfirm={
                      isEditing
                        ? handleDemolitionWorkConfirmAfterEdit
                        : handleDemolitionWorkConfirm
                    }
                  />
                )}

                {/* 3단계: 장비 선택 */}
                {isJobTypeCompleted &&
                  isDemolitionWorkCompleted &&
                  !isEquipmentCompleted && (
                    <EquipmentStep
                      selectedEquipment={selectedEquipment}
                      onEquipmentToggle={handleEquipmentToggle}
                      onConfirm={
                        isEditing
                          ? handleEquipmentConfirmAfterEdit
                          : handleEquipmentConfirm
                      }
                    />
                  )}

                {/* 4단계: 경력 선택 */}
                {isJobTypeCompleted &&
                  isDemolitionWorkCompleted &&
                  isEquipmentCompleted &&
                  !isExperienceCompleted && (
                    <ExperienceStep
                      selectedExperience={selectedExperience}
                      onExperienceToggle={handleExperienceToggle}
                      onConfirm={
                        isEditing
                          ? handleExperienceConfirmAfterEdit
                          : handleExperienceConfirm
                      }
                    />
                  )}

                {/* 5단계: 업무 시간 선택 */}
                {isJobTypeCompleted &&
                  isDemolitionWorkCompleted &&
                  isEquipmentCompleted &&
                  isExperienceCompleted &&
                  !isWorkTimeCompleted && (
                    <WorkTimeStep
                      workStartTime={workStartTime}
                      workEndTime={workEndTime}
                      onTimeChange={handleWorkTimeChange}
                      onConfirm={
                        isEditing
                          ? handleWorkTimeConfirmAfterEdit
                          : handleWorkTimeConfirm
                      }
                    />
                  )}

                {/* 6단계: 인원 선택 */}
                {isJobTypeCompleted &&
                  isDemolitionWorkCompleted &&
                  isEquipmentCompleted &&
                  isExperienceCompleted &&
                  isWorkTimeCompleted &&
                  !isPersonCountCompleted && (
                    <PersonCountStep
                      selectedPersonCount={selectedPersonCount}
                      onPersonCountChange={handlePersonCountChange}
                      onConfirm={
                        isEditing
                          ? handlePersonCountConfirmAfterEdit
                          : handlePersonCountConfirm
                      }
                    />
                  )}

                {/* 예상 금액 표시 */}
                {isPersonCountCompleted && (
                  <EstimatedCostDisplay
                    minCost={estimatedCost.min}
                    maxCost={estimatedCost.max}
                  />
                )}
              </div>
            </div>

            {/* 하단 고정 버튼 */}
            {isPersonCountCompleted && (
              <div className="fixed bottom-0 left-0 right-0 bg-white px-6 py-8 shadow-lg">
                <button
                  onClick={handleComplete}
                  className="w-full rounded-xl bg-blue-600 py-3 text-lg text-white"
                >
                  설정 완료
                </button>
              </div>
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
