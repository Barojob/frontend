import { cva, VariantProps } from "class-variance-authority";
import { cn } from "../../utils/classname";
import Input, { InputProps } from "./Input";

const LabelInputVariant = cva("w-full text-left", {
  variants: {
    variant: {
      primary: "text-gray-1 mb-1.5 font-normal",
    },
    labelSize: {
      lg: "text-lg",
      md: "text-base",
      sm: "text-sm",
    },
  },
  defaultVariants: {
    variant: "primary",
    labelSize: "md",
  },
});

type LabelInputProps = VariantProps<typeof LabelInputVariant> &
  InputProps & {
    className?: string;
    label: string;
    labelsize?: "lg" | "md" | "sm";
    error?: string;
  };

const LabelInput: React.FC<LabelInputProps> = ({
  className,
  label,
  labelSize,
  error,
  ...props
}) => {
  return (
    <div className={cn(`w-full`, className)}>
      <label className={cn(LabelInputVariant({ labelSize }))}>{label}</label>
      <Input {...props} />
      {error && <p className="text-red mt-1.5 text-sm">{error}</p>}
    </div>
  );
};

export default LabelInput;
