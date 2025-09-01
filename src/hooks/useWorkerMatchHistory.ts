import { DUMMY_JOB_HISTORY, JobHistory } from "@/fixtures/jobHistory";
import { useState } from "react";

const TABS = ["리스트", "캘린더"] as const;
type Tab = (typeof TABS)[number];

export const useWorkerMatchHistory = () => {
  const [activeTab, setActiveTab] = useState<Tab>("리스트");
  const [jobHistory, setJobHistory] = useState<JobHistory[]>(DUMMY_JOB_HISTORY);

  return {
    tabs: TABS,
    activeTab,
    onTabChange: setActiveTab,
    jobHistory,
  };
};
