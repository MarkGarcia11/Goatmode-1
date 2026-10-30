"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GoatLogo from "./GoatLogo";

/**
 * GOAT MODE screen loader — clean, smooth, mobile-optimized.
 * Stroke-drawn goat mark + staggered wordmark + progress hairline,
 * exiting with a soft curtain lift. Respects reduced motion.
 */
export default function BrandLoader({ onDone }: { onDone?: () => void }) {
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const seen = sessionStorage.getItem("gm-loaded");
    if (seen || reduced) {
      onDone?.();
      return;
    }
    setVisible(true);
    document.body.style.overflow = "hidden";
    const t1 = setTimeout(() => setLeaving(true), 1950);
    const t2 = setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = "";
      sessionStorage.setItem("gm-loaded", "1");
      onDone?.();
    }, 2650);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      document.body.style.overflow = "";
    };
  }, [onDone]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-cream"
          initial={{ y: 0 }}
          animate={leaving ? { y: "-100%" } : { y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
          role="status"
          aria-label="Loading Goat Mode"
        >
          {/* faint oversized watermark */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 flex items-center justify-center font-display italic text-[26vw] leading-none text-charcoal/[0.045] select-none md:text-[18vw]"
          >
            G
          </span>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center px-6"
          >
            <GoatLogo size="xl" animated />
            <motion.p
              className="eyebrow mt-6 text-charcoal/60"
              initial={{ opacity: 0, letterSpacing: "0.6em" }}
              animate={{ opacity: 1, letterSpacing: "0.32em" }}
              transition={{ delay: 0.7, duration: 0.9, ease: "easeOut" }}
            >
              Built for your journey
            </motion.p>

            {/* progress hairline */}
            <div className="mt-8 h-px w-44 overflow-hidden bg-charcoal/10 md:w-56">
              <motion.div
                className="h-full bg-charcoal"
                initial={{ x: "-100%" }}
                animate={{ x: leaving ? "0%" : "-12%" }}
                transition={{ duration: 1.9, ease: [0.22, 1, 0.36, 1] }}
                style={{ width: "100%" }}
              />
            </div>
            <motion.span
              className="mt-4 text-[10px] tracking-[0.3em] uppercase text-charcoal/40 font-semibold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Goat Mode
            </motion.span>
          </motion.div>

          {/* bottom edge detail */}
          <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-6 pb-6 text-[10px] tracking-[0.25em] uppercase text-charcoal/35 font-medium">
            <span>Est. MMXXVI</span>
            <span className="hidden sm:inline">Move with purpose</span>
            <span>Men · Women</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
