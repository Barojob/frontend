import { JobHistory } from "@/fixtures/jobHistory";
// import WorkerIcon from "."; // 삭제: 아이콘 직접 사용
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import React from "react";
import Button from "./Button";

type JobHistoryCardProps = {
  job: JobHistory;
};

const JobHistoryCard: React.FC<JobHistoryCardProps> = ({ job }) => {
  const detailItems = [
    { label: "날짜", value: job.date },
    { label: "근무지 주소", value: job.location },
    {
      label: "받은 일당",
      value: `${job.dailyWage.toLocaleString("ko-KR")}원`,
    },
    { label: "일한 시간", value: job.workHours },
  ];

  return (
    <div className="rounded-xl bg-white p-4 shadow-md">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-x-2">
          <img
            src="/images/employer.svg"
            alt="근로자 아이콘"
            className="h-6 w-6"
          />
          <span className="font-bold">{job.type}</span>
          <ChevronRightIcon className="size-4 text-gray-400" />
        </div>
        <button className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-500 hover:bg-gray-200">
          삭제
        </button>
      </header>

      <section className="mt-4 space-y-2 border-t border-gray-100 pt-4">
        {detailItems.map(({ label, value }) => (
          <div key={label} className="flex justify-between text-sm">
            <span className="text-gray-500">{label}</span>
            <span className="font-medium text-gray-800">{value}</span>
          </div>
        ))}
      </section>

      <footer className="mt-4">
        <Button theme="secondary" size="md" block>
          문의사항
        </Button>
      </footer>
    </div>
  );
};

export default JobHistoryCard;
