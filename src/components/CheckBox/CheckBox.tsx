import React from "react";
import { cn } from "../../utils/classname";

type Props = {
  className?: string;
  isChecked?: boolean;
  onToggle: () => void;
  label?: string;
};

const CheckBox: React.FC<Props> = ({
  className,
  isChecked,
  onToggle,
  label,
}) => {
  return (
    <div
      className="flex w-full flex-row items-center font-normal"
      onClick={onToggle}
    >
      <svg
        viewBox="0 0 24 23"
        xmlns="http://www.w3.org/2000/svg"
        className={cn(
          "flex size-7 cursor-pointer items-center justify-center transition-all duration-100",
          isChecked ? "fill-extraBlack-1" : "fill-gray-300",
          className, // 클릭하면 색상 변경
        )}
      >
        <path
          d="M8.5 12L11 15L16.5 9M7.8 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21Z"
          stroke="#ffffff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <div
        className={cn(
          "ml-1 text-sm duration-100",
          isChecked ? "text-black-1" : "text-gray-400",
        )}
      >
        {label}
      </div>
      <div className="ml-auto border-b border-gray-400 text-[12px] leading-none text-gray-400">
        보기
      </div>
    </div>
  );
};

export default CheckBox;
