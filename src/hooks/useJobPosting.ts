import { useState } from "react";

export const useJobPosting = () => {
  // 기본 상태
  const [activeCategory, setActiveCategory] = useState("general");
  const [selectedDemolitionWork, setSelectedDemolitionWork] = useState<
    string[]
  >([]);
  const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>([]);
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([]);
  const [selectedExperience, setSelectedExperience] = useState<string[]>([]);
  const [workStartTime, setWorkStartTime] = useState("09:00");
  const [workEndTime, setWorkEndTime] = useState("18:00");
  const [selectedPersonCount, setSelectedPersonCount] = useState(1);
  const [isPersonCountSelected, setIsPersonCountSelected] = useState(false);

  // 각 단계별 선택 완료 상태
  const [isJobTypeCompleted, setIsJobTypeCompleted] = useState(false);
  const [isDemolitionWorkCompleted, setIsDemolitionWorkCompleted] =
    useState(false);
  const [isEquipmentCompleted, setIsEquipmentCompleted] = useState(false);
  const [isExperienceCompleted, setIsExperienceCompleted] = useState(false);
  const [isWorkTimeCompleted, setIsWorkTimeCompleted] = useState(false);
  const [isPersonCountCompleted, setIsPersonCountCompleted] = useState(false);

  // 편집 중인지 여부를 추적하는 상태
  const [isEditing, setIsEditing] = useState(false);

  // 이벤트 핸들러들
  const handleJobTypeToggle = (jobTypeId: string) => {
    setSelectedJobTypes([jobTypeId]);
  };

  const handleDemolitionWorkToggle = (demolitionWorkId: string) => {
    setSelectedDemolitionWork((prev) =>
      prev.includes(demolitionWorkId)
        ? prev.filter((id) => id !== demolitionWorkId)
        : [...prev, demolitionWorkId],
    );
  };

  const handleEquipmentToggle = (equipmentId: string) => {
    setSelectedEquipment((prev) => {
      // "없음"을 선택한 경우
      if (equipmentId === "none") {
        return ["none"];
      }

      // "없음"이 이미 선택되어 있는데 다른 장비를 선택한 경우
      if (prev.includes("none")) {
        return [equipmentId];
      }

      // 일반적인 토글 로직
      if (prev.includes(equipmentId)) {
        return prev.filter((id) => id !== equipmentId);
      } else {
        return [...prev, equipmentId];
      }
    });
  };

  const handleExperienceToggle = (experienceId: string) => {
    setSelectedExperience([experienceId]);
  };

  const handleWorkTimeChange = (startTime: string, endTime: string) => {
    setWorkStartTime(startTime);
    setWorkEndTime(endTime);
  };

  const handlePersonCountChange = (count: number) => {
    setSelectedPersonCount(count);
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setSelectedJobTypes([]);
    setSelectedDemolitionWork([]);
    setSelectedEquipment([]);
    setSelectedExperience([]);
    setWorkStartTime("09:00");
    setWorkEndTime("18:00");
    setSelectedPersonCount(1);
    setIsPersonCountSelected(false);
    setIsJobTypeCompleted(false);
    setIsDemolitionWorkCompleted(false);
    setIsEquipmentCompleted(false);
    setIsExperienceCompleted(false);
    setIsWorkTimeCompleted(false);
    setIsPersonCountCompleted(false);
    setIsEditing(false);
  };

  // 각 단계별 확인 버튼 핸들러
  const handleJobTypeConfirm = () => {
    if (selectedJobTypes.length > 0) {
      setIsJobTypeCompleted(true);
      setIsEditing(false);
    }
  };

  const handleDemolitionWorkConfirm = () => {
    if (selectedDemolitionWork.length > 0) {
      setIsDemolitionWorkCompleted(true);
      setIsEditing(false);
    }
  };

  const handleEquipmentConfirm = () => {
    if (selectedEquipment.length > 0) {
      setIsEquipmentCompleted(true);
      setIsEditing(false);
    }
  };

  const handleExperienceConfirm = () => {
    if (selectedExperience.length > 0) {
      setIsExperienceCompleted(true);
      setIsEditing(false);
    }
  };

  const handleWorkTimeConfirm = () => {
    setIsWorkTimeCompleted(true);
    setIsEditing(false);
  };

  const handlePersonCountConfirm = () => {
    setIsPersonCountSelected(true);
    setIsPersonCountCompleted(true);
    setIsEditing(false);
  };

  // 편집 핸들러들 - 해당 단계로 돌아가면서 이후 단계들을 자동 완료
  const handleJobTypeEdit = () => {
    setIsJobTypeCompleted(false);
    setIsEditing(true);
    // 이후 단계들 모두 초기화
    setIsDemolitionWorkCompleted(false);
    setIsEquipmentCompleted(false);
    setIsExperienceCompleted(false);
    setIsWorkTimeCompleted(false);
    setIsPersonCountCompleted(false);
    setIsPersonCountSelected(false);
  };

  const handleDemolitionWorkEdit = () => {
    setIsDemolitionWorkCompleted(false);
    setIsEditing(true);
    // 이후 단계들 모두 초기화
    setIsEquipmentCompleted(false);
    setIsExperienceCompleted(false);
    setIsWorkTimeCompleted(false);
    setIsPersonCountCompleted(false);
    setIsPersonCountSelected(false);
  };

  const handleEquipmentEdit = () => {
    setIsEquipmentCompleted(false);
    setIsEditing(true);
    // 이후 단계들 모두 초기화
    setIsExperienceCompleted(false);
    setIsWorkTimeCompleted(false);
    setIsPersonCountCompleted(false);
    setIsPersonCountSelected(false);
  };

  const handleExperienceEdit = () => {
    setIsExperienceCompleted(false);
    setIsEditing(true);
    // 이후 단계들 모두 초기화
    setIsWorkTimeCompleted(false);
    setIsPersonCountCompleted(false);
    setIsPersonCountSelected(false);
  };

  const handleWorkTimeEdit = () => {
    setIsWorkTimeCompleted(false);
    setIsEditing(true);
    // 이후 단계들 모두 초기화
    setIsPersonCountCompleted(false);
    setIsPersonCountSelected(false);
  };

  const handlePersonCountEdit = () => {
    setIsPersonCountCompleted(false);
    setIsPersonCountSelected(false);
    setIsEditing(true);
  };

  // 편집 후 자동 완료 핸들러들
  const handleJobTypeConfirmAfterEdit = () => {
    if (selectedJobTypes.length > 0) {
      setIsJobTypeCompleted(true);
      // 이후 단계들 자동 완료
      if (selectedDemolitionWork.length > 0) setIsDemolitionWorkCompleted(true);
      if (selectedEquipment.length > 0) setIsEquipmentCompleted(true);
      if (selectedExperience.length > 0) setIsExperienceCompleted(true);
      setIsWorkTimeCompleted(true); // 기본값이 있으므로 항상 완료
      setIsPersonCountSelected(true);
      setIsPersonCountCompleted(true);
      setIsEditing(false);
    }
  };

  const handleDemolitionWorkConfirmAfterEdit = () => {
    if (selectedDemolitionWork.length > 0) {
      setIsDemolitionWorkCompleted(true);
      // 이후 단계들 자동 완료
      if (selectedEquipment.length > 0) setIsEquipmentCompleted(true);
      if (selectedExperience.length > 0) setIsExperienceCompleted(true);
      setIsWorkTimeCompleted(true); // 기본값이 있으므로 항상 완료
      setIsPersonCountSelected(true);
      setIsPersonCountCompleted(true);
      setIsEditing(false);
    }
  };

  const handleEquipmentConfirmAfterEdit = () => {
    if (selectedEquipment.length > 0) {
      setIsEquipmentCompleted(true);
      // 이후 단계들 자동 완료
      if (selectedExperience.length > 0) setIsExperienceCompleted(true);
      setIsWorkTimeCompleted(true); // 기본값이 있으므로 항상 완료
      setIsPersonCountSelected(true);
      setIsPersonCountCompleted(true);
      setIsEditing(false);
    }
  };

  const handleExperienceConfirmAfterEdit = () => {
    if (selectedExperience.length > 0) {
      setIsExperienceCompleted(true);
      // 이후 단계들 자동 완료
      setIsWorkTimeCompleted(true); // 기본값이 있으므로 항상 완료
      setIsPersonCountSelected(true);
      setIsPersonCountCompleted(true);
      setIsEditing(false);
    }
  };

  const handleWorkTimeConfirmAfterEdit = () => {
    setIsWorkTimeCompleted(true);
    // 이후 단계들 자동 완료
    setIsPersonCountSelected(true);
    setIsPersonCountCompleted(true);
    setIsEditing(false);
  };

  const handlePersonCountConfirmAfterEdit = () => {
    setIsPersonCountSelected(true);
    setIsPersonCountCompleted(true);
    setIsEditing(false);
  };

  // 예상 금액 계산
  const calculateEstimatedCost = () => {
    if (!isPersonCountSelected) return { min: 0, max: 0 };

    let baseCost = 140700;

    if (selectedDemolitionWork.length > 0) {
      baseCost += 3000;
    }

    if (selectedEquipment.length > 0 && !selectedEquipment.includes("none")) {
      baseCost += 100000;
    }

    if (selectedExperience.length > 0) {
      baseCost += 5000;
    }

    const totalCost = baseCost * selectedPersonCount;
    const minCost = Math.floor(totalCost * 0.9);
    const maxCost = Math.floor(totalCost * 1.1);

    return { min: minCost, max: maxCost };
  };

  // 모든 단계가 완료되었는지 확인
  const isAllStepsCompleted =
    isJobTypeCompleted &&
    isDemolitionWorkCompleted &&
    isEquipmentCompleted &&
    isExperienceCompleted &&
    isWorkTimeCompleted &&
    isPersonCountCompleted;

  return {
    // 상태
    activeCategory,
    selectedDemolitionWork,
    selectedJobTypes,
    selectedEquipment,
    selectedExperience,
    workStartTime,
    workEndTime,
    selectedPersonCount,
    isPersonCountSelected,
    isJobTypeCompleted,
    isDemolitionWorkCompleted,
    isEquipmentCompleted,
    isExperienceCompleted,
    isWorkTimeCompleted,
    isPersonCountCompleted,
    isAllStepsCompleted,
    isEditing,

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

    // 계산 함수
    calculateEstimatedCost,
  };
};
