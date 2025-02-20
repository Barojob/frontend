import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { cva, VariantProps } from "class-variance-authority";
import React from "react";
import { cn } from "../../utils/classname";

type InputProps = VariantProps<typeof InputVariant> & {
  className?: string;
  value: string;
  onValueChange: (value: string) => void;
  type?: "text" | "password" | "email" | "textarea" | "number" | "tel";
  placeholder?: string;
  ref?: React.Ref<HTMLInputElement>;
};

const InputVariant = cva(
  "w-full text-left border-2 border-gray-200 focus:outline-none",
  {
    variants: {
      variant: {
        primary: "bg-white focus:border-gray-400 font-normal",
      },
      rounded: {
        full: "rounded-full",
        lg: "rounded-lg",
        md: "rounded-md",
      },
      size: {
        lg: "h-11 px-4 py-3.5 text-base",
        md: "h-auto px-3 py-2 text-base",
        sm: "h-8 px-2 py-1.5 text-sm",
      },
    },
    defaultVariants: {
      variant: "primary",
      rounded: "lg",
      size: "md",
    },
  }
);

const Input: React.FC<InputProps> = ({
  className,
  value,
  onValueChange,
  type = "text",
  placeholder,
  ref,
  ...props
}) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const inputClassName = cn(InputVariant(props), className);
  const handlePasswordVisibility = () => setShowPassword((prev) => !prev);

  // 📌 휴대폰 번호 자동 포맷 함수
  const formatPhoneNumber = (input: string) => {
    const onlyNumbers = input.replace(/[^0-9]/g, ""); // 숫자만 남기기
    if (onlyNumbers.length <= 3) return onlyNumbers;
    if (onlyNumbers.length <= 7)
      return `${onlyNumbers.slice(0, 3)}-${onlyNumbers.slice(3)}`;
    return `${onlyNumbers.slice(0, 3)}-${onlyNumbers.slice(
      3,
      7
    )}-${onlyNumbers.slice(7, 11)}`;
  };

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = event.target.value;
    if (type === "tel") {
      newValue = formatPhoneNumber(newValue);
    }
    onValueChange(newValue);
  };

  return (
    <div className={cn("relative w-full", className)} {...props}>
      {type === "textarea" ? (
        <textarea
          className={cn(inputClassName, "resize-none")}
          placeholder={placeholder}
        />
      ) : (
        <input
          className={inputClassName}
          ref={ref}
          type={type === "password" && showPassword ? "text" : type}
          value={value}
          placeholder={placeholder}
          maxLength={type === "tel" ? 13 : undefined} // 📌 전화번호는 13자 제한 (010-1234-5678)
          onChange={handleValueChange}
          inputMode={type === "tel" ? "numeric" : undefined} // 📌 모바일 키보드 숫자 전용 모드
        />
      )}

      {type === "password" && (
        <button
          className="absolute inset-y-0 right-3 flex items-center text-gray-500"
          type="button"
          aria-label={showPassword ? "Hide password" : "Show password"}
          onClick={handlePasswordVisibility}
        >
          {showPassword ? (
            <EyeIcon className="size-5" />
          ) : (
            <EyeSlashIcon className="size-5" />
          )}
        </button>
      )}
    </div>
  );
};

export default Input;
export type { InputProps };
