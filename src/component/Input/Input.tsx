import React from "react";
import { cva, VariantProps } from "class-variance-authority";

const inputStyles = cva(
  "block w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-offset-2",
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
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { label, variant, inputSize, errorMessage, className = "", ...props },
    ref
  ) => (
    <div className="w-full">
      {label && (
        <label className="block mb-1 text-sm font-semibold text-gray-700">
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={`${inputStyles({ variant, inputSize })} ${className}`}
        {...props}
      />
      {errorMessage && (
        <span className="mt-1 text-sm text-red-500">{errorMessage}</span>
      )}
    </div>
  )
);

Input.displayName = "Input";
