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

export const getSelectedJobTypeLabels = (selectedJobTypes: string[]) => {
  return selectedJobTypes
    .map(
      (id) => labelMappings.jobType[id as keyof typeof labelMappings.jobType],
    )
    .filter(Boolean)
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

// export const getSelectedExperienceLabels = (selectedExperience: string[]) => {
//   return selectedExperience
//     .map(
//       (id) =>
//         labelMappings.experience[id as keyof typeof labelMappings.experience],
//     )
//     .join(", ");
// };

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
    timeLabel = `${formatTime(workStartTime)}~${formatTime(workEndTime)}`;
  }

  let dateLabel = "";
  if (workMonth && workDay) {
    dateLabel = `${workMonth}월 ${workDay}일`;
  }

  if (dateLabel && timeLabel) {
    return `${dateLabel} / ${timeLabel}`;
  } else if (dateLabel) {
    return dateLabel;
  } else if (timeLabel) {
    return timeLabel;
  }
  return "";
};

export const getWorkDateLabel = (workMonth: number, workDay: number) => {
  return `${workMonth}월 ${workDay}일`;
};

export const getPersonCountLabel = (selectedPersonCount: number) => {
  return `${selectedPersonCount}명`;
};

// 가격 계산 로직
const BASE_WAGE_BY_JOB: Record<string, number> = {
  "general-labor": 150000,
  signal: 140000,
  lifting: 170000,
  gombang: 180000,
  demolition: 170000,
};

const SUB_ADJUSTMENT_BY_DEMOLITION: Record<string, number> = {
  "general-normal": 0,
  "general-system": 20000,
  "general-spade": 20000,
  "general-saw": 20000,
  "general-sickle": 20000,
  "signal-pedestrian": 0,
  "signal-vehicle": 0,
  "signal-fire-watch": 0,
  "lifting-light": 0,
  "lifting-heavy": 15000,
  "gombang-light": 0,
  "gombang-heavy": 15000,
  "demolition-main": 0,
  "demolition-followup": -10000,
};

const EQUIPMENT_PRICE: Record<string, number> = {
  none: 0,
  grinder: 10000,
  "hammer-drill": 20000,
  "hydraulic-crusher": 30000,
};

export const calculateEquipmentAddition = (
  selectedEquipment: string[],
): number => {
  if (!selectedEquipment || selectedEquipment.length === 0) return 0;
  const values = selectedEquipment.map((id) => EQUIPMENT_PRICE[id] ?? 0);
  values.sort((a, b) => b - a);
  const weights = [1, 0.5, 0.25, 0.125];
  let total = 0;
  for (let i = 0; i < values.length && i < weights.length; i++) {
    total += values[i] * weights[i];
  }
  return Math.round(total);
};

export const getBaseWage = (selectedJobTypes: string[] | undefined): number => {
  if (!selectedJobTypes || selectedJobTypes.length === 0) return 0;
  const primary = selectedJobTypes[0];
  return BASE_WAGE_BY_JOB[primary] ?? 0;
};

export const getSubAdjustment = (
  selectedDemolitionWork: string[] | undefined,
): number => {
  if (!selectedDemolitionWork || selectedDemolitionWork.length === 0) return 0;
  return selectedDemolitionWork.reduce((sum, id) => {
    return sum + (SUB_ADJUSTMENT_BY_DEMOLITION[id] ?? 0);
  }, 0);
};

export const getPerPersonAmount = (args: {
  selectedJobTypes: string[] | undefined;
  selectedDemolitionWork: string[] | undefined;
  selectedEquipment: string[] | undefined;
}): number => {
  let base = getBaseWage(args.selectedJobTypes);
  // Fallback: 세부업무만 선택되어 있을 때 prefix로 기본단가 추론
  if (
    base === 0 &&
    args.selectedDemolitionWork &&
    args.selectedDemolitionWork.length > 0
  ) {
    const id = args.selectedDemolitionWork[0];
    if (id.startsWith("signal-")) base = BASE_WAGE_BY_JOB["signal"];
    else if (id.startsWith("lifting-")) base = BASE_WAGE_BY_JOB["lifting"];
    else if (id.startsWith("gombang-")) base = BASE_WAGE_BY_JOB["gombang"];
    else if (id.startsWith("demolition-"))
      base = BASE_WAGE_BY_JOB["demolition"];
    else if (id.startsWith("general-"))
      base = BASE_WAGE_BY_JOB["general-labor"];
  }
  const sub = getSubAdjustment(args.selectedDemolitionWork);
  const equip = calculateEquipmentAddition(args.selectedEquipment ?? []);
  return base + sub + equip;
};
