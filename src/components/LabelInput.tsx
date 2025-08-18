import React from "react";
import type { Nullable } from "../types/misc";
import { cn } from "../utils/classname";
import Input, { InputProps } from "./Input";

export type LabelInputProps = InputProps & {
  className?: string;
  ref?: React.Ref<Nullable<HTMLInputElement>>;
  label: string;
  error?: string;
  tabIndex?: number;
};

const LabelInput: React.FC<LabelInputProps> = ({
  className,
  ref,
  label,
  error,
  ...props
}) => {
  return (
    <div className={cn("w-full", className)}>
      {/* border와 패딩을 가진 컨테이너 */}
      <div className="flex flex-col rounded-md border border-gray-200 p-2 focus-within:border-gray-500">
        {/* Label을 border 상단에 배치 (배경색으로 컨테이너 배경을 덮음) */}
        <label className="bg-white px-1 text-xs font-normal text-gray-400">
          {label}
        </label>
        {/* Input에 ref 전달 */}
        <Input
          {...props}
          ref={ref}
          className={cn("w-full border-none px-1 pb-0 pt-0.5", className)}
        />
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default LabelInput;
