import { cva, VariantProps } from "class-variance-authority";
import React, { createContext, useContext, useState } from "react";
import { cn } from "../utils/classname";

// Drawer Variants
const DrawerContentVariant = cva(
  "relative bg-white shadow-lg transform transition-all duration-300 ease-out max-h-[85vh] overflow-hidden",
  {
    variants: {
      position: {
        bottom: "w-full max-w-lg rounded-t-lg",
        top: "w-full max-w-lg rounded-b-lg",
        left: "h-full max-w-sm rounded-r-lg",
        right: "h-full max-w-sm rounded-l-lg",
      },
      size: {
        sm: "max-w-sm",
        md: "max-w-lg",
        lg: "max-w-xl",
        xl: "max-w-2xl",
      },
    },
    defaultVariants: {
      position: "bottom",
      size: "md",
    },
  },
);

const DrawerOverlayVariant = cva(
  "fixed inset-0 bg-black/50 transition-opacity duration-300",
  {
    variants: {
      blur: {
        none: "",
        sm: "backdrop-blur-sm",
        md: "backdrop-blur-md",
      },
    },
    defaultVariants: {
      blur: "none",
    },
  },
);

// Drawer Context
interface DrawerContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  closeDrawer: () => void;
  isAnimating: boolean;
}

const DrawerContext = createContext<DrawerContextType | undefined>(undefined);

const useDrawer = () => {
  const context = useContext(DrawerContext);
  if (!context) {
    throw new Error("useDrawer must be used within a Drawer");
  }
  return context;
};

// Main Drawer Component
interface DrawerProps {
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export const Drawer: React.FC<DrawerProps> = ({
  children,
  defaultOpen = false,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [isAnimating, setIsAnimating] = useState(false);

  React.useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
    }
  }, [isOpen]);

  const closeDrawer = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setIsOpen(false);
    }, 300);
  };

  return (
    <DrawerContext.Provider
      value={{ isOpen, setIsOpen, closeDrawer, isAnimating }}
    >
      {children}
    </DrawerContext.Provider>
  );
};

// DrawerTrigger Component
export type DrawerTriggerProps = {
  className?: string;
  children: React.ReactNode;
  asChild?: boolean;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const DrawerTrigger = React.forwardRef<HTMLButtonElement, DrawerTriggerProps>(
  (
    {
      className,
      children,
      asChild = false,
      disabled = false,
      onClick,
      ...props
    },
    ref,
  ) => {
    const { setIsOpen } = useDrawer();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled) return;
      setIsOpen(true);
      onClick?.(e);
    };

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children, {
        onClick: handleClick,
        className: cn((children.props as any)?.className, className),
        disabled,
      } as any);
    }

    return (
      <button
        ref={ref}
        onClick={handleClick}
        disabled={disabled}
        className={cn(
          "inline-flex items-center justify-center font-medium transition-colors",
          "focus:outline-none focus:ring-2 focus:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50",
          className,
        )}
        {...props}
      >
        {children}
      </button>
    );
  },
);

DrawerTrigger.displayName = "DrawerTrigger";

export { DrawerTrigger };

// DrawerContent Component
export type DrawerContentProps = VariantProps<typeof DrawerContentVariant> & {
  className?: string;
  children: React.ReactNode;
  closeOnOverlayClick?: boolean;
  showHandle?: boolean;
  blur?: "none" | "sm" | "md";
};

