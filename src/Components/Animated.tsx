"use client";

import { motion } from "framer-motion";

const AnimatedBubbles = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Right Circle (matching left circle's animation) */}
      <motion.div
        className="absolute w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full"
        initial={{ opacity: 0.6 }}
        animate={{
          opacity: [0.4, 0.6, 0.4],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          backgroundColor: "#DFF8E6",
          top: "100px",
          right: "-100px",
          zIndex: 5,
        }}
      />
    </div>
  );
};

export default AnimatedBubbles;




