import { useState } from "react";

export interface JobPost {
  id: string;
  activeCategory: string;
  selectedDemolitionWork: string[];
  selectedJobTypes: string[];
  selectedEquipment: string[];
  selectedExperience: string[];
  workStartTime: string;
  workEndTime: string;
  selectedPersonCount: number;
  estimatedCost: { min: number; max: number };
}

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
  const today = new Date();
  const [workMonth, setWorkMonth] = useState<number>(today.getMonth() + 1);
  const [workDay, setWorkDay] = useState<number>(today.getDate());
  const [selectedPersonCount, setSelectedPersonCount] = useState(1);
  const [isPersonCountSelected, setIsPersonCountSelected] = useState(false);
  const [specialNote, setSpecialNote] = useState<string>("");

  // 각 단계별 선택 완료 상태
  const [isJobTypeCompleted, setIsJobTypeCompleted] = useState(false);
  const [isDemolitionWorkCompleted, setIsDemolitionWorkCompleted] =
    useState(false);
  const [isEquipmentCompleted, setIsEquipmentCompleted] = useState(false);
  const [isExperienceCompleted, setIsExperienceCompleted] = useState(false);
  const [isWorkTimeCompleted, setIsWorkTimeCompleted] = useState(false);
  const [isPersonCountCompleted, setIsPersonCountCompleted] = useState(false);
  const [isSpecialNoteOpen, setIsSpecialNoteOpen] = useState(false);

  // 편집 중인지 여부를 추적하는 상태
  const [isEditing, setIsEditing] = useState(false);

  // 구인 게시물 목록
  const [jobPosts, setJobPosts] = useState<JobPost[]>([]);

  // 이벤트 핸들러들
  const handleJobTypeToggle = (jobTypeId: string) => {
    const isChanged = selectedJobTypes[0] !== jobTypeId;
    setSelectedJobTypes([jobTypeId]);

    // 업무가 변경되면 세부업무 초기화
    if (isChanged) {
      setSelectedDemolitionWork([]);
      setIsDemolitionWorkCompleted(false);
    }
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
      if (equipmentId === "none") {
        return ["none"];
      }

      if (prev.includes("none")) {
        return [equipmentId];
      }

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

  const handleWorkDateChange = (month: number, day: number) => {
    setWorkMonth(month);
    setWorkDay(day);
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
    setWorkMonth(today.getMonth() + 1);
    setWorkDay(today.getDate());
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
    setIsSpecialNoteOpen(true);
  };

  // 편집 핸들러들
  const handleJobTypeEdit = () => {
    setIsJobTypeCompleted(false);
    setIsEditing(true);
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
    setIsEquipmentCompleted(false);
    setIsExperienceCompleted(false);
    setIsWorkTimeCompleted(false);
    setIsPersonCountCompleted(false);
    setIsPersonCountSelected(false);
  };

  const handleEquipmentEdit = () => {
    setIsEquipmentCompleted(false);
    setIsEditing(true);
    setIsExperienceCompleted(false);
    setIsWorkTimeCompleted(false);
    setIsPersonCountCompleted(false);
    setIsPersonCountSelected(false);
  };

  const handleExperienceEdit = () => {
    setIsExperienceCompleted(false);
    setIsEditing(true);
    setIsWorkTimeCompleted(false);
    setIsPersonCountCompleted(false);
    setIsPersonCountSelected(false);
  };

  const handleWorkTimeEdit = () => {
    setIsWorkTimeCompleted(false);
    setIsEditing(true);
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
      setIsEditing(false);
    }
  };

  const handleDemolitionWorkConfirmAfterEdit = () => {
    if (selectedDemolitionWork.length > 0) {
      setIsDemolitionWorkCompleted(true);
      setIsEditing(false);
    }
  };

  const handleEquipmentConfirmAfterEdit = () => {
    if (selectedEquipment.length > 0) {
      setIsEquipmentCompleted(true);
      setIsEditing(false);
    }
  };

  const handleExperienceConfirmAfterEdit = () => {
    if (selectedExperience.length > 0) {
      setIsExperienceCompleted(true);
      setIsEditing(false);
    }
  };

  const handleWorkTimeConfirmAfterEdit = () => {
    setIsWorkTimeCompleted(true);
    setIsEditing(false);
  };

  const handlePersonCountConfirmAfterEdit = () => {
    setIsPersonCountSelected(true);
    setIsPersonCountCompleted(true);
    setIsEditing(false);
    setIsSpecialNoteOpen(true);
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

  // 구인 게시물 관련 핸들러들
  const handleComplete = () => {
    const newJobPost: JobPost = {
      id: Date.now().toString(),
      activeCategory,
      selectedDemolitionWork,
      selectedJobTypes,
      selectedEquipment,
      selectedExperience,
      workStartTime,
      workEndTime,
      selectedPersonCount,
      estimatedCost: calculateEstimatedCost(),
    };

    setJobPosts((prev) => [...prev, newJobPost]);

    // 상태 초기화
    setActiveCategory("general");
    setSelectedDemolitionWork([]);
    setSelectedJobTypes([]);
    setSelectedEquipment([]);
    setSelectedExperience([]);
    setWorkStartTime("09:00");
    setWorkEndTime("18:00");
    setWorkMonth(today.getMonth() + 1);
    setWorkDay(today.getDate());
    setSelectedPersonCount(1);
    setIsPersonCountSelected(false);
    setIsJobTypeCompleted(false);
    setIsDemolitionWorkCompleted(false);
    setIsEquipmentCompleted(false);
    setIsExperienceCompleted(false);
    setIsWorkTimeCompleted(false);
    setIsPersonCountCompleted(false);
    setIsEditing(false);
    setSpecialNote("");
    setIsSpecialNoteOpen(false);
  };

  const handleDeleteJobPost = (id: string) => {
    setJobPosts((prev) => prev.filter((jobPost) => jobPost.id !== id));
  };

  const handleEditJobPost = (jobPost: JobPost) => {
    setActiveCategory(jobPost.activeCategory);
    setSelectedDemolitionWork(jobPost.selectedDemolitionWork);
    setSelectedJobTypes(jobPost.selectedJobTypes);
    setSelectedEquipment(jobPost.selectedEquipment);
    setSelectedExperience(jobPost.selectedExperience);
    setWorkStartTime(jobPost.workStartTime);
    setWorkEndTime(jobPost.workEndTime);
    setSelectedPersonCount(jobPost.selectedPersonCount);
    setIsPersonCountSelected(true);
    setIsJobTypeCompleted(true);
    setIsDemolitionWorkCompleted(true);
    setIsEquipmentCompleted(true);
    setIsExperienceCompleted(true);
    setIsWorkTimeCompleted(true);
    setIsPersonCountCompleted(true);
    setIsEditing(false);
  };

  const handleAddNewJobPost = () => {
    // 상태 초기화
    setActiveCategory("general");
    setSelectedDemolitionWork([]);
    setSelectedJobTypes([]);
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

  return {
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
    specialNote,
    isPersonCountSelected,
    isJobTypeCompleted,
    isDemolitionWorkCompleted,
    isEquipmentCompleted,
    isExperienceCompleted,
    isWorkTimeCompleted,
    isPersonCountCompleted,
    isSpecialNoteOpen,
    isEditing,
    jobPosts,

    // 핸들러
    handleJobTypeToggle,
    handleDemolitionWorkToggle,
    handleEquipmentToggle,
    handleExperienceToggle,
    handleWorkTimeChange,
    handleWorkDateChange,
    handlePersonCountChange,
    handleCategoryChange,
    handleJobTypeConfirm,
    handleDemolitionWorkConfirm,
    handleEquipmentConfirm,
    handleExperienceConfirm,
    handleWorkTimeConfirm,
    handlePersonCountConfirm,
    setSpecialNote,
    setIsSpecialNoteOpen,

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
  };
};
