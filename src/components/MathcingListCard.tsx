import Button from "@/components/Button";
import MatchIcon from "@/svgs/MatchIcon";
import { cn } from "@/utils/classname";
import { formatCardDate, formatTopDate } from "@/utils/formatDate";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

type Props = {
  className?: string;
  id: string;
  date: string;
  worker: string;
  address: string;
  wage: number;
  requestDate: string; // 요청일 (리뷰 작성 가능 기간 계산용)
};

const MathcingListCard: React.FC<Props> = ({
  className,
  id,
  date,
  worker,
  address,
  wage,
  requestDate,
}) => {
  const navigate = useNavigate();
  const isReviewAvailable = dayjs().diff(dayjs(requestDate), "day") <= 5;

  const handleReviewClick = () => {
    navigate(`/review-write/${id}`);
  };

  const handleInquiryClick = () => {
    // 문의하기 페이지로 이동
    console.log("문의하기 클릭");
  };

  const handlePaymentClick = () => {
    // 결제내역 페이지로 이동
    console.log("결제내역 클릭");
  };

  return (
    <div
      className={cn(
        "flex flex-col rounded-2xl bg-white p-5 shadow-sm",
        className,
      )}
    >
      <div className="mb-4 flex gap-2">
        <MatchIcon />
        <p className="text-gray-3 text-left text-xl font-bold">
          {formatTopDate(date)}
        </p>
      </div>

      <div className="mb-6 space-y-1">
        <div className="flex items-center">
          <span className="w-18 text-sm text-gray-600">날짜</span>
          <span className="text-sm font-medium text-gray-900">
            {formatCardDate(date)}
          </span>
        </div>
        <div className="flex items-center">
          <span className="w-18 text-sm text-gray-600">요청 인력</span>
          <span className="text-sm font-medium text-gray-900">{worker}</span>
        </div>
        <div className="flex items-center">
          <span className="w-18 text-sm text-gray-600">주소</span>
          <span className="text-sm font-medium text-gray-900">{address}</span>
        </div>
        <div className="flex items-center">
          <span className="w-18 text-sm text-gray-600">총 일당</span>
          <span className="text-sm font-medium text-gray-900">
            {wage.toLocaleString()}원
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-2 text-sm font-bold">
        {isReviewAvailable && (
          <Button onClick={handleReviewClick} size="md" theme="secondary" block>
            리뷰작성하러가기
          </Button>
        )}
        <div className="flex gap-4">
          <Button onClick={handleInquiryClick} size="md" theme="tertiary" block>
            문의하기
          </Button>

          <Button
            onClick={handlePaymentClick}
            size="md"
            theme="secondary"
            block
          >
            결제내역
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MathcingListCard;
