import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { cva, VariantProps } from "class-variance-authority";
import React from "react";
import { cn } from "../../utils/classname";

const InputVariant = cva(
  "w-full text-left border border-gray-200 focus:outline-hidden",
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
  },
);

export type InputProps = {
  className?: string;
  value: string;
  onValueChange: (value: string) => void;
} & VariantProps<typeof InputVariant> &
  Omit<React.ComponentPropsWithRef<"input">, "size">;

const Input: React.FC<InputProps> = ({
  className,
  ref,
  value,
  onValueChange,
  type = "text",
  placeholder,
  autoFocus,
  readOnly,
  inputMode,
  pattern,
  ...props
}) => {
  const [showPassword, setShowPassword] = React.useState(false);

  // 분리해서 'size'를 HTML 엘리먼트로 전달하지 않음
  const { size, ...restProps } = props;
  const inputClassName = cn(InputVariant({ size, ...restProps }), className);

  const handlePasswordVisibility = () => setShowPassword((prev) => !prev);

  // 휴대폰 번호 자동 포맷 함수
  const formatPhoneNumber = (input: string) => {
    const onlyNumbers = input.replace(/[^0-9]/g, "");
    if (onlyNumbers.length <= 3) return onlyNumbers;
    if (onlyNumbers.length <= 7)
      return `${onlyNumbers.slice(0, 3)}-${onlyNumbers.slice(3)}`;
    return `${onlyNumbers.slice(0, 3)}-${onlyNumbers.slice(
      3,
      7,
    )}-${onlyNumbers.slice(7, 11)}`;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = event.target.value;
    if (type === "tel") {
      newValue = formatPhoneNumber(newValue);
    }
    onValueChange(newValue);
  };

  if (type === "textarea") {
    return (
      <textarea
        ref={ref as unknown as React.RefObject<HTMLTextAreaElement>}
        className={cn(inputClassName, "resize-none")}
        placeholder={placeholder}
        value={value}
        autoFocus={autoFocus}
        readOnly={readOnly}
        {...(restProps as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
      />
    );
  }

  return (
    <div className={cn("relative")}>
      <input
        ref={ref}
        className={inputClassName}
        type={type === "password" && showPassword ? "text" : type}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        autoFocus={autoFocus}
        readOnly={readOnly}
        inputMode={inputMode}
        pattern={pattern}
        maxLength={type === "tel" ? 13 : undefined}
        {...restProps}
      />
      {type === "password" && (
        <button
          className="absolute inset-y-0 right-3 flex items-center text-gray-500"
          type="button"
          aria-label={showPassword ? "Hide password" : "Show password"}
          onClick={handlePasswordVisibility}
        >
          {showPassword ? (
            <EyeIcon className="h-5 w-5" />
          ) : (
            <EyeSlashIcon className="h-5 w-5" />
          )}
        </button>
      )}
    </div>
  );
};

export default Input;
