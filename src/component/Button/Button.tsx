import React from "react";
import { cn } from "../../utils/classname";
import { cva, VariantProps } from "class-variance-authority";

const ButtonVariant = cva(
  "w-full border border-black text-center font-[16px] inline-block",
  {
    variants: {
      variant: {
        primary: "text-black bg-white",
        secondary: "text-white bg-black",
      },
      size: {
        md: "px-12 py-2.5 rounded-md",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export type ButtonProps = VariantProps<typeof ButtonVariant> & {
  className?: string;
  children: React.ReactNode;
};

const Button: React.FC<React.PropsWithChildren<ButtonProps>> = ({
  className,
  children,
  variant = "primary",
  size = "md",
  ...props
}) => {
  return (
    <button
      className={cn(ButtonVariant({ variant, size }), className)}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
