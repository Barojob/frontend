import React, { PropsWithChildren } from "react";
import { ThreeDots } from "react-loader-spinner";
import { cn } from "../utils/classname";

type Props = React.ComponentPropsWithRef<"button"> & {
  className?: string;
  size: "sm" | "md";
  theme: "primary" | "secondary" | "tertiary";
  type?: "button" | "submit" | "reset";
  loading?: boolean;
  block?: boolean;
};

const Button: React.FC<PropsWithChildren<Props>> = ({
  className,
  size,
  theme,
  type = "button",
  children,
  loading,
  block,
  ...props
}) => {
  return (
    <button
      className={cn(
        "relative rounded-[10px] text-center transition-colors duration-150",
        theme === "primary" &&
          "bg-blue-1 disabled:bg-gray-0 disabled:border-gray-5 border text-white disabled:text-[#898989]",
        // TODO: add disabled style
        theme === "secondary" &&
          "text-blue-1 border-blue-1 border bg-[#D3DFFF]",
        // TODO: add disabled style
        theme === "tertiary" &&
          "bg-gray-0 border border-[#E0E0E0] text-[#898989]",
        size === "sm" && "h-9.5",
        size === "md" && "h-10.5",
        block && "block w-full",
        className,
      )}
      type={type}
      {...props}
    >
      {loading && (
        <ThreeDots
          wrapperClass="absolute-center"
          width={32}
          height={32}
          ariaLabel="loading"
        />
      )}

      <span className={cn(loading && "invisible")}>{children}</span>
    </button>
  );
};

export default Button;
