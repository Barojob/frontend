import { cva, VariantProps } from "class-variance-authority";

const buttonStyles = cva(
  "rounded-md font-bold focus:outline-none focus:ring-2 focus:ring-offset-2",
  {
    variants: {
      primary: {
        true: "bg-blue-500 text-white hover:bg-blue-600",
        false: "bg-gray-200 text-gray-700 hover:bg-gray-300",
      },
      size: {
        small: "px-3 py-1 text-sm",
        medium: "px-4 py-2 text-base",
        large: "px-5 py-3 text-lg",
      },
      disabled: {
        true: "opacity-50 cursor-not-allowed",
        false: "",
      },
    },
    defaultVariants: {
      size: "medium",
      primary: false,
    },
  }
);

export interface ButtonProps extends VariantProps<typeof buttonStyles> {
  label: string;
  onClick?: () => void;
  backgroundColor?: string;
  isLoading?: boolean;
  icon?: React.ReactNode;
}

export const Button = ({
  primary,
  size,
  disabled,
  backgroundColor,
  label,
  isLoading,
  icon,
  ...props
}: ButtonProps) => {
  return (
    <button
      type="button"
      className={buttonStyles({ primary, size, disabled })}
      style={{ backgroundColor }}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        "Loading..."
      ) : icon ? (
        <span className="mr-2">{icon}</span>
      ) : null}
      {label}
    </button>
  );
};
