import Portal from "@/components/Portal";
import { cn } from "@/utils/classname";
import { cva, VariantProps } from "class-variance-authority";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const DrawerContentVariant = cva(
  "relative bg-white shadow-lg transform transition-all duration-300 ease-out max-h-[85vh] overflow-hidden",
  {
    variants: {
      position: {
        bottom: "w-full rounded-t-lg",
        top: "w-full rounded-b-lg",
        left: "h-full max-w-sm rounded-r-lg",
        right: "h-full max-w-sm rounded-l-lg",
      },
    },
    defaultVariants: {
      position: "bottom",
    },
  },
);

const DrawerOverlayVariant = cva(
  "fixed inset-0 bg-black/50 transition-opacity duration-300",
);

interface DrawerContextType {
  isOpen: boolean;
  isAnimating: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
}

const DrawerContext = createContext<DrawerContextType | undefined>(undefined);

const useDrawer = () => {
  const context = useContext(DrawerContext);
  if (!context) {
    throw new Error("useDrawer must be used within a Drawer");
  }
  return context;
};

interface DrawerProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const DeprecatedDrawer: React.FC<DrawerProps> = ({
  children,
  open,
  onOpenChange,
}) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : internalOpen;

  const handleOpenChange = useCallback(
    (newOpenState: boolean) => {
      if (onOpenChange) {
        onOpenChange(newOpenState);
      }
      if (!isControlled) {
        setInternalOpen(newOpenState);
      }
    },
    [isControlled, onOpenChange],
  );

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
    }
  }, [isOpen]);

  const openDrawer = useCallback(() => {
    handleOpenChange(true);
  }, [handleOpenChange]);

  const closeDrawer = useCallback(() => {
    setIsAnimating(false);
    setTimeout(() => {
      handleOpenChange(false);
    }, 300);
  }, [handleOpenChange]);

  const contextValue = {
    isOpen,
    isAnimating,
    openDrawer,
    closeDrawer,
  };

  return (
    <DrawerContext.Provider value={contextValue}>
      {children}
    </DrawerContext.Provider>
  );
};

type ElementWithOnClick = React.ReactElement<{
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}>;

export interface DeprecatedDrawerTriggerProps {
  children: React.ReactNode;
  className?: string;
  asChild?: boolean;
}

export const DeprecatedDrawerTrigger: React.FC<
  DeprecatedDrawerTriggerProps
> = ({ children, className, asChild = false }) => {
  const { openDrawer } = useDrawer();

  if (asChild && React.isValidElement(children)) {
    const child = children as ElementWithOnClick;

    const handleCombinedClick = (e: React.MouseEvent<HTMLElement>) => {
      child.props.onClick?.(e);
      openDrawer();
    };

    return React.cloneElement(child, {
      ...child.props,
      onClick: handleCombinedClick,
    });
  }

  return (
    <button className={className} onClick={openDrawer}>
      {children}
    </button>
  );
};

export type DeprecatedDrawerContentProps = VariantProps<
  typeof DrawerContentVariant
> & {
  className?: string;
  children: React.ReactNode;
};

export const DeprecatedDrawerContent: React.FC<
  DeprecatedDrawerContentProps
> = ({ className, children, position = "bottom" }) => {
  const { isOpen, isAnimating, closeDrawer } = useDrawer();

  const getPositionClasses = () => {
    switch (position) {
      case "top":
        return {
          container: "items-start justify-center",
          transform: isAnimating ? "translate-y-0" : "-translate-y-full",
        };
      case "left":
        return {
          container: "items-center justify-start",
          transform: isAnimating ? "translate-x-0" : "-translate-x-full",
        };
      case "right":
        return {
          container: "items-center justify-end",
          transform: isAnimating ? "translate-x-0" : "translate-x-full",
        };
      default:
        return {
          container: "items-end justify-center",
          transform: isAnimating ? "translate-y-0" : "translate-y-full",
        };
    }
  };

  if (!isOpen) return null;

  const positionClasses = getPositionClasses();

  return (
    <Portal>
      <div className={cn("fixed inset-0 z-50 flex", positionClasses.container)}>
        <div
          className={cn(
            DrawerOverlayVariant(),
            isAnimating ? "opacity-100" : "opacity-0",
          )}
          onClick={closeDrawer}
        />
        <div
          className={cn(
            DrawerContentVariant({ position }),
            positionClasses.transform,
            className,
          )}
        >
          {children}
        </div>
      </div>
    </Portal>
  );
};

export interface DeprecatedDrawerHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export const DeprecatedDrawerHeader: React.FC<DeprecatedDrawerHeaderProps> = ({
  children,
  className,
}) => <div className={cn("px-6 py-4", className)}>{children}</div>;

export interface DeprecatedDrawerTitleProps {
  children: React.ReactNode;
  className?: string;
}

export const DeprecatedDrawerTitle: React.FC<DeprecatedDrawerTitleProps> = ({
  children,
  className,
}) => (
  <h2 className={cn("text-lg font-semibold text-gray-900", className)}>
    {children}
  </h2>
);

export interface DeprecatedDrawerCloseProps {
  children: React.ReactNode;
  className?: string;
  asChild?: boolean;
}

export const DeprecatedDrawerClose: React.FC<DeprecatedDrawerCloseProps> = ({
  children,
  className,
  asChild = false,
}) => {
  const { closeDrawer } = useDrawer();

  if (asChild && React.isValidElement(children)) {
    const child = children as ElementWithOnClick;

    const handleCombinedClick = (e: React.MouseEvent<HTMLElement>) => {
      child.props.onClick?.(e);
      closeDrawer();
    };

    return React.cloneElement(child, {
      ...child.props,
      onClick: handleCombinedClick,
    });
  }

  return (
    <button className={className} onClick={closeDrawer}>
      {children}
    </button>
  );
};

export default DeprecatedDrawer;
