import Button from "@/components/Button";
import Calendar from "@/components/Calendar";
import MathcingListCard from "@/components/MathcingListCard";
import NavigationHeader from "@/components/NavigationHeader";
import Tab from "@/components/Tab";
import { matchingHistoryData } from "@/fixtures/matchingHistory";
import NothingIcon from "@/svgs/NothingIcon";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const MatchingListPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"list" | "calendar">("list");
  const [hasMatchingHistory] = useState(true);
  const [selectedDate, setSelectedDate] = useState<string>("");

  const navigate = useNavigate();

  const handleGoToMatching = () => {
    navigate("/");
  };

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
  };

  // 캘린더에서 항목 클릭 시 별도의 동작이 필요해지면 여기서 구현

  return (
    <div className="safe-area-top flex h-screen w-full flex-col bg-white">
      <div className="flex-shrink-0 bg-white px-6">
        <NavigationHeader title="매칭 내역" backTo="/" />
        <div className="mt-6 flex items-center justify-between px-12">
          <Tab
            isActive={activeTab === "list"}
            onClick={() => setActiveTab("list")}
          >
            리스트
          </Tab>
          <Tab
            isActive={activeTab === "calendar"}
            onClick={() => setActiveTab("calendar")}
          >
            캘린더
          </Tab>
        </div>
      </div>
      <div className="bg-main-1 flex-1 overflow-hidden">
        {hasMatchingHistory ? (
          activeTab === "list" ? (
            <div className="h-full overflow-y-auto px-6 py-6 pb-12">
              <div className="space-y-3">
                {matchingHistoryData.map((item) => (
                  <MathcingListCard
                    key={item.id}
                    id={item.id}
                    date={item.date}
                    worker={item.worker}
                    address={item.address}
                    wage={item.wage}
                    requestDate={item.requestDate}
                    contactPhone={"010-1234-5678"}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="h-full overflow-y-auto px-6 py-6 pb-24">
              <Calendar
                items={matchingHistoryData.map((item) => ({
                  id: item.id,
                  date: item.date,
                  worker: item.worker,
                  address: item.address,
                  wage: item.wage,
                  requestDate: item.requestDate,
                  contactPhone: "010-1234-5678",
                }))}
                onDateSelect={handleDateSelect}
                selectedDate={selectedDate}
              />
            </div>
          )
        ) : (
          <div className="flex h-full flex-col items-center justify-center px-6">
            <div className="flex flex-1 flex-col items-center justify-center">
              <NothingIcon className="size-15 mb-5" />
              <div className="text-center">
                <div className="font-semibold text-neutral-800">
                  매칭 내역이 없어요
                  <br />
                  지금 바로 매칭을 시작해보세요
                </div>
              </div>
            </div>
            <div className="w-full pb-6">
              <Button
                onClick={handleGoToMatching}
                size="xl"
                theme="primary"
                block
                className="font-bold"
              >
                매칭하러 가기
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchingListPage;
