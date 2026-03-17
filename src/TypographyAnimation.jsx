import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

function TextShimmer({
  children,
  className = "",
  duration = 2,
  spread = 2,
}) {
  const dynamicSpread = React.useMemo(() => {
    return children.length * spread;
  }, [children, spread]);

  return (
    <motion.span
      className={`relative inline-block bg-[length:250%_100%,auto] bg-clip-text text-transparent [background-repeat:no-repeat,padding-box] ${className}`}
      initial={{ backgroundPosition: "100% center" }}
      animate={{ backgroundPosition: "0% center" }}
      transition={{
        repeat: Infinity,
        duration,
        ease: "linear",
      }}
      style={{
        "--spread": `${dynamicSpread}px`,
        "--shimmer-color": "#ffffff",
        backgroundImage: `linear-gradient(90deg, rgba(255,255,255,0) calc(50% - var(--spread)), var(--shimmer-color), rgba(255,255,255,0) calc(50% + var(--spread))), linear-gradient(to right, #0690D4, #7CF122, #FF00E5)`,
      }}
    >
      {children}
    </motion.span>
  );
}

const WORDS = [
  { text: "Funny", color: "#7CF122" },
  { text: "Cool", color: "#2962FF" },
  { text: "Handsome?", color: "#FF00E5" },
];

const STATIC_WORDS = ["Quang", "is", "so"];

const SPRING_DURATION_ESTIMATE_MS = 800; // Estimated time for spring to settle
const HOLD_DURATION_MS = 500; // 500ms static hold time requested
const ENTRANCE_DELAY_MS = 1000; // 1000ms for static words to finish

export default function TypographyAnimation({ onComplete }) {
  const [index, setIndex] = useState(-1);
  const [phase, setPhase] = useState(0); 
  // Phase 0: Slot machine animation
  // Phase 1: Fade out "so " & "Handsome?"
  // Phase 2: Remove from flow & re-center layout
  // Phase 3: Reveal "HERE"

  useEffect(() => {
    if (phase === 0) {
      if (index >= WORDS.length - 1) {
        // "Handsome?" snapping into place takes SPRING_DURATION_ESTIMATE_MS.
        // Exactly 1000ms after it fully snaps, initiate the cleanup.
        const delay = SPRING_DURATION_ESTIMATE_MS + 1000;
        const timer = setTimeout(() => {
          setPhase(1);
        }, delay);
        return () => clearTimeout(timer);
      }

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
    } else if (phase === 1) {
      // Fade out takes ~400ms.
      const timer = setTimeout(() => {
        setPhase(2);
      }, 400);
      return () => clearTimeout(timer);
    } else if (phase === 2) {
      // Re-centering layout shift takes approx 600ms, wait a bit longer before revealing HERE
      const timer = setTimeout(() => {
        setPhase(3);
      }, 1400);
      return () => clearTimeout(timer);
    } else if (phase === 3) {
      // Hold "HERE" before transitioning out
      const timer = setTimeout(() => {
        setPhase(4);
      }, 1500);
      return () => clearTimeout(timer);
    } else if (phase === 4) {
      // Wait for dust fade out before mounting LandingPage
      const timer = setTimeout(() => {
        if (onComplete) onComplete();
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [index, phase, onComplete]);

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
      <motion.div 
        layout 
        transition={{ layout: { type: "spring", stiffness: 80, damping: 14 } }}
        className="flex items-center text-5xl md:text-7xl font-bold text-[#000000]"
      >
        
        {/* We wrap the static words to manage `layout` */}
        <motion.div layout className="flex items-center">
          <motion.span
            className="flex h-[1.3em] items-center"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {STATIC_WORDS.map((word, i) => {
              const isRemovable = word === "so";
              if (phase >= 2 && isRemovable) return null; // Remove from document flow

              return (
                <motion.span
                  key={i}
                  layout
                  layoutId={word === "Quang" ? "brand-logo" : undefined}
                  variants={wordVariants}
                  className="flex h-[1.3em] items-center whitespace-pre origin-left z-10"
                >
                  <motion.span
                    animate={
                      phase >= 4 && word !== "Quang"
                        ? { opacity: 0, scale: 1.5, filter: "blur(10px)" }
                        : phase >= 1 && isRemovable
                        ? { opacity: 0, scale: 0.9 }
                        : { opacity: 1, scale: 1, filter: "blur(0px)" }
                    }
                    transition={{ duration: phase >= 4 ? 0.8 : 0.4 }}
                  >
                    {word}{" "}
                  </motion.span>
                </motion.span>
              );
            })}
          </motion.span>
        </motion.div>

        {/* Masking Container (The "Slot Machine" Window) */}
        {phase < 2 && (
          <motion.div 
            layout 
            className="relative h-[1.3em] overflow-hidden origin-left"
            animate={
              phase >= 1
                ? { opacity: 0, scale: 0.9 }
                : { opacity: 1, scale: 1 }
            }
            transition={{ duration: 0.4 }}
          >
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
          </motion.div>
        )}

        {/* The "HERE" Reveal & Gradient */}
        {phase >= 3 && (
          <motion.div
            layout
            initial={{ opacity: 0, x: 20 }}
            animate={
              phase >= 4
                ? { opacity: 0, scale: 1.5, filter: "blur(10px)", x: 0 }
                : { opacity: 1, x: 0, scale: 1, filter: "blur(0px)" }
            }
            transition={{ duration: phase >= 4 ? 0.8 : 0.5, ease: "easeOut" }}
            className="flex h-[1.3em] items-center whitespace-pre origin-left"
          >
            <TextShimmer duration={2} spread={8}>
              HERE
            </TextShimmer>
          </motion.div>
        )}
        
      </motion.div>
    </div>
  );
}
