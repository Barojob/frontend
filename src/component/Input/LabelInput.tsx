import { forwardRef } from "react";
import { cn } from "../../utils/classname";
import Input, { InputProps } from "./Input";

export type LabelInputProps = InputProps & {
  className?: string;
  label: string;
  error?: string;
  readOnly?: boolean;
};

const LabelInput = forwardRef<HTMLInputElement, LabelInputProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className={cn("w-full", className)}>
        {/* border와 패딩을 가진 컨테이너 */}
        <div className="flex flex-col border border-gray-200 focus-within:border-gray-500 rounded-md p-2">
          {/* Label을 border 상단에 배치 (배경색으로 컨테이너 배경을 덮음) */}
          <label className="bg-white px-1 font-normal text-xs text-gray-400">
            {label}
          </label>
          {/* Input에 ref 전달 */}
          <Input
            {...props}
            ref={ref}
            className={cn("w-full px-1 pt-0.5 pb-0 border-none", className)}
          />
        </div>
        {error && <p className="text-red-500 mt-1 text-sm">{error}</p>}
      </div>
    );
  }
);

LabelInput.displayName = "LabelInput";
export default LabelInput;
