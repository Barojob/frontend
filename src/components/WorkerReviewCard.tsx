import Button from "@/components/Button";
import { WorkerInfo } from "@/fixtures/matchingHistory";
import ProfileIcon from "@/svgs/ProfileIcon";
import StarIcon from "@/svgs/StarIcon";
import { cn } from "@/utils/classname";
import { useState } from "react";

type Props = {
  className?: string;
  worker: WorkerInfo;
  onRatingChange: (workerId: string, rating: number) => void;
  onReviewChange: (workerId: string, review: string) => void;
  onBlacklistToggle: (workerId: string) => void;
  onPriorityToggle: (workerId: string) => void;
  reviewDeadline?: string;
};

const WorkerReviewCard: React.FC<Props> = ({
  className,
  worker,
  onRatingChange,
  onReviewChange,
  onBlacklistToggle,
  onPriorityToggle,
  reviewDeadline,
}) => {
  const [rating, setRating] = useState(worker.rating || 0);
  const [review, setReview] = useState(worker.review || "");

  const ratingLabels: { [key: number]: string } = {
    1: "별로에요",
    2: "아쉬워요",
    3: "보통이예요",
    4: "좋아요",
    5: "최고예요",
  };

  const handleRatingClick = (newRating: number) => {
    setRating(newRating);
    onRatingChange(worker.id, newRating);
  };

  const handleReviewChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const newReview = event.target.value;
    setReview(newReview);
    onReviewChange(worker.id, newReview);
  };

  const handleBlacklistClick = () => {
    onBlacklistToggle(worker.id);
  };

  const handlePriorityClick = () => {
    onPriorityToggle(worker.id);
  };

  return (
    <div className={cn("rounded-[0.625rem] bg-white p-5", className)}>
      <div className="flex">
        <div className="flex-shrink-0">
          <ProfileIcon />
          <p className="mt-1 text-center text-sm font-semibold text-neutral-700">
            {worker.name}
          </p>
        </div>
        <div className="flex flex-col gap-2.5 px-5 text-xs">
          <div className="flex gap-3.5">
            <span className="text-gray-500">요청 업무</span>
            <span className="font-medium text-neutral-600">
              {worker.jobType}
            </span>
          </div>

          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => handleRatingClick(star)}
                className=""
              >
                <StarIcon
                  className={cn(star <= rating ? "opacity-100" : "opacity-30")}
                  size={24}
                />
              </button>
            ))}
            {rating > 0 && (
              <span className="ml-4 text-xs text-gray-500">
                {ratingLabels[rating]}
              </span>
            )}
          </div>
          {rating == 0 && reviewDeadline && (
            <div className="flex gap-0.5 text-xs text-gray-500">
              <p>리뷰작성기간:</p>
              <p>{reviewDeadline}까지</p>
            </div>
          )}
        </div>
      </div>
      {rating > 0 && (
        <>
          <div className="my-2">
            <textarea
              value={review}
              onChange={handleReviewChange}
              placeholder="근로자 후기를 자세히 알려주세요 (선택)"
              className="w-full rounded-[0.625rem] border border-gray-300 p-2.5 text-xs focus:outline-none"
              rows={2}
            />
          </div>

          <div className="flex gap-4 text-sm font-bold">
            <Button
              size="md"
              theme={worker.isBlacklisted ? "secondary" : "tertiary"}
              className="w-full"
              onClick={handleBlacklistClick}
            >
              블랙리스트 추가
            </Button>
            <Button
              onClick={handlePriorityClick}
              size="md"
              theme={worker.isPriorityMatched ? "secondary" : "tertiary"}
              className="w-full"
            >
              우선매칭하기
            </Button>
          </div>

          {(worker.isPriorityMatched || worker.isBlacklisted) && (
            <div className="text-blue-1 mt-2 text-center text-xs">
              {worker.isPriorityMatched &&
                "앞으로 이 근로자를 우선적으로 매칭합니다"}
              {worker.isBlacklisted && "앞으로 이 근로자를 만나지 않습니다"}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default WorkerReviewCard;
