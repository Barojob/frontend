import { AnimatePresence, motion } from "framer-motion";
import React, { type PropsWithChildren } from "react";

type Props = {
  className?: string;
  transitionKey: React.Key;
};

const AnimatedTransition: React.FC<PropsWithChildren<Props>> = ({
  className,
  transitionKey,
  children,
}) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        className={className}
        key={transitionKey}
        variants={{
          hidden: { opacity: 0.5, scale: 0.98, y: -5 },
          visible: { opacity: 1, scale: 1, y: 0 },
        }}
        initial="hidden"
        animate="visible"
        exit="hidden"
        transition={{ duration: 0.25, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default AnimatedTransition;
