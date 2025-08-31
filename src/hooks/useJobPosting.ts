import { Preferences } from "@capacitor/preferences";
import { useEffect, useState } from "react";

export interface JobPost {
  id: string;
  activeCategory: string;
  selectedDemolitionWork: string[];
  selectedJobTypes: string[];
  selectedEquipment: string[];
  selectedExperience: string[];
  workStartTime: string;
  workEndTime: string;
  workMonth: number;
  workDay: number;
  selectedPersonCount: number;
  estimatedCost: { min: number; max: number };
}

const STORAGE_KEY = "jobPosts";
const CURRENT_STATE_KEY = "currentJobPostingState";

export const useJobPosting = () => {
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

  const [isJobTypeCompleted, setIsJobTypeCompleted] = useState(false);
  const [isDemolitionWorkCompleted, setIsDemolitionWorkCompleted] =
    useState(false);
  const [isEquipmentCompleted, setIsEquipmentCompleted] = useState(false);
  const [isExperienceCompleted, setIsExperienceCompleted] = useState(false);
  const [isWorkTimeCompleted, setIsWorkTimeCompleted] = useState(false);
  const [isPersonCountCompleted, setIsPersonCountCompleted] = useState(false);
  const [isSpecialNoteOpen, setIsSpecialNoteOpen] = useState(false);

  const [isEditing, setIsEditing] = useState(false);

  const [jobPosts, setJobPosts] = useState<JobPost[]>([]);

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

  // 로컬 스토리지에서 jobPosts 불러오기
  useEffect(() => {
    const loadJobPosts = async () => {
      try {
        const { value } = await Preferences.get({ key: STORAGE_KEY });
        if (value) {
          const parsedJobPosts = JSON.parse(value);
          setJobPosts(parsedJobPosts);
        }
      } catch (error) {
        console.error("Failed to load job posts:", error);
      }
    };
    loadJobPosts();
  }, []);

  // jobPosts가 변경될 때마다 로컬 스토리지에 저장
  useEffect(() => {
    const saveJobPosts = async () => {
      try {
        await Preferences.set({
          key: STORAGE_KEY,
          value: JSON.stringify(jobPosts),
        });
      } catch (error) {
        console.error("Failed to save job posts:", error);
      }
    };
    saveJobPosts();
  }, [jobPosts]);

  // 현재 상태를 로컬 스토리지에 저장하는 함수
  const saveCurrentState = async () => {
    try {
      const currentState = {
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
      };
      await Preferences.set({
        key: CURRENT_STATE_KEY,
        value: JSON.stringify(currentState),
      });
    } catch (error) {
      console.error("Failed to save current state:", error);
    }
  };

  // 현재 상태를 로컬 스토리지에서 복원하는 함수
  const restoreCurrentState = async () => {
    try {
      const { value } = await Preferences.get({ key: CURRENT_STATE_KEY });
      if (value) {
        const parsedState = JSON.parse(value);
        setActiveCategory(parsedState.activeCategory || "general");
        setSelectedDemolitionWork(parsedState.selectedDemolitionWork || []);
        setSelectedJobTypes(parsedState.selectedJobTypes || []);
        setSelectedEquipment(parsedState.selectedEquipment || []);
        setSelectedExperience(parsedState.selectedExperience || []);
        setWorkStartTime(parsedState.workStartTime || "09:00");
        setWorkEndTime(parsedState.workEndTime || "18:00");
        setWorkMonth(parsedState.workMonth || today.getMonth() + 1);
        setWorkDay(parsedState.workDay || today.getDate());
        setSelectedPersonCount(parsedState.selectedPersonCount || 1);
        setIsJobTypeCompleted(parsedState.isJobTypeCompleted || false);
        setIsDemolitionWorkCompleted(
          parsedState.isDemolitionWorkCompleted || false,
        );
        setIsEquipmentCompleted(parsedState.isEquipmentCompleted || false);
        setIsExperienceCompleted(parsedState.isExperienceCompleted || false);
        setIsWorkTimeCompleted(parsedState.isWorkTimeCompleted || false);
        setIsPersonCountCompleted(parsedState.isPersonCountCompleted || false);
      }
    } catch (error) {
      console.error("Failed to restore current state:", error);
    }
  };

  const handleJobTypeToggle = (jobTypeId: string) => {
    const isChanged = selectedJobTypes[0] !== jobTypeId;
    setSelectedJobTypes([jobTypeId]);

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
  };

  const handleJobTypeConfirm = () => {
    if (selectedJobTypes.length > 0) {
      setIsJobTypeCompleted(true);
    }
  };

  const handleDemolitionWorkConfirm = () => {
    if (selectedDemolitionWork.length > 0) {
      setIsDemolitionWorkCompleted(true);
    }
  };

  const handleEquipmentConfirm = () => {
    setIsEquipmentCompleted(true);
  };

  const handleExperienceConfirm = () => {
    if (selectedExperience.length > 0) {
      setIsExperienceCompleted(true);
    }
  };

  const handleWorkTimeConfirm = () => {
    if (workStartTime && workEndTime) {
      setIsWorkTimeCompleted(true);
    }
  };

  const handlePersonCountConfirm = () => {
    setIsPersonCountSelected(true);
    setIsPersonCountCompleted(true);
  };

  const handleJobTypeEdit = () => {
    setIsJobTypeCompleted(false);
    setIsEditing(true);
  };

  const handleDemolitionWorkEdit = () => {
    setIsDemolitionWorkCompleted(false);
    setIsEditing(true);
  };

  const handleEquipmentEdit = () => {
    setIsEquipmentCompleted(false);
    setIsEditing(true);
  };

  const handleExperienceEdit = () => {
    setIsExperienceCompleted(false);
    setIsEditing(true);
  };

  const handleWorkTimeEdit = () => {
    setIsWorkTimeCompleted(false);
    setIsEditing(true);
  };

  const handlePersonCountEdit = () => {
    setIsPersonCountCompleted(false);
    setIsEditing(true);
  };

  const handleJobTypeConfirmAfterEdit = () => {
    if (selectedJobTypes.length > 0) {
      setIsJobTypeCompleted(true);
    }
  };

  const handleDemolitionWorkConfirmAfterEdit = () => {
    if (selectedDemolitionWork.length > 0) {
      setIsDemolitionWorkCompleted(true);
    }
  };

  const handleEquipmentConfirmAfterEdit = () => {
    setIsEquipmentCompleted(true);
  };

  const handleExperienceConfirmAfterEdit = () => {
    if (selectedExperience.length > 0) {
      setIsExperienceCompleted(true);
    }
  };

  const handleWorkTimeConfirmAfterEdit = () => {
    if (workStartTime && workEndTime) {
      setIsWorkTimeCompleted(true);
    }
  };

  const handlePersonCountConfirmAfterEdit = () => {
    setIsPersonCountSelected(true);
    setIsPersonCountCompleted(true);
  };

  const calculateEstimatedCost = () => {
    if (!isPersonCountSelected) return { min: 0, max: 0 };

    const baseCost = 150000;
    const totalCost = baseCost * selectedPersonCount;
    const minCost = Math.floor(totalCost * 0.9);
    const maxCost = Math.floor(totalCost * 1.1);

    return { min: minCost, max: maxCost };
  };

  const handleComplete = () => {
    if (isEditing) {
      // 편집 모드일 때: 기존 jobPost 업데이트
      setJobPosts((prev) => {
        const updatedJobPosts = prev.map((jobPost) => {
          // 현재 상태와 일치하는 jobPost를 찾아서 업데이트
          if (
            jobPost.activeCategory === activeCategory &&
            jobPost.selectedDemolitionWork.length ===
              selectedDemolitionWork.length &&
            jobPost.selectedDemolitionWork.every((item) =>
              selectedDemolitionWork.includes(item),
            )
          ) {
            return {
              ...jobPost,
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
              estimatedCost: calculateEstimatedCost(),
            };
          }
          return jobPost;
        });
        return updatedJobPosts;
      });

      // 편집 모드 종료
      setIsEditing(false);
    } else {
      // 새 업무 추가 모드일 때: 새로운 jobPost 생성
      const newJobPost: JobPost = {
        id: Date.now().toString(),
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
        estimatedCost: calculateEstimatedCost(),
      };

      setJobPosts((prev) => [...prev, newJobPost]);
    }

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
    setExpandedSection(null); // 설정완료 후 하단바 닫기
  };

  const handleDeleteJobPost = (id: string) => {
    setJobPosts((prev) => {
      const updatedJobPosts = prev.filter((jobPost) => jobPost.id !== id);
      // 삭제 후 업무가 없으면 새 업무 선택 화면으로 이동
      if (updatedJobPosts.length === 0) {
        // 상태 초기화 - "어떤 사람이 필요하신가요?" 화면으로 돌아가기
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
        setExpandedSection(null);
      }
      return updatedJobPosts;
    });
  };

  const handleEditJobPost = (jobPost: JobPost) => {
    console.log("handleEditJobPost called with:", jobPost);
    // 현재 상태를 저장
    saveCurrentState();

    // 편집할 jobPost의 상태로 설정
    setActiveCategory(jobPost.activeCategory);
    setSelectedDemolitionWork(jobPost.selectedDemolitionWork);
    setSelectedJobTypes(jobPost.selectedJobTypes);
    setSelectedEquipment(jobPost.selectedEquipment);
    setSelectedExperience(jobPost.selectedExperience);
    setWorkStartTime(jobPost.workStartTime);
    setWorkEndTime(jobPost.workEndTime);
    setWorkMonth(jobPost.workMonth);
    setWorkDay(jobPost.workDay);
    setSelectedPersonCount(jobPost.selectedPersonCount);
    setIsPersonCountSelected(true);
    setIsJobTypeCompleted(true);
    setIsDemolitionWorkCompleted(true);
    setIsEquipmentCompleted(true);
    setIsExperienceCompleted(true);
    setIsWorkTimeCompleted(true);
    setIsPersonCountCompleted(true);
    setIsEditing(true);
    setExpandedSection(null); // 편집 모드 진입 시 하단바 숨김
  };

  const handleAddNewJobPost = () => {
    console.log("handleAddNewJobPost called");
    // 현재 상태를 저장
    saveCurrentState();

    // 새로운 업무를 위한 초기 상태로 설정
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
    setExpandedSection(null); // 새 업무 추가 시 하단바 숨김
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
    expandedSection,
    setExpandedSection,

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
    saveCurrentState,
    restoreCurrentState,

    // 계산 함수
    calculateEstimatedCost,
  };
};
