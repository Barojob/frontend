import NavigationHeader from "@/components/NavigationHeader";
import Tab from "@/components/Tab";
import React, { useState } from "react";

const MatchingListPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"list" | "calendar">("list");
  const handleTabClick = (tab: "list" | "calendar") => {
    setActiveTab(tab);
  };
  return (
    <div className="safe-area-top flex h-screen w-full flex-col bg-white">
      <div className="flex-shrink-0 bg-white px-6">
        <NavigationHeader title="매칭 내역" backTo="/" />
        <div className="mt-6 flex items-center justify-between px-12">
          <Tab
            isActive={activeTab === "list"}
            onClick={() => handleTabClick("list")}
          >
            리스트
          </Tab>
          <Tab
            isActive={activeTab === "calendar"}
            onClick={() => handleTabClick("calendar")}
          >
            캘린더
          </Tab>
        </div>
      </div>
      <div className="bg-main-1 safe-area-bottom flex-1">
        <div className="flex flex-col items-center justify-center">
          <div className="text-2xl font-bold text-gray-900">매칭 내역</div>
        </div>
      </div>
    </div>
  );
};

export default MatchingListPage;
