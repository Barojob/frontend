import { EQUIPMENT_LIST, JOB_LIST, JobCategory } from "@/fixtures/jobs";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

export const useWorkerDetails = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<JobCategory | "">(
    "",
  );
  const [selectedJobs, setSelectedJobs] = useState<string[]>([]);
  const [selectedEquipments, setSelectedEquipments] = useState<string[]>([]);
  const [showPreparingModal, setShowPreparingModal] = useState(false);

  const wageRange = useMemo(() => {
    if (selectedJobs.length === 0 || selectedEquipments.length === 0) {
      return { min: 0, max: 0 };
    }

    const selectedJobWages = JOB_LIST.filter((job) =>
      selectedJobs.includes(job.name),
    ).map((job) => job.dailyWage);

    const selectedEquipmentPays = EQUIPMENT_LIST.filter((eq) =>
      selectedEquipments.includes(eq.name),
    ).map((eq) => eq.additionalPay);

    if (selectedJobWages.length === 0 || selectedEquipmentPays.length === 0) {
      return { min: 0, max: 0 };
    }

    const minJobWage = Math.min(...selectedJobWages);
    const maxJobWage = Math.max(...selectedJobWages);
    const maxEquipmentPay = Math.max(...selectedEquipmentPays);

    return {
      min: minJobWage,
      max: maxJobWage + maxEquipmentPay,
    };
  }, [selectedJobs, selectedEquipments]);

  const handleCategorySelect = (category: JobCategory) => {
    if (category === "기능공") {
      setShowPreparingModal(true);
      return;
    }
    setSelectedCategory(category);
    setSelectedJobs([]);
    setSelectedEquipments([]);
  };

  const handleJobToggle = (job: string) => {
    setSelectedJobs((prev) =>
      prev.includes(job) ? prev.filter((j) => j !== job) : [...prev, job],
    );
    setSelectedEquipments([]);
  };

  const handleEquipmentToggle = (equipment: string) => {
    setSelectedEquipments((prev) => {
      if (equipment === "없음") {
        return prev.includes("없음") ? [] : ["없음"];
      }

      const newSelection = prev.filter((p) => p !== "없음");
      return newSelection.includes(equipment)
        ? newSelection.filter((p) => p !== equipment)
        : [...newSelection, equipment];
    });
  };

  const handleSubmit = () => {
    // FIXME: 선택된 직무, 장비 데이터를 API로 전송하는 로직 필요
    navigate("/");
  };

  return {
    selectedCategory,
    selectedJobs,
    selectedEquipments,
    wageRange,
    showPreparingModal,
    setShowPreparingModal,
    handleCategorySelect,
    handleJobToggle,
    handleEquipmentToggle,
    handleSubmit,
  };
};
