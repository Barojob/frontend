import DirectMatchIcon from "../../svgs/DirectMatchIcon";
import SmartMatchIcon from "../../svgs/SmartMatchIcon";
import { cn } from "../../utils/classname";

interface MatchingCardProps {
  type: "smart" | "direct";
  className?: string;
  onClick?: () => void;
  isSelected?: boolean;
}

const MatchingCard: React.FC<MatchingCardProps> = ({
  type,
  className,
  onClick,
  isSelected = false,
}) => {
  const config = {
    smart: {
      title: "스마트 매칭",
      subtitle: "요청사항에 맞는 최기적의 근로자를 자동 배정",
      content: "매칭 완료시 근로자 변경이 어렵습니다",
      icon: <SmartMatchIcon />,
    },
    direct: {
      title: "직접 매칭",
      subtitle: "인부 리스트에서 직접 고르기",
      content: "근로자가 요청을 거절할 경우 비슷한 인력으로 자동 변경됩니다",
      icon: <DirectMatchIcon />,
    },
  };

  const currentConfig = config[type];

  return (
    <div
      className={cn(
        "cursor-pointer flex-col rounded-[0.625rem] border border-zinc-300 bg-white px-5 py-4 transition-all focus:outline-none",
        isSelected &&
          "border-blue-600 shadow-[0px_0px_10px_0px_rgba(36,122,242,0.25)]",
        className,
      )}
      onClick={onClick}
    >
      <div className="flex items-center gap-2">
        <p className="text-[1.0625rem] font-bold text-blue-500">
          {currentConfig.title}
        </p>
        <span className="text-xl">{currentConfig.icon}</span>
      </div>

      <p className="mb-2 mt-1 text-xs font-medium text-neutral-600">
        {currentConfig.subtitle}
      </p>
      <p className="text-[0.625rem] text-zinc-500">{currentConfig.content}</p>
    </div>
  );
};

export default MatchingCard;
