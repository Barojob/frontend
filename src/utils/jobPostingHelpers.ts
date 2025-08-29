import { labelMappings } from "./labelMappings";

export const getCategoryLabel = (categoryId: string) => {
  return categoryId === "general" ? "보통 인부" : "기능공";
};

export const getSelectedDemolitionWorkLabels = (
  selectedDemolitionWork: string[],
) => {
  return selectedDemolitionWork
    .map(
      (id) =>
        labelMappings.demolitionWork[
          id as keyof typeof labelMappings.demolitionWork
        ],
    )
    .join(", ");
};

export const getSelectedEquipmentLabels = (selectedEquipment: string[]) => {
  return selectedEquipment
    .map(
      (id) =>
        labelMappings.equipment[id as keyof typeof labelMappings.equipment],
    )
    .join(", ");
};

export const getSelectedExperienceLabels = (selectedExperience: string[]) => {
  return selectedExperience
    .map(
      (id) =>
        labelMappings.experience[id as keyof typeof labelMappings.experience],
    )
    .join(", ");
};

export const getWorkTimeLabel = (
  workStartTime: string,
  workEndTime: string,
  workMonth?: number,
  workDay?: number,
) => {
  let timeLabel = "";
  if (workStartTime && workEndTime) {
    const formatTime = (time: string) => {
      const [hour] = time.split(":");
      return `${parseInt(hour)}시`;
    };
    timeLabel = `${formatTime(workStartTime)} ~ ${formatTime(workEndTime)}`;
  }

  let dateLabel = "";
  if (workMonth && workDay) {
    dateLabel = `${workMonth}월 ${workDay}일`;
  }

  if (dateLabel && timeLabel) {
    return `${dateLabel} ${timeLabel}`;
  } else if (dateLabel) {
    return dateLabel;
  } else if (timeLabel) {
    return timeLabel;
  }
  return "";
};

export const getPersonCountLabel = (selectedPersonCount: number) => {
  return `${selectedPersonCount}명`;
};