const DrawerContent = React.forwardRef<HTMLDivElement, DrawerContentProps>(
  (
    {
      className,
      children,
      position = "bottom",
      size = "md",
      closeOnOverlayClick = true,
      showHandle = true,
      blur = "none",
      ...props
    },
    ref,
  ) => {
    const { isOpen, isAnimating, closeDrawer } = useDrawer();

    const handleOverlayClick = () => {
      if (closeOnOverlayClick) {
        closeDrawer();
      }
    };

    if (!isOpen) return null;

    const getPositionClasses = () => {
      switch (position) {
        case "top":
          return {
            container: "flex items-start justify-center",
            transform: isAnimating ? "translate-y-0" : "-translate-y-full",
          };
        case "left":
          return {
            container: "flex items-center justify-start",
            transform: isAnimating ? "translate-x-0" : "-translate-x-full",
          };
        case "right":
          return {
            container: "flex items-center justify-end",
            transform: isAnimating ? "translate-x-0" : "translate-x-full",
          };
        default: // bottom
          return {
            container: "flex items-end justify-center",
            transform: isAnimating ? "translate-y-0" : "translate-y-full",
          };
      }
    };

    const positionClasses = getPositionClasses();

    return (
      <div className={cn("fixed inset-0 z-50", positionClasses.container)}>
        {/* Backdrop */}
        <div
          className={cn(
            DrawerOverlayVariant({ blur }),
            isAnimating ? "opacity-100" : "opacity-0",
          )}
          onClick={handleOverlayClick}
        />

        {/* Drawer Content */}
        <div
          ref={ref}
          className={cn(
            DrawerContentVariant({ position, size }),
            positionClasses.transform,
            className,
          )}
          {...props}
        >
          {/* Handle */}
          {showHandle && position === "bottom" && (
            <div className="flex justify-center pb-2 pt-4">
              <div className="h-1 w-10 rounded-full bg-gray-300" />
            </div>
          )}
          {showHandle && position === "top" && (
            <div className="flex justify-center pb-4 pt-2">
              <div className="h-1 w-10 rounded-full bg-gray-300" />
            </div>
          )}
          {children}
        </div>
      </div>
    );
  },
);

DrawerContent.displayName = "DrawerContent";

export { DrawerContent };

// DrawerHeader Component
export type DrawerHeaderProps = {
  className?: string;
  children: React.ReactNode;
};

const DrawerHeader = React.forwardRef<HTMLDivElement, DrawerHeaderProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("border-b border-gray-200 px-6 py-4", className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);

DrawerHeader.displayName = "DrawerHeader";

// DrawerTitle Component
export type DrawerTitleProps = {
  className?: string;
  children: React.ReactNode;
};

const DrawerTitle = React.forwardRef<HTMLHeadingElement, DrawerTitleProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <h2
        ref={ref}
        className={cn("text-lg font-semibold text-gray-900", className)}
        {...props}
      >
        {children}
      </h2>
    );
  },
);

DrawerTitle.displayName = "DrawerTitle";

// DrawerDescription Component
export type DrawerDescriptionProps = {
  className?: string;
  children: React.ReactNode;
};

const DrawerDescription = React.forwardRef<
  HTMLParagraphElement,
  DrawerDescriptionProps
>(({ className, children, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn("mt-1 text-sm text-gray-600", className)}
      {...props}
    >
      {children}
    </p>
  );
});

DrawerDescription.displayName = "DrawerDescription";

// DrawerFooter Component
export type DrawerFooterProps = {
  className?: string;
  children: React.ReactNode;
};

const DrawerFooter = React.forwardRef<HTMLDivElement, DrawerFooterProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex gap-2 border-t border-gray-200 px-6 py-4",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);

DrawerFooter.displayName = "DrawerFooter";

export { DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle };

// DrawerClose Component
export type DrawerCloseProps = {
  className?: string;
  children: React.ReactNode;
  asChild?: boolean;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const DrawerClose = React.forwardRef<HTMLButtonElement, DrawerCloseProps>(
  (
    {
      className,
      children,
      asChild = false,
      disabled = false,
      onClick,
      ...props
    },
    ref,
  ) => {
    const { closeDrawer } = useDrawer();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled) return;
      closeDrawer();
      onClick?.(e);
    };

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children, {
        onClick: handleClick,
        className: cn((children.props as any)?.className, className),
        disabled,
      } as any);
    }

    return (
      <button
        ref={ref}
        onClick={handleClick}
        disabled={disabled}
        className={cn(
          "inline-flex items-center justify-center font-medium transition-colors",
          "focus:outline-none focus:ring-2 focus:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50",
          className,
        )}
        {...props}
      >
        {children}
      </button>
    );
  },
);

DrawerClose.displayName = "DrawerClose";

export { DrawerClose };

export default Drawer;
