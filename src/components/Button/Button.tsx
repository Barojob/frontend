import { cva, VariantProps } from "class-variance-authority";
import React from "react";
import { cn } from "../../utils/classname";

const ButtonVariant = cva(
  "w-full text-center font-[16px] inline-block transition-all duration-200 transform-gpu active:scale-95 active:shadow-lg",
  {
    variants: {
      variant: {
        primary:
          "text-black bg-white border border-gray-300 hover:bg-gray-50 active:bg-gray-100",
        secondary:
          "text-white bg-black border border-black hover:bg-gray-800 active:bg-gray-700",
        success:
          "text-white bg-green-500 border border-green-500 hover:bg-green-600 active:bg-green-700",
        blue: "text-white bg-blue-500 border border-blue-500 hover:bg-blue-600 active:bg-blue-700",
        warning:
          "text-white bg-yellow-500 border border-yellow-500 hover:bg-yellow-600 active:bg-yellow-700",
        info: "text-white bg-blue-500 border border-blue-500 hover:bg-blue-600 active:bg-blue-700",
      },
      size: {
        md: "w-[328px] h-[42px] rounded-md",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export type ButtonProps = VariantProps<typeof ButtonVariant> & {
  className?: string;
  children: React.ReactNode;
  variant?:
    | "primary"
    | "secondary"
    | "success"
    | "blue"
    | "warning"
    | "info"
    | "danger"
    | "ghost"
    | "outline";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  haptic?: boolean;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onTouchStart?: (e: React.TouchEvent<HTMLButtonElement>) => void;
};

// 기본 스타일
const baseStyles =
  "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none text-nowrap select-none touch-manipulation active:scale-95";

// variant별 스타일
const variantStyles = {
  primary:
    "text-black bg-white border border-gray-300 hover:bg-gray-50 active:bg-gray-100 focus:ring-gray-500",
  secondary:
    "text-white bg-black border border-black hover:bg-gray-800 active:bg-gray-900 focus:ring-gray-700",
  success:
    "text-white bg-green-600 border border-green-600 hover:bg-green-700 active:bg-green-800 focus:ring-green-500",
  blue: "text-white bg-blue-500 border border-blue-500 hover:bg-blue-600 active:bg-blue-700 focus:ring-blue-500",
  warning:
    "text-white bg-yellow-500 border border-yellow-500 hover:bg-yellow-600 active:bg-yellow-700 focus:ring-yellow-500",
  info: "text-white bg-blue-500 border border-blue-500 hover:bg-blue-600 active:bg-blue-700 focus:ring-blue-500",
  danger:
    "text-white bg-red-600 border border-red-600 hover:bg-red-700 active:bg-red-800 focus:ring-red-500",
  ghost:
    "text-gray-700 hover:bg-gray-100 active:bg-gray-200 focus:ring-gray-500",
  outline:
    "text-gray-700 border border-gray-300 hover:bg-gray-50 active:bg-gray-100 focus:ring-gray-500",
};

// size별 스타일
const sizeStyles = {
  sm: "px-8 py-2 text-sm rounded min-h-[36px]",
  md: "w-[328px] h-[42px] text-base rounded-md",
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      children,
      variant = "primary",
      size = "md",
      fullWidth = false,
      disabled,
      loading = false,
      leftIcon,
      rightIcon,
      haptic = true,
      type = "button",
      onClick,
      onTouchStart,
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || loading;

    const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
      if (isDisabled) return;

      // 햅틱 피드백 (모바일에서만 작동)
      if (haptic && "vibrate" in navigator) {
        navigator.vibrate(10);
      }

      onClick?.(e);
    };

    const handleTouchStart = (e: React.TouchEvent<HTMLButtonElement>) => {
      if (isDisabled) return;
      onTouchStart?.(e);
    };

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        onClick={handleClick}
        onTouchStart={handleTouchStart}
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          fullWidth && "w-full",
          className,
        )}
        // 모바일 접근성
        role="button"
        tabIndex={isDisabled ? -1 : 0}
        {...props}
      >
        {loading && (
          <svg
            className="-ml-1 mr-2 h-4 w-4 flex-shrink-0 animate-spin"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {leftIcon && !loading && (
          <span className="mr-2 flex flex-shrink-0 items-center">
            {leftIcon}
          </span>
        )}
        <span className={cn("flex items-center", loading && "opacity-70")}>
          {children}
        </span>
        {rightIcon && !loading && (
          <span className="ml-2 flex flex-shrink-0 items-center">
            {rightIcon}
          </span>
        )}
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;
