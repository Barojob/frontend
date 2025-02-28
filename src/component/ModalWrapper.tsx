import React, { useState, useEffect } from "react";
import { cn } from "../utils/classname";

type ModalWrapperProps = {
  children: React.ReactNode;
  onClose: () => void;
  className?: string;
  animationDuration?: number;
};

const ModalWrapper: React.FC<ModalWrapperProps> = ({
  children,
  onClose,
  className,
  animationDuration = 400,
}) => {
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  const handleClose = () => {
    setAnimate(false);
    setTimeout(() => {
      onClose();
    }, animationDuration);
  };

  return (
    <div className={cn("fixed inset-0 z-50", className)} onClick={handleClose}>
      <div className="absolute inset-0 bg-black bg-opacity-80" />
      <div className="absolute bottom-0 left-0 right-0 max-w-[460px] mx-auto">
        <div
          className={cn(
            "bg-white rounded-t-[40px] py-8 px-6 w-full transition-transform duration-400 transform",
            animate ? "animate-slide-up" : "animate-slide-down"
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default ModalWrapper;
