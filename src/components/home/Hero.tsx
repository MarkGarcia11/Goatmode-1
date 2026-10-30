"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowDown } from "lucide-react";
import { IMAGES } from "@/lib/site";

function SplitLine({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <span className="block overflow-hidden pb-[0.1em] -mb-[0.1em]">
      <motion.span
        className="block will-change-transform"
        initial={{ y: "112%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {text}
      </motion.span>
    </span>
  );
}

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "18%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.12]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-22%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <div ref={ref} className="relative h-[94svh] min-h-[600px] max-h-[1080px] overflow-hidden bg-charcoal">
      {/* background image with masked entrance + parallax */}
      <motion.div style={{ y: imgY, scale: imgScale }} className="absolute inset-0">
        <motion.div
          initial={{ scale: 1.12, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          className="h-full w-full"
        >
          <picture>
            <source media="(max-width: 640px)" srcSet={IMAGES.heroMobile} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={IMAGES.hero}
              alt="Athletes in Goat Mode apparel"
              className="h-full w-full object-cover img-cinematic"
              fetchPriority="high"
            />
          </picture>
        </motion.div>
      </motion.div>
      {/* legibility gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/25 to-charcoal/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal/45 via-transparent to-transparent" />

      {/* content */}
      <motion.div
        style={{ y: textY, opacity: fade }}
        className="relative z-10 h-full mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 flex flex-col justify-end pb-20 sm:pb-24 md:pb-28"
      >
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="eyebrow text-cream/80 flex items-center gap-3"
        >
          <span className="inline-block w-10 h-px bg-cream/60" />
          Men · Women · New Season
        </motion.p>

        <h1 className="mt-5 font-display text-cream text-[13.5vw] sm:text-[9vw] lg:text-[7.2vw] xl:text-[104px] leading-[0.95] tracking-[-0.01em] max-w-[14ch]">
          <SplitLine text="BUILT FOR" delay={0.65} />
          <span className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
            <motion.span
              className="block italic font-normal will-change-transform"
              initial={{ y: "112%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1.1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              your journey.
            </motion.span>
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.15, duration: 0.8 }}
          className="mt-5 text-cream/75 text-[15px] sm:text-[17px] leading-relaxed max-w-[46ch]"
        >
          Move with confidence. Find your rhythm. Make every movement your own.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          className="mt-8 flex flex-col sm:flex-row gap-3 sm:items-center"
        >
          <Link
            href="/shop"
            className="group inline-flex items-center justify-center gap-2.5 bg-cream text-charcoal rounded-full px-8 py-4 text-[12px] tracking-[0.2em] uppercase font-bold hover:bg-white transition-colors"
          >
            Explore collection
            <ArrowRight size={16} className="cta-arrow" />
          </Link>
          <Link
            href="/our-story"
            className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-[12px] tracking-[0.2em] uppercase font-bold text-cream border border-cream/40 hover:bg-cream/10 backdrop-blur-sm transition-colors"
          >
            Our story
          </Link>
        </motion.div>

        {/* meta row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="mt-10 sm:mt-12 flex items-center justify-between border-t border-cream/20 pt-5 text-cream/60 text-[10.5px] sm:text-[11px] tracking-[0.24em] uppercase font-semibold"
        >
          <span className="hidden sm:inline">Scroll to discover</span>
          <motion.span animate={reduce ? {} : { y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>
            <ArrowDown size={16} className="sm:hidden" />
          </motion.span>
          <span className="hidden md:inline">Feel good · Move better</span>
          <span>01 — 05</span>
        </motion.div>
      </motion.div>
    </div>
  );
}
