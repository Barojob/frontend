import { cva, VariantProps } from "class-variance-authority";
import React from "react";
import { cn } from "../utils/classname";

const BoxButtonVariant = cva(
  "flex flex-col items-center justify-center text-center border-2 rounded-lg transition-all duration-200 cursor-pointer transform-gpu active:scale-95 active:shadow-lg",
  {
    variants: {
      variant: {
        primary:
          "border-gray-300 bg-white text-black hover:border-gray-400 hover:bg-gray-50 active:bg-gray-100",
        secondary:
          "border-black bg-black text-white hover:bg-gray-800 active:bg-gray-700",
        selected:
          "border-blue-400 bg-blue-100 text-blue-700 hover:bg-blue-200 active:bg-blue-200",
      },
      size: {
        sm: "w-32 h-36",
        md: "w-40 h-44",
        lg: "w-48 h-52",
        xl: "w-56 h-60",
        full: "w-full h-44",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export type BoxButtonProps = VariantProps<typeof BoxButtonVariant> & {
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  onTouchStart?: () => void;
  disabled?: boolean;
  selected?: boolean;
  image?: string;
  icon?: React.ReactNode;
  name: string;
};

const BoxButton: React.FC<BoxButtonProps> = ({
  className,
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  selected = false,
  onClick,
  onTouchStart,
  image,
  icon,
  name,
  ...props
}) => {
  const finalVariant = selected ? "selected" : variant;

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
        "select-none",
        BoxButtonVariant({ variant: finalVariant, size }),
        disabled && "pointer-events-none cursor-not-allowed opacity-50",
        className,
      )}
      {...props}
    >
      {image && (
        <div className="mb-4">
          <img
            src={image}
            alt={name}
            className="h-16 w-16 rounded object-contain"
          />
        </div>
      )}

      {icon && <div className="mb-4">{icon}</div>}

      <span className="text-base font-medium">{name}</span>

      {children}
    </button>
  );
};

export default BoxButton;
