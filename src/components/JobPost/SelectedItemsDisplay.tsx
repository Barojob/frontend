import React from "react";
import {
  getCategoryLabel,
  getPersonCountLabel,
  getSelectedDemolitionWorkLabels,
  getSelectedEquipmentLabels,
  getSelectedExperienceLabels,
  getWorkTimeLabel,
} from "../../utils/jobPostingHelpers";
import SelectedTab from "./SelectedTab";

interface SelectedItemsDisplayProps {
  activeCategory: string;
  selectedDemolitionWork: string[];
  selectedEquipment: string[];
  selectedExperience: string[];
  workStartTime: string;
  workEndTime: string;
  selectedPersonCount: number;
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
}

const SelectedItemsDisplay: React.FC<SelectedItemsDisplayProps> = ({
  activeCategory,
  selectedDemolitionWork,
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
  onJobTypeEdit,
  onDemolitionWorkEdit,
  onEquipmentEdit,
  onExperienceEdit,
  onWorkTimeEdit,
  onPersonCountEdit,
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
      {isJobTypeCompleted && (
        <>
          <SelectedTab
            title="업무"
            priceTitle="인건비 평균 금액 측정"
            selectedContent={getCategoryLabel(activeCategory)}
            amount={140700}
            className="py-4"
            onClick={onJobTypeEdit}
          />
          {isDemolitionWorkCompleted && (
            <div className="h-px bg-gray-200"></div>
          )}
        </>
      )}

      {isDemolitionWorkCompleted && (
        <>
          <SelectedTab
            title="세부업무"
            priceTitle="업무 수당"
            selectedContent={getSelectedDemolitionWorkLabels(
              selectedDemolitionWork,
            )}
            amount={3000}
            className="py-4"
            onClick={onDemolitionWorkEdit}
          />
          {isEquipmentCompleted && <div className="h-px bg-gray-200"></div>}
        </>
      )}

      {isEquipmentCompleted && (
        <>
          <SelectedTab
            title="필요장비"
            priceTitle="장비 경력 수당"
            selectedContent={getSelectedEquipmentLabels(selectedEquipment)}
            amount={100000}
            className="py-4"
            onClick={onEquipmentEdit}
          />
          {isExperienceCompleted && <div className="h-px bg-gray-200"></div>}
        </>
      )}

      {isExperienceCompleted && (
        <>
          <SelectedTab
            title="최소경력"
            priceTitle="경력 수당"
            selectedContent={getSelectedExperienceLabels(selectedExperience)}
            amount={5000}
            className="py-4"
            onClick={onExperienceEdit}
          />
          {isWorkTimeCompleted && <div className="h-px bg-gray-200"></div>}
        </>
      )}

      {isWorkTimeCompleted && (
        <>
          <SelectedTab
            title="근무시간"
            selectedContent={getWorkTimeLabel(workStartTime, workEndTime)}
            className="py-4"
            onClick={onWorkTimeEdit}
          />
          {isPersonCountCompleted && <div className="h-px bg-gray-200"></div>}
        </>
      )}

      {isPersonCountCompleted && (
        <SelectedTab
          title="근무인원"
          selectedContent={getPersonCountLabel(selectedPersonCount)}
          className="py-4"
          onClick={onPersonCountEdit}
        />
      )}
    </div>
  );
};

export default SelectedItemsDisplay;
