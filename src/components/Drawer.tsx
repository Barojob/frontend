import Portal from "@/components/Portal";
import { assert } from "@/utils/assert";
import { cn } from "@/utils/classname";
import {
  animate,
  AnimatePresence,
  motion,
  useDragControls,
} from "framer-motion";
import React, { type PropsWithChildren } from "react";
import { useKeyPressEvent } from "react-use";

type Props = {
  className?: string;
  panelClassName?: string;
  overlayClassName?: string;
  visible: boolean;
  title?: string;
  onClose: () => void;
};

const Drawer: React.FC<PropsWithChildren<Props>> = ({
  className,
  panelClassName,
  overlayClassName,
  visible,
  onClose,
  ...props
}) => {
  useKeyPressEvent("Escape", onClose);

  return (
    <Portal>
      <AnimatePresence>
        {visible && (
          <div className={cn("relative z-50", className)}>
            <DrawerOverlay
              className={overlayClassName}
              visible={visible}
              onClose={onClose}
            />

            <DrawerPanel
              className={panelClassName}
              visible={visible}
              onClose={onClose}
              {...props}
            />
          </div>
        )}
      </AnimatePresence>
    </Portal>
  );
};

const DrawerPanel: React.FC<
  Omit<PropsWithChildren<Props>, "overlayClassName">
> = ({ className, visible, title, onClose, children }) => {
  const id = React.useId();
  const drawerRef = React.useRef<HTMLDivElement>(null);
  const controls = useDragControls();

  return (
    <motion.aside
      className={cn(
        "bg-gray-0 fixed bottom-0 left-0 w-full rounded-t-3xl px-5 pb-12 shadow-[0px_0px_16px_0px_#999999CC]",
        "after:absolute after:bottom-0 after:-mx-5 after:h-[100vh] after:w-full after:translate-y-full after:bg-inherit",
        className,
      )}
      key={`bottom-sheet-${id}`}
      ref={drawerRef}
      transition={{
        ease: "easeInOut",
        duration: 0.3,
      }}
      variants={{
        visible: {
          translateY: "0%",
        },
        hidden: {
          translateY: "100%",
        },
      }}
      initial="hidden"
      exit="hidden"
      animate={visible ? "visible" : "hidden"}
      drag="y"
      dragElastic={0.4}
      dragControls={controls}
      dragListener={false}
      dragConstraints={{ top: 0 }}
      dragTransition={{ bounceStiffness: 600, bounceDamping: 30 }}
      onDragEnd={(_, info) => {
        assert(!!drawerRef.current, "drawerRef is not set");

        const CLOSE_THRESHOLD = 60;
        const shouldClose = info.offset.y > CLOSE_THRESHOLD;
        if (shouldClose) {
          onClose();
          return;
        }

        animate(drawerRef.current, {
          y: 0,
        });
      }}
    >
      <section>
        <div
          className="-mx-5 touch-none pb-4 pt-3"
          aria-label="drawer handle bar"
          onPointerDown={handleDragStart}
        >
          <div className="mx-auto h-1 w-8 rounded-full bg-gray-600" />
        </div>

        <div className="relative">
          {title && (
            <div className="text-lg font-semibold text-gray-900">{title}</div>
          )}
        </div>
      </section>

      <section className="mt-6">{children}</section>
    </motion.aside>
  );

  function handleDragStart(event: React.PointerEvent<HTMLDivElement>) {
    controls.start(event);
  }
};

const DrawerOverlay: React.FC<{
  className?: string;
  visible: boolean;
  onClose: () => void;
}> = ({ className, visible, onClose }) => {
  const id = React.useId();

  return (
    <motion.div
      className={cn(
        "fixed inset-0 bg-black/50",
        !visible && "pointer-events-none",
        className,
      )}
      key={`bottom-sheet-overlay-${id}`}
      transition={{
        ease: "easeInOut",
        duration: 0.3,
      }}
      animate={visible ? "visible" : "hidden"}
      variants={{
        visible: { opacity: 1 },
        hidden: { opacity: 0 },
      }}
      initial="hidden"
      exit="hidden"
      onClick={onClose}
    />
  );
};

export default Drawer;
