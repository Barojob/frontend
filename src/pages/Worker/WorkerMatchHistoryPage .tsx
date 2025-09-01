import JobHistoryCard from "@/components/JobHistoryCard";
import NavigationHeader from "@/components/NavigationHeader";
import Tabs from "@/components/Tabs";
import { useWorkerMatchHistory } from "@/hooks/useWorkerMatchHistory";
import React from "react";

const WorkerMatchHistoryPage: React.FC = () => {
  const { tabs, activeTab, onTabChange, jobHistory } = useWorkerMatchHistory();

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationHeader title="매칭 내역" backTo="/" />
      <Tabs tabs={tabs} activeTab={activeTab} onTabChange={onTabChange} />

      <main className="p-4">
        {activeTab === "리스트" && (
          <div className="space-y-4">
            {jobHistory.map((job) => (
              <JobHistoryCard key={job.id} job={job} />
            ))}
          </div>
        )}

        {activeTab === "캘린더" && (
          <div className="flex h-96 items-center justify-center rounded-xl bg-white text-gray-400">
            {/* FIXME: 캘린더 UI 구현 필요 */}
            캘린더 UI가 여기에 표시됩니다.
          </div>
        )}
      </main>
    </div>
  );
};

export default WorkerMatchHistoryPage;
