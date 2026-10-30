"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * GOAT MODE — official logo lockup.
 *
 * Primary source: the client's exact logo file at
 *   /public/brand/goat-mode-logo.png   (any PNG/JPG/SVG named the same works)
 * The file has a white canvas, so it is cropped to the artwork and blended:
 *   - light backgrounds  -> mix-blend-multiply (white disappears)
 *   - dark/photo backgrounds -> inverted + screen (black art becomes white)
 *
 * Fallback: until the file is present, a faithful vector trace of the logo is shown.
 */

export const LOGO_SRC = "/brand/goat-mode-logo.png";

// Artwork bounds inside the original 480×475 canvas (includes soft shadow).
const CROP = { x: 92, y: 142, w: 286, h: 200, cw: 480, ch: 475 };

type Props = {
  variant?: "dark" | "light";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  wordmark?: boolean; // kept for API compatibility
  animated?: boolean;
  className?: string;
  tagline?: boolean;
};

const widths: Record<NonNullable<Props["size"]>, number> = {
  xs: 84,
  sm: 108,
  md: 150,
  lg: 240,
  xl: 320,
};

function TracedLogo({ animated }: { animated: boolean }) {
  const stroke = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 3.4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  const paths = [
    // head outline (top line + snout)
    "M9 55 C13 37 33 23 65 15 C100 7 140 9 167 23 C177 30 181 43 173 53",
    // jaw
    "M9 55 C11 70 23 87 39 95 C50 91 57 81 63 75 C75 77 85 73 93 67",
    // horn
    "M105 37 C117 29 133 29 145 39",
    "M120 31 C130 25 145 27 149 37 C141 38 134 44 130 52",
    // sweeping G stroke into the leaf tail
    "M105 45 C115 60 110 90 90 117 C70 143 50 160 36 177 C55 173 80 150 100 120 C120 90 130 73 157 69",
  ];
  return (
    <svg viewBox="0 0 286 200" className="block w-full h-auto overflow-visible" role="img" aria-label="Goat Mode">
      <g transform="translate(2,4)">
        {paths.map((d, i) =>
          animated ? (
            <motion.path
              key={i}
              d={d}
              {...stroke}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.3, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            />
          ) : (
            <path key={i} d={d} {...stroke} />
          )
        )}
        <motion.text
          x="150"
          y="112"
          fontSize="62"
          textLength="114"
          lengthAdjust="spacingAndGlyphs"
          fill="currentColor"
          style={{ fontFamily: "var(--font-script), cursive" }}
          initial={animated ? { opacity: 0 } : false}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          oat
        </motion.text>
        <motion.text
          x="117"
          y="156"
          fontSize="15"
          fontWeight="800"
          textLength="116"
          lengthAdjust="spacing"
          fill="currentColor"
          style={{ fontFamily: "var(--font-sans), sans-serif" }}
          initial={animated ? { opacity: 0 } : false}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.6 }}
        >
          MODE
        </motion.text>
      </g>
    </svg>
  );
}

export default function GoatLogo({
  variant = "dark",
  size = "sm",
  animated = false,
  tagline = false,
  className,
}: Props) {
  const dark = variant === "dark";
  const [failed, setFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Handle a 404 that happened before hydration attached onError.
  useEffect(() => {
    const el = imgRef.current;
    if (el && el.complete && el.naturalWidth === 0) setFailed(true);
  }, []);

  const w = widths[size];
  const aspect = CROP.w / CROP.h;

  return (
    <span
      className={cn("inline-flex flex-col items-start select-none", dark ? "text-charcoal" : "text-cream", className)}
      style={{ width: `min(${w}px, 62vw)` }}
    >
      <span className="relative block w-full" style={{ aspectRatio: `${aspect}` }}>
        {failed ? (
          <TracedLogo animated={animated} />
        ) : (
          <motion.span
            className="absolute inset-0 block overflow-hidden"
            initial={animated ? { clipPath: "inset(0 100% 0 0)", opacity: 0 } : false}
            animate={{ clipPath: "inset(0 0% 0 0)", opacity: 1 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={imgRef}
              src={LOGO_SRC}
              alt="Goat Mode"
              draggable={false}
              onError={() => setFailed(true)}
              className="absolute max-w-none"
              style={{
                width: `${(CROP.cw / CROP.w) * 100}%`,
                left: `${(-CROP.x / CROP.w) * 100}%`,
                top: `${(-CROP.y / CROP.h) * 100}%`,
                filter: dark ? "none" : "invert(1)",
                mixBlendMode: dark ? "multiply" : "screen",
              }}
            />
          </motion.span>
        )}
      </span>
      {tagline && (
        <span
          className={cn(
            "mt-3 text-[9px] tracking-[0.3em] uppercase font-semibold",
            dark ? "text-charcoal/50" : "text-cream/55"
          )}
        >
          Built for your journey
        </span>
      )}
    </span>
  );
}
