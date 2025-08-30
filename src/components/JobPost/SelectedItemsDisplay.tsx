import React from "react";
import {
  calculateEquipmentAddition,
  getBaseWage,
  getPersonCountLabel,
  getSelectedDemolitionWorkLabels,
  getSelectedEquipmentLabels,
  // getSelectedExperienceLabels,
  getSelectedJobTypeLabels,
  getSubAdjustment,
  getWorkTimeLabel,
} from "../../utils/jobPostingHelpers";
import PresenceTransition from "../PresenceTransition";
import SelectedTab from "./SelectedTab";

interface SelectedItemsDisplayProps {
  activeCategory: string;
  selectedJobTypes: string[];
  selectedDemolitionWork: string[];
  selectedEquipment: string[];
  selectedExperience: string[];
  workStartTime: string;
  workEndTime: string;
  workMonth?: number;
  workDay?: number;
  selectedPersonCount: number;
  // specialNote removed from list view
  isJobTypeCompleted: boolean;
  isDemolitionWorkCompleted: boolean;
  isEquipmentCompleted: boolean;
  isExperienceCompleted: boolean;
  isWorkTimeCompleted: boolean;
  isPersonCountCompleted: boolean;
  onJobTypeEdit: () => void;
  onDemolitionWorkEdit: () => void;
  onEquipmentEdit: () => void;
  onExperienceEdit: () => void;
  onWorkTimeEdit: () => void;
  onPersonCountEdit: () => void;
  // 탭 클릭 시 하단으로 펼치기 위한 선택적 콜백 (있으면 우선 사용)
  onJobTypeTabClick?: () => void;
  onDemolitionWorkTabClick?: () => void;
  onEquipmentTabClick?: () => void;
  onExperienceTabClick?: () => void;
  onWorkTimeTabClick?: () => void;
  onPersonCountTabClick?: () => void;
  // onSpecialNoteTabClick removed from list view
  // 현재 펼친 섹션: 해당 탭은 숨김 처리
  expandedSection?:
    | "jobType"
    | "demolitionWork"
    | "equipment"
    | "experience"
    | "workTime"
    | "personCount"
    | "specialNote"
    | null;
  // 각 섹션 아래로 렌더링할 에디터(스텝) 노드
  renderJobTypeEditor?: React.ReactNode;
  renderDemolitionEditor?: React.ReactNode;
  renderEquipmentEditor?: React.ReactNode;
  renderExperienceEditor?: React.ReactNode;
  renderWorkTimeEditor?: React.ReactNode;
  renderPersonCountEditor?: React.ReactNode;
  // renderSpecialNoteEditor removed from list view
}

