import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const WORDS = [
  { text: "Funny", color: "#7CF122" },
  { text: "Cool", color: "#2962FF" },
  { text: "Handsome?", color: "#FF00E5" },
];

const STATIC_WORDS = ["Quang", "is", "so"];

const SPRING_DURATION_ESTIMATE_MS = 800; // Estimated time for spring to settle
const HOLD_DURATION_MS = 500; // 500ms static hold time requested
const ENTRANCE_DELAY_MS = 1000; // 1000ms for static words to finish

export default function TypographyAnimation() {
  const [index, setIndex] = useState(-1);

  useEffect(() => {
    // Prevent looping: stop the animation if we've reached the final word
    if (index >= WORDS.length - 1) return;

    // First transition (-1 -> 0) happens after Entrance sequence.
    // Subsequent transitions happen after previous Transition completion + Hold.
    const delay =
      index === -1
        ? ENTRANCE_DELAY_MS
        : SPRING_DURATION_ESTIMATE_MS + HOLD_DURATION_MS;

    const timer = setTimeout(() => {
      setIndex((prev) => prev + 1);
    }, delay);

    return () => clearTimeout(timer);
  }, [index]);

  // Framer Motion variants for the static text stagger
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25, // 250ms stagger
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <div
      className="flex h-screen w-screen items-center justify-center bg-[#FFFFFF] overflow-hidden"
      style={{ fontFamily: 'Satoshi, sans-serif' }}
    >
      {/* 
        Parent Typography Container
        Using responsive text sizing. text-5xl (48px) to md:text-7xl (72px).
      */}
      <div className="flex items-center text-5xl md:text-7xl font-bold text-[#000000]">
        
        {/* Static Text Component */}
        <motion.span
          className="flex h-[1.3em] items-center"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {STATIC_WORDS.map((word, i) => (
            <motion.span
              key={i}
              variants={wordVariants}
              className="flex h-[1.3em] items-center whitespace-pre"
            >
              {word}{" "}
            </motion.span>
          ))}
        </motion.span>

        {/* Masking Container (The "Slot Machine" Window) */}
        <div className="relative h-[1.3em] overflow-hidden">
          {/* Inner column block layout that slides up */}
          <motion.div
            className="flex flex-col"
            initial={false}
            animate={{ y: `${-index * 1.3}em` }} // Slides up by exactly 1 item's height (1.3em)
            transition={{
              type: "spring",
              stiffness: 120,
              damping: 14,
              mass: 1,
            }}
          >
            {WORDS.map((word, i) => (
              <span
                key={i}
                className="flex h-[1.3em] items-center whitespace-nowrap"
                style={{ color: word.color }}
              >
                {word.text}
              </span>
            ))}
          </motion.div>
        </div>
        
      </div>
    </div>
  );
}
