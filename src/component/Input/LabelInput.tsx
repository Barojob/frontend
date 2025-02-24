import React from "react";
import { cn } from "../../utils/classname";
import Input, { InputProps } from "./Input";

type BorderedLabelInputProps = InputProps & {
  className?: string;
  label: string;
  error?: string;
  readOnly?: boolean;
};

const BorderedLabelInput: React.FC<BorderedLabelInputProps> = ({
  className,
  label,
  error,
  readOnly,
  ...props
}) => {
  return (
    <div className={cn("w-full", className)}>
      {/* border와 패딩을 가진 컨테이너 */}
      <div className="flex flex-col border border-gray-200 focus-within:border-gray-500 rounded-md p-2">
        {/* Label을 border 상단에 배치 (배경색으로 컨테이너 배경을 덮음) */}
        <label className=" bg-white px-1 font-normal text-xs text-gray-400">
          {label}
        </label>
        {/* Input은 자체 border를 제거하고 컨테이너의 전체 넓이를 사용 */}
        <Input
          {...props}
          className={cn("w-full px-0.5 pt-0 pb-0 border-none", className)}
        />
      </div>
      {error && <p className="text-red-500 mt-1 text-sm">{error}</p>}
    </div>
  );
};

export default BorderedLabelInput;
