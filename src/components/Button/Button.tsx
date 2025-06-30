import React from "react";
import { cn } from "../../utils/classname";
import { cva, VariantProps } from "class-variance-authority";

const ButtonVariant = cva("w-full text-center font-[16px] inline-block", {
  variants: {
    variant: {
      primary: "text-black bg-white border border-gray-300",
      secondary: "text-white bg-black border border-black",
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
  return (
    <button
      onClick={onClick}
      onTouchStart={onTouchStart}
      disabled={disabled}
      className={cn("text-nowrap", ButtonVariant({ variant, size }), className)}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
