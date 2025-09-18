import Button from "@/components/Button";
import NavigationHeader from "@/components/NavigationHeader";
import WorkerReviewCard from "@/components/WorkerReviewCard";
import {
  MatchingHistoryItem,
  WorkerInfo,
  matchingHistoryData,
} from "@/fixtures/matchingHistory";
import MatchIcon from "@/svgs/MatchIcon";
import { formatTopDate } from "@/utils/formatDate";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ReviewWritePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // 실제로는 API에서 데이터를 가져와야 하지만, 여기서는 목업 데이터 사용
  const matchingData: MatchingHistoryItem | undefined =
    matchingHistoryData.find((entry) => entry.id === id);

  const [workers, setWorkers] = useState<WorkerInfo[]>(
    matchingData?.workers || [],
  );

  const handleRatingChange = (workerId: string, rating: number) => {
    setWorkers((prev) =>
      prev.map((worker) =>
        worker.id === workerId ? { ...worker, rating } : worker,
      ),
    );
  };

  const handleReviewChange = (workerId: string, review: string) => {
    setWorkers((prev) =>
      prev.map((worker) =>
        worker.id === workerId ? { ...worker, review } : worker,
      ),
    );
  };

  const handleBlacklistToggle = (workerId: string) => {
    setWorkers((prev) =>
      prev.map((worker) => {
        if (worker.id !== workerId) return worker;
        const nextBlacklisted = !worker.isBlacklisted;
        return {
          ...worker,
          isBlacklisted: nextBlacklisted,
          // 상호배타: 블랙리스트가 켜지면 우선매칭은 반드시 꺼짐
          isPriorityMatched: nextBlacklisted ? false : worker.isPriorityMatched,
        };
      }),
    );
  };

  const handlePriorityToggle = (workerId: string) => {
    setWorkers((prev) =>
      prev.map((worker) => {
        if (worker.id !== workerId) return worker;
        const nextPriority = !worker.isPriorityMatched;
        return {
          ...worker,
          isPriorityMatched: nextPriority,
          // 상호배타: 우선매칭이 켜지면 블랙리스트는 반드시 꺼짐
          isBlacklisted: nextPriority ? false : worker.isBlacklisted,
        };
      }),
    );
  };

  const handleSubmit = () => {
    // 리뷰 제출 로직
    console.log("리뷰 제출:", workers);
    navigate("/matching-list");
  };

  if (!matchingData) {
    return (
      <div className="safe-area-top flex h-screen w-full flex-col bg-white">
        <NavigationHeader title="리뷰 작성" backTo="/matching-list" />
        <div className="flex flex-1 items-center justify-center">
          <p className="text-gray-500">매칭 내역을 찾을 수 없습니다.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="safe-area-top flex h-screen w-full flex-col bg-white">
      <div className="flex-shrink-0 bg-white px-6">
        <NavigationHeader title="평가 및 리뷰 작성" backTo="/matching-list" />
        <div className="mt-6.5 flex flex-col gap-1 pb-5 text-2xl font-bold text-neutral-600">
          <p className="flex items-center gap-2">
            <MatchIcon className="mr-2" />
            {formatTopDate(matchingData.date)}
            <span className="text-blue-1">
              총 {matchingData.workers.length}명
            </span>
            <br />
          </p>
          <p className="text-left">근로자분은 어떠셨나요?</p>
        </div>
      </div>

      <div className="bg-main-1 flex-1 overflow-hidden">
        <div className="py-5.5 h-full space-y-3 overflow-y-auto px-6 pb-24">
          {workers.map((worker) => (
            <WorkerReviewCard
              key={worker.id}
              worker={worker}
              reviewDeadline={formatTopDate(matchingData.requestDate)}
              onRatingChange={handleRatingChange}
              onReviewChange={handleReviewChange}
              onBlacklistToggle={handleBlacklistToggle}
              onPriorityToggle={handlePriorityToggle}
            />
          ))}
        </div>
        <div className="safe-area-bottom fixed inset-x-0 bottom-0 px-6">
          <Button
            onClick={handleSubmit}
            size="xl"
            theme="primary"
            block
            className="font-bold"
          >
            리뷰 저장하기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReviewWritePage;
