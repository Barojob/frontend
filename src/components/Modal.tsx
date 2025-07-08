import React, { PropsWithChildren } from "react";
import { cn } from "../utils/classname";
import Portal from "./Portal";
import PresenceTransition from "./PresenceTransition";

type ModalProps = {
  className?: string;
  visible: boolean;
  onClose: () => void;
};

const Modal: React.FC<PropsWithChildren<ModalProps>> = ({
  className,
  visible,
  onClose,
  children,
}) => {
  return (
    <Portal>
      <PresenceTransition transitionKey={`${visible}`} variant="fadeInOut">
        {visible && (
          <div
            className="fixed inset-0 z-50 overflow-y-auto bg-black/40 px-11 py-4"
            onClick={onClose}
          >
            <div className="flex min-h-full items-center justify-center">
              <section
                className={cn(
                  "h-fit w-full rounded-[30px] bg-white drop-shadow-[0_4px_10px_#00000040]",
                  className,
                )}
                role="dialog"
                onClick={handleModalClick}
              >
                {children}
              </section>
            </div>
          </div>
        )}
      </PresenceTransition>
    </Portal>
  );

  function handleModalClick(event: React.MouseEvent<HTMLDivElement>) {
    event.stopPropagation();
  }
};

export default Modal;
