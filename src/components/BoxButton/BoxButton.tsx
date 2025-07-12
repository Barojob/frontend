import { cva, VariantProps } from "class-variance-authority";
import React from "react";
import { cn } from "../../utils/classname";

const BoxButtonVariant = cva("flex flex-col items-center justify-center text-center border-2 rounded-lg transition-all duration-200 cursor-pointer transform-gpu active:scale-95 active:shadow-lg", {
  variants: {
    variant: {
      primary: "border-gray-300 bg-white text-black hover:border-gray-400 hover:bg-gray-50 active:bg-gray-100",
      secondary: "border-black bg-black text-white hover:bg-gray-800 active:bg-gray-700",
      selected: "border-blue-500 bg-blue-50 text-blue-700 hover:bg-blue-100 active:bg-blue-200",
    },
    size: {
      default: "w-[155px] h-[178px]",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "default",
  },
});

export type BoxButtonProps = VariantProps<typeof BoxButtonVariant> & {
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  onTouchStart?: () => void;
  disabled?: boolean;
  selected?: boolean;
  image?: string;
  name: string;
};

const BoxButton: React.FC<BoxButtonProps> = ({
  className,
  children,
  variant = "primary",
  size = "default",
  disabled = false,
  selected = false,
  onClick,
  onTouchStart,
  image,
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
        disabled && "opacity-50 cursor-not-allowed pointer-events-none",
        className
      )}
      {...props}
    >
      {image && (
        <div className="mb-4">
          <img 
            src={image} 
            alt={name}
            className="w-16 h-16 object-cover rounded"
          />
        </div>
      )}
      
      <span className="font-medium text-base">
        {name}
      </span>
      
      {children}
    </button>
  );
};

export default BoxButton;