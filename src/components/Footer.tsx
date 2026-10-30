"use client";

import Link from "next/link";
import { ArrowUpRight, AtSign, Globe } from "lucide-react";
import GoatLogo from "./GoatLogo";

function InstagramIcon({ size = 17 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}
function TiktokIcon({ size = 17 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M16.6 3c.4 2.2 1.9 3.7 4.4 3.9v3c-1.7 0-3.2-.5-4.4-1.4v6.1c0 3.9-2.6 6.4-6 6.4-3.1 0-5.6-2.4-5.6-5.5 0-3.2 2.6-5.6 6-5.6.3 0 .7 0 1 .1v3.1c-.3-.1-.7-.2-1-.2-1.5 0-2.7 1.2-2.7 2.6 0 1.4 1.1 2.5 2.6 2.5 1.6 0 2.7-1.2 2.7-3.1V3h3Z" />
    </svg>
  );
}
function FacebookIcon({ size = 17 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

const cols = [
  {
    title: "Shop",
    links: [
      { label: "Men", href: "/men" },
      { label: "Women", href: "/women" },
      { label: "New Arrivals", href: "/new-arrivals" },
      { label: "All Products", href: "/shop" },
    ],
  },
  {
    title: "Information",
    links: [
      { label: "Our Story", href: "/our-story" },
      { label: "Contact", href: "/contact" },
      { label: "FAQs", href: "/faqs" },
      { label: "Size Guide", href: "/size-guide" },
    ],
  },
  {
    title: "Customer Care",
    links: [
      { label: "Shipping Policy", href: "/shipping" },
      { label: "Returns & Exchanges", href: "/returns" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms & Conditions", href: "/terms" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-charcoal text-cream relative overflow-hidden">
      {/* oversized watermark */}
      <div aria-hidden className="pointer-events-none select-none absolute -bottom-8 left-0 right-0 text-center font-display italic text-[22vw] leading-[0.8] text-cream/[0.04] whitespace-nowrap">
        Goat Mode
      </div>

      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 pt-16 md:pt-24 pb-10">
        <div className="grid lg:grid-cols-[1.2fr_2fr] gap-12 lg:gap-20">
          <div>
            <GoatLogo variant="light" size="md" tagline />
            <p className="mt-6 text-[14.5px] leading-relaxed text-cream/60 max-w-[340px]">
              Premium essentials for training and everyday life. Designed for
              movement, made for your journey — at your pace.
            </p>
            <div className="flex items-center gap-3 mt-7">
              {[
                { icon: <InstagramIcon />, label: "Instagram" },
                { icon: <TiktokIcon />, label: "TikTok" },
                { icon: <FacebookIcon />, label: "Facebook" },
              ].map(({ icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  onClick={(e) => e.preventDefault()}
                  className="w-11 h-11 rounded-full border border-cream/20 flex items-center justify-center hover:bg-cream hover:text-charcoal transition-all duration-300"
                >
                  {icon}
                </a>
              ))}
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                aria-label="TikTok"
                className="h-11 px-5 rounded-full border border-cream/20 hidden sm:flex items-center gap-2 text-[11px] tracking-[0.18em] uppercase font-bold hover:bg-cream hover:text-charcoal transition-all duration-300"
              >
                TikTok <ArrowUpRight size={14} />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
            {cols.map((c) => (
              <div key={c.title}>
                <p className="eyebrow text-cream/40">{c.title}</p>
                <ul className="mt-5 space-y-3.5">
                  {c.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        className="link-line text-[14px] text-cream/75 hover:text-cream transition-colors"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 md:mt-20 pt-7 border-t border-cream/12 flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px] text-cream/45">
          <p>© 2026 Goat Mode. All rights reserved.</p>
          <p className="tracking-[0.2em] uppercase text-[10.5px] font-semibold">
            Feel good · Move better
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-cream transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-cream transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
