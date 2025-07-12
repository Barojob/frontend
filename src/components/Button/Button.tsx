import { cva, VariantProps } from "class-variance-authority";
import React from "react";
import { cn } from "../../utils/classname";

const ButtonVariant = cva("w-full text-center font-[16px] inline-block transition-all duration-200 transform-gpu active:scale-95 active:shadow-lg", {
  variants: {
    variant: {
      primary: "text-black bg-white border border-gray-300 hover:bg-gray-50 active:bg-gray-100",
      secondary: "text-white bg-black border border-black hover:bg-gray-800 active:bg-gray-700",
      success: "text-white bg-green-500 border border-green-500 hover:bg-green-600 active:bg-green-700",
      blue: "text-white bg-blue-500 border border-blue-500 hover:bg-blue-600 active:bg-blue-700",
      warning: "text-white bg-yellow-500 border border-yellow-500 hover:bg-yellow-600 active:bg-yellow-700",
      info: "text-white bg-blue-500 border border-blue-500 hover:bg-blue-600 active:bg-blue-700",
    },
    size: {
      md: "px-12 py-2 rounded-md",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});

export type ButtonProps = VariantProps<typeof ButtonVariant> & {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  onTouchStart?: () => void;
  disabled?: boolean;
};

const Button: React.FC<React.PropsWithChildren<ButtonProps>> = ({
  className,
  children,
  variant = "primary",
  size = "md",
  disabled,
  onClick,
  onTouchStart,
  ...props
}) => {
  const handleClick = () => {
    if (disabled) return;
    onClick?.();
  };

  const handleTouchStart = () => {
    if (disabled) return;
    onTouchStart?.();
  };

  return (
    <button
      onClick={handleClick}
      onTouchStart={handleTouchStart}
      disabled={disabled}
      className={cn(
        "text-nowrap select-none",
        ButtonVariant({ variant, size }),
        disabled && "opacity-50 cursor-not-allowed pointer-events-none",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
