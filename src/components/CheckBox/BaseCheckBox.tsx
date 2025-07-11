import React from "react";
import { cn } from "../../utils/classname";

type BaseCheckBoxProps = {
  className?: string;
  isChecked?: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  name?: string;
  value?: string;
  id?: string;
};

const BaseCheckBox: React.FC<BaseCheckBoxProps> = ({
  className,
  isChecked = false,
  onChange,
  disabled = false,
  size = "md",
  name,
  value,
  id,
}) => {
  const sizeClasses = {
    sm: "size-5",
    md: "size-7",
    lg: "size-9",
  };

  const handleClick = () => {
    if (!disabled) {
      onChange(!isChecked);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked);
  };

  return (
    <div className="relative inline-block">
      {/* 숨겨진 실제 input checkbox - form 제출 및 접근성을 위함 */}
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleInputChange}
        disabled={disabled}
        name={name}
        value={value}
        id={id}
        className="pointer-events-none absolute opacity-0"
        tabIndex={-1}
      />

      {/* 시각적 체크박스 */}
      <svg
        viewBox="0 0 24 23"
        xmlns="http://www.w3.org/2000/svg"
        className={cn(
          "flex cursor-pointer items-center justify-center transition-all duration-100",
          sizeClasses[size],
          isChecked ? "fill-blue-600" : "fill-gray-100",
          disabled && "cursor-not-allowed opacity-50",
          className,
        )}
        onClick={handleClick}
      >
        <path
          d="M8.5 12L11 15L16.5 9M7.8 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21Z"
          stroke="#ffffff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export default BaseCheckBox;
