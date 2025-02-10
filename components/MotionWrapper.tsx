// components/MotionWrapper.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";

type MotionWrapperProps = {
  children: ReactNode;
};

export default function MotionWrapper({ children }: MotionWrapperProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={typeof children === "string" ? children : "motion-wrapper"}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
