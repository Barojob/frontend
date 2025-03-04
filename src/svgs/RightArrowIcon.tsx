import { cn } from "../utils/classname";

type Props = {
  className?: string;
  onClick?: () => void;
  onTouchStart?: () => void;
};

const RightArrowIcon: React.FC<Props> = ({
  className,
  onClick,
  onTouchStart,
}) => {
  return (
    <button onClick={onClick} onTouchStart={onTouchStart}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="7"
        height="12"
        viewBox="0 0 7 12"
        className={cn("fill-none", className)}
      >
        <path
          d="M1 1L6 6L1 11"
          stroke="#494949"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>
  );
};

export default RightArrowIcon;