const SelectedItemsDisplay: React.FC<SelectedItemsDisplayProps> = ({
  selectedJobTypes,
  selectedDemolitionWork,
  selectedEquipment,
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
  onJobTypeEdit,
  onDemolitionWorkEdit,
  onEquipmentEdit,
  onWorkTimeEdit,
  onPersonCountEdit,
  onJobTypeTabClick,
  onDemolitionWorkTabClick,
  onEquipmentTabClick,
  onWorkTimeTabClick,
  onPersonCountTabClick,
  // onSpecialNoteTabClick,
  expandedSection,
  renderJobTypeEditor,
  renderDemolitionEditor,
  renderEquipmentEditor,
  renderWorkTimeEditor,
  renderPersonCountEditor,
  // renderSpecialNoteEditor,
}) => {
  const hasAnyCompleted =
    isJobTypeCompleted ||
    isDemolitionWorkCompleted ||
    isEquipmentCompleted ||
    isExperienceCompleted ||
    isWorkTimeCompleted ||
    isPersonCountCompleted;

  if (!hasAnyCompleted) return null;

  return (
    <div className="bg-white px-6 py-2">
      {(isJobTypeCompleted || expandedSection === "jobType") && (
        <>
          {isJobTypeCompleted && expandedSection !== "jobType" ? (
            <SelectedTab
              title="업무"
              priceTitle="인건비 평균 금액 측정"
              selectedContent={getSelectedJobTypeLabels(selectedJobTypes)}
              amount={getBaseWage(selectedJobTypes)}
              className="py-4"
              onClick={onJobTypeTabClick ?? onJobTypeEdit}
            />
          ) : (
            <PresenceTransition transitionKey="jobType" variant="subtleRise">
              <div className="py-4">{renderJobTypeEditor}</div>
            </PresenceTransition>
          )}
          {(isDemolitionWorkCompleted ||
            expandedSection === "demolitionWork") && (
            <div className="h-px bg-gray-200"></div>
          )}
        </>
      )}

      {(isDemolitionWorkCompleted || expandedSection === "demolitionWork") && (
        <>
          {isDemolitionWorkCompleted && expandedSection !== "demolitionWork" ? (
            <SelectedTab
              title="세부업무"
              priceTitle="업무 수당"
              selectedContent={getSelectedDemolitionWorkLabels(
                selectedDemolitionWork,
              )}
              amount={getSubAdjustment(selectedDemolitionWork)}
              className="py-4"
              onClick={onDemolitionWorkTabClick ?? onDemolitionWorkEdit}
            />
          ) : (
            <PresenceTransition
              transitionKey="demolitionWork"
              variant="subtleRise"
            >
              <div className="py-4">{renderDemolitionEditor}</div>
            </PresenceTransition>
          )}
          {(isEquipmentCompleted || expandedSection === "equipment") && (
            <div className="h-px bg-gray-200"></div>
          )}
        </>
      )}

      {(isEquipmentCompleted || expandedSection === "equipment") && (
        <>
          {isEquipmentCompleted && expandedSection !== "equipment" ? (
            <SelectedTab
              title="필요장비"
              priceTitle="장비 수당"
              selectedContent={getSelectedEquipmentLabels(selectedEquipment)}
              amount={calculateEquipmentAddition(selectedEquipment)}
              className="py-4"
              onClick={onEquipmentTabClick ?? onEquipmentEdit}
            />
          ) : (
            <PresenceTransition transitionKey="equipment" variant="subtleRise">
              <div className="py-4">{renderEquipmentEditor}</div>
            </PresenceTransition>
          )}
          {isEquipmentCompleted && <div className="h-px bg-gray-200"></div>}
        </>
      )}

      {/* {(isExperienceCompleted || expandedSection === "experience") && (
        <>
          {isExperienceCompleted && expandedSection !== "experience" ? (
            <SelectedTab
              title="최소경력"
              priceTitle="경력 수당"
              selectedContent={getSelectedExperienceLabels(selectedExperience)}
              amount={5000}
              className="py-4"
              onClick={onExperienceTabClick ?? onExperienceEdit}
            />
          ) : (
            <PresenceTransition transitionKey="experience" variant="subtleRise">
              <div className="py-4">{renderExperienceEditor}</div>
            </PresenceTransition>
          )}
          {(isWorkTimeCompleted || expandedSection === "workTime") && (
            <div className="h-px bg-gray-200"></div>
          )}
        </>
      )} */}

      {(isWorkTimeCompleted || expandedSection === "workTime") && (
        <>
          {isWorkTimeCompleted && expandedSection !== "workTime" ? (
            <SelectedTab
              title="근무시간"
              selectedContent={getWorkTimeLabel(
                workStartTime,
                workEndTime,
                workMonth,
                workDay,
              )}
              className="py-4"
              onClick={onWorkTimeTabClick ?? onWorkTimeEdit}
            />
          ) : (
            <PresenceTransition transitionKey="workTime" variant="subtleRise">
              <div className="py-4">{renderWorkTimeEditor}</div>
            </PresenceTransition>
          )}
          {(isPersonCountCompleted || expandedSection === "personCount") && (
            <div className="h-px bg-gray-200"></div>
          )}
        </>
      )}

      {(isPersonCountCompleted || expandedSection === "personCount") && (
        <>
          {isPersonCountCompleted && expandedSection !== "personCount" ? (
            <SelectedTab
              title="근무인원"
              selectedContent={getPersonCountLabel(selectedPersonCount)}
              className="py-4"
              onClick={onPersonCountTabClick ?? onPersonCountEdit}
            />
          ) : (
            <PresenceTransition
              transitionKey="personCount"
              variant="subtleRise"
            >
              <div className="py-4">{renderPersonCountEditor}</div>
            </PresenceTransition>
          )}
          {isPersonCountCompleted && <div className="h-px bg-gray-200"></div>}
        </>
      )}

      {null}
    </div>
  );
};

export default SelectedItemsDisplay;
