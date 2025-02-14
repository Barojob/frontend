import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { cva, VariantProps } from "class-variance-authority";
import React from "react";
import { cn } from "../../utils/classname";

type InputProps = VariantProps<typeof InputVariant> & {
  className?: string;
  value: string;
  onValueChange: (value: string) => void;
  type?: "text" | "password" | "email" | "textarea";
  placeholder?: string;
};

const InputVariant = cva(
  "focus:border-red w-full text-left font-bold focus:border focus:outline-hidden",
  {
    variants: {
      variant: {
        primary: "text-gray-1 bg-white font-normal",
      },
      rounded: {
        full: "rounded-full",
        lg: "rounded-lg",
        md: "rounded-md",
      },
      size: {
        lg: "h-11 px-4 py-3.5 text-base",
        md: "h-10 px-3 py-2.5 text-sm",
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
  ...props
}) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const inputClassName = cn(InputVariant(props), className);
  const handlePasswordVisibility = () => setShowPassword((prev) => !prev);

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
          type={type === "password" && showPassword ? "text" : type}
          value={value}
          placeholder={placeholder}
          onChange={handleValueChange}
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

  function handleValueChange(event: React.ChangeEvent<HTMLInputElement>) {
    onValueChange(event.target.value);
  }
};

export default Input;
export type { InputProps };
