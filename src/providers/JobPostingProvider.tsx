import React, { createContext, ReactNode, useContext, useState } from "react";
import { getPerPersonAmount } from "../utils/jobPostingHelpers";

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

interface JobPostingContextType {
  // 상태
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
  specialNote: string;
  isPersonCountSelected: boolean;
  isJobTypeCompleted: boolean;
  isDemolitionWorkCompleted: boolean;
  isEquipmentCompleted: boolean;
  isExperienceCompleted: boolean;
  isWorkTimeCompleted: boolean;
  isPersonCountCompleted: boolean;
  isSpecialNoteOpen: boolean;
  isEditing: boolean;
  isAddingNewJob: boolean;
  jobPosts: JobPost[];
  expandedSection:
    | "jobType"
    | "demolitionWork"
    | "equipment"
    | "experience"
    | "workTime"
    | "personCount"
    | "specialNote"
    | null;
  selectedMatchingType: "smart" | "direct" | null;

  // 핸들러
  handleJobTypeToggle: (jobTypeId: string) => void;
  handleDemolitionWorkToggle: (demolitionWorkId: string) => void;
  handleEquipmentToggle: (equipmentId: string) => void;
  handleExperienceToggle: (experienceId: string) => void;
  handleWorkTimeChange: (startTime: string, endTime: string) => void;
  handleWorkDateChange: (month: number, day: number) => void;
  handlePersonCountChange: (count: number) => void;
  handleCategoryChange: (category: string) => void;
  handleJobTypeConfirm: () => void;
  handleDemolitionWorkConfirm: () => void;
  handleEquipmentConfirm: () => void;
  handleExperienceConfirm: () => void;
  handleWorkTimeConfirm: () => void;
  handlePersonCountConfirm: () => void;
  setSpecialNote: (note: string) => void;
  setIsSpecialNoteOpen: (isOpen: boolean) => void;

  // 편집 핸들러
  handleJobTypeEdit: () => void;
  handleDemolitionWorkEdit: () => void;
  handleEquipmentEdit: () => void;
  handleExperienceEdit: () => void;
  handleWorkTimeEdit: () => void;
  handlePersonCountEdit: () => void;

  // 편집 후 자동 완료 핸들러
  handleJobTypeConfirmAfterEdit: () => void;
  handleDemolitionWorkConfirmAfterEdit: () => void;
  handleEquipmentConfirmAfterEdit: () => void;
  handleExperienceConfirmAfterEdit: () => void;
  handleWorkTimeConfirmAfterEdit: () => void;
  handlePersonCountConfirmAfterEdit: () => void;

  // 주요 액션
  handleComplete: () => void;
  handleDeleteJobPost: (id: string) => void;
  handleEditJobPost: (jobPost: JobPost) => void;
  handleAddNewJobPost: () => void;
  handleCancelEditOrAdd: () => void;
  setExpandedSection: (
    section:
      | "jobType"
      | "demolitionWork"
      | "equipment"
      | "experience"
      | "workTime"
      | "personCount"
      | "specialNote"
      | null,
  ) => void;
  handleMatchingTypeSelect: (type: "smart" | "direct") => void;
}

const JobPostingContext = createContext<JobPostingContextType | undefined>(
  undefined,
);

export const useJobPosting = () => {
  const context = useContext(JobPostingContext);
  if (context === undefined) {
    throw new Error("useJobPosting must be used within a JobPostingProvider");
  }
  return context;
};

interface JobPostingProviderProps {
  children: ReactNode;
}

export const JobPostingProvider: React.FC<JobPostingProviderProps> = ({
  children,
}) => {
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
  const [isAddingNewJob, setIsAddingNewJob] = useState(false);

  const [jobPosts, setJobPosts] = useState<JobPost[]>([]);

  // 매칭 방식 선택 상태
  const [selectedMatchingType, setSelectedMatchingType] = useState<
    "smart" | "direct" | null
  >(null);

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

  const calculateEstimatedCost = () => {
    if (!isPersonCountSelected) return { min: 0, max: 0 };

    const perPersonAmount = getPerPersonAmount({
      selectedJobTypes,
      selectedDemolitionWork,
      selectedEquipment,
    });

    const totalCost = perPersonAmount * selectedPersonCount;
    const minCost = Math.floor(totalCost * 0.9);
    const maxCost = Math.floor(totalCost * 1.1);

    return { min: minCost, max: maxCost };
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
    setIsAddingNewJob(false);
    setSpecialNote("");
    setIsSpecialNoteOpen(false);
    setExpandedSection(null);
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
    // 편집 모드에서는 모든 스텝을 완료된 상태로 설정하여 기존 내용이 선택된 상태로 표시
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
    setIsAddingNewJob(true);
    setExpandedSection("jobType");
  };

  const handleMatchingTypeSelect = (type: "smart" | "direct") => {
    setSelectedMatchingType(type);
  };

  const handleCancelEditOrAdd = () => {
    // 편집 또는 새 업무 추가 모드 취소
    setIsEditing(false);
    setIsAddingNewJob(false);

    // 모든 완료 상태 초기화
    setIsJobTypeCompleted(false);
    setIsDemolitionWorkCompleted(false);
    setIsEquipmentCompleted(false);
    setIsExperienceCompleted(false);
    setIsWorkTimeCompleted(false);
    setIsPersonCountCompleted(false);

    // 선택된 항목들 초기화
    setSelectedJobTypes([]);
    setSelectedDemolitionWork([]);
    setSelectedEquipment([]);
    setSelectedExperience([]);
    setWorkStartTime("09:00");
    setWorkEndTime("18:00");
    setWorkMonth(today.getMonth() + 1);
    setWorkDay(today.getDate());
    setSelectedPersonCount(1);
    setActiveCategory("general");

    // 확장된 섹션 닫기
    setExpandedSection(null);
  };

  const value: JobPostingContextType = {
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
    isAddingNewJob,
    jobPosts,
    expandedSection,
    selectedMatchingType,

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

    // 주요 액션
    handleComplete,
    handleDeleteJobPost,
    handleEditJobPost,
    handleAddNewJobPost,
    handleCancelEditOrAdd,
    setExpandedSection,
    handleMatchingTypeSelect,
  };

  return (
    <JobPostingContext.Provider value={value}>
      {children}
    </JobPostingContext.Provider>
  );
};
