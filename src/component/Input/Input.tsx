import React, { useState } from "react";
import { cva, VariantProps } from "class-variance-authority";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

const inputStyles = cva(
  "block w-full px-3 py-2 rounded-md border focus:outline-none focus:border-blue-400 focus:ring-1",
  {
    variants: {
      variant: {
        default: "border-gray-300 focus:ring-blue-500",
        error: "border-red-500 focus:ring-red-500",
        success: "border-green-500 focus:ring-green-500",
      },
      inputSize: {
        small: "text-sm",
        medium: "text-base",
        large: "text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      inputSize: "medium",
    },
  }
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputStyles> {
  label?: string;
  errorMessage?: string;
  className?: string;
  type?: string;
  showToggleIcon?: boolean; // Eye icon 표시 여부
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      variant,
      inputSize,
      errorMessage,
      type = "text",
      className = "",
      showToggleIcon = false,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword((prev) => !prev);
    };

    const isPasswordType = type === "password";

    return (
      <div className="w-full">
        {label && (
          <label className="block mb-1 text-sm font-semibold text-gray-700">
            {label}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            type={isPasswordType && showPassword ? "text" : type}
            className={`${inputStyles({
              variant,
              inputSize,
            })} pr-10 ${className}`} // 오른쪽 공간 확보
            {...props}
          />
          {isPasswordType && showToggleIcon && (
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-3 flex items-center text-gray-500"
            >
              {showPassword ? (
                <EyeIcon className="w-5 h-5" aria-hidden="true" />
              ) : (
                <EyeSlashIcon className="w-5 h-5" aria-hidden="true" />
              )}
            </button>
          )}
        </div>
        {errorMessage && (
          <span className="mt-1 text-sm text-red-500">{errorMessage}</span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
