"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Move, Feather, Shirt, Compass } from "lucide-react";
import { Reveal, SplitWords, MaskReveal } from "../Reveal";
import { IMAGES } from "@/lib/site";

export function Marquee() {
  const items = ["Built for your journey", "Feel good · Move better", "Men · Women", "Every move has a purpose"];
  const row = [...items, ...items];
  return (
    <div className="bg-charcoal text-cream py-4 overflow-hidden border-y border-charcoal">
      <div className="flex w-max animate-marquee gap-0">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-8 pr-8 text-[11px] tracking-[0.3em] uppercase font-bold whitespace-nowrap">
            {t}
            <span className="w-1.5 h-1.5 rounded-full bg-sage inline-block" />
          </span>
        ))}
      </div>
    </div>
  );
}

export function DualCollections() {
  const panels = [
    {
      href: "/men",
      label: "Men",
      title: "Train in your element",
      desc: "Tees, shorts & heavyweight layers cut for power and ease.",
      img: IMAGES.menPanel,
    },
    {
      href: "/women",
      label: "Women",
      title: "Move like yourself",
      desc: "Leggings, tops & studio pieces that sculpt and support.",
      img: IMAGES.womenPanel,
    },
  ];
  return (
    <section className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 pt-20 md:pt-32 pb-4">
      <div className="flex items-end justify-between gap-6 mb-8 md:mb-12">
        <div>
          <Reveal>
            <p className="eyebrow text-charcoal/50">Two journeys, one standard</p>
          </Reveal>
          <h2 className="font-display text-[38px] sm:text-[52px] lg:text-[64px] leading-[1.02] mt-4">
            <SplitWords text="Shop by" /> <span className="italic"><SplitWords text="collection" delay={0.15} /></span>
          </h2>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-4 md:gap-6">
        {panels.map((p, i) => (
          <Reveal key={p.href} delay={i * 0.1}>
            <Link
              href={p.href}
              className="group relative block overflow-hidden rounded-[22px] aspect-[4/5] sm:aspect-[5/5] md:aspect-[4/4.6]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.img}
                alt={`${p.label} collection`}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover img-cinematic transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/75 via-charcoal/10 to-transparent" />
              <div className="absolute top-6 left-6 flex items-center gap-3">
                <span className="bg-cream/90 backdrop-blur px-4 py-2 rounded-full text-[10.5px] tracking-[0.24em] uppercase font-bold">
                  {p.label}
                </span>
              </div>
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                <h3 className="font-display text-cream text-[30px] sm:text-[38px] leading-[1.05]">
                  {p.title}
                </h3>
                <p className="text-cream/70 text-[14px] mt-2 max-w-[36ch] opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 hidden sm:block">
                  {p.desc}
                </p>
                <span className="mt-4 inline-flex items-center gap-2.5 text-cream text-[11.5px] tracking-[0.22em] uppercase font-bold">
                  <span className="w-11 h-11 rounded-full bg-cream text-charcoal flex items-center justify-center transition-transform duration-500 group-hover:rotate-[-45deg]">
                    <ArrowRight size={17} />
                  </span>
                  Explore {p.label.toLowerCase()}
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function BrandStory() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 60, reduce ? 0 : -60]);
  const y2 = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 110, reduce ? 0 : -40]);

  return (
    <section ref={ref} className="relative overflow-hidden">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 py-20 md:py-32 grid lg:grid-cols-12 gap-10 lg:gap-8 items-center">
        {/* asymmetric image composition */}
        <div className="lg:col-span-6 relative">
          <motion.div style={{ y: y1 }} className="relative rounded-[24px] overflow-hidden aspect-[4/4.8] sm:aspect-[4/3.4] lg:aspect-[4/4.6] max-w-[560px]">
            <MaskReveal className="h-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={IMAGES.story} alt="Training together" loading="lazy" className="h-full w-full object-cover img-cinematic" />
            </MaskReveal>
            <div className="absolute bottom-5 left-5 bg-cream/90 backdrop-blur rounded-full px-5 py-2.5 text-[10.5px] tracking-[0.22em] uppercase font-bold">
              Our beginning
            </div>
          </motion.div>
          <motion.div
            style={{ y: y2 }}
            className="hidden sm:block absolute -bottom-8 -right-2 lg:right-6 w-[220px] lg:w-[250px] rounded-[18px] overflow-hidden aspect-square shadow-[0_30px_60px_-25px_rgba(34,35,33,0.5)] border-4 border-cream"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={IMAGES.storySmall} alt="Fabric detail" loading="lazy" className="h-full w-full object-cover" />
          </motion.div>
        </div>

        {/* text */}
        <div className="lg:col-span-5 lg:col-start-8">
          <Reveal>
            <p className="eyebrow text-charcoal/50">More than what you wear</p>
          </Reveal>
          <h2 className="font-display text-[40px] sm:text-[54px] leading-[1.03] mt-5">
            <SplitWords text="Every journey" />
            <br />
            <span className="italic text-graphite"><SplitWords text="begins somewhere." delay={0.2} /></span>
          </h2>
          <Reveal delay={0.15}>
            <p className="mt-6 text-charcoal/65 text-[15.5px] sm:text-[16.5px] leading-[1.75]">
              Every movement brings you closer to who you want to become. We
              believe what you wear should move with you, support your rhythm,
              and make you feel confident along the way.
            </p>
            <p className="mt-4 text-charcoal/65 text-[15.5px] leading-[1.75]">
              Goat Mode started from one person&apos;s training journey — and a
              simple idea: show up, stay consistent, and dress like you mean it.
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <Link
              href="/our-story"
              className="group mt-8 inline-flex items-center gap-3 text-[12px] tracking-[0.22em] uppercase font-bold"
            >
              <span className="link-line">Discover our story</span>
              <span className="w-11 h-11 rounded-full bg-charcoal text-cream flex items-center justify-center">
                <ArrowRight size={16} className="cta-arrow" />
              </span>
            </Link>
          </Reveal>
          {/* stats */}
          <Reveal delay={0.3}>
            <div className="mt-10 grid grid-cols-3 gap-6 border-t border-line pt-7">
              {[
                ["12+", "Essential styles"],
                ["02", "Collections"],
                ["01", "Standard: quality"],
              ].map(([n, l]) => (
                <div key={l}>
                  <p className="font-display text-[30px] sm:text-[36px] leading-none">{n}</p>
                  <p className="text-[11px] tracking-[0.14em] uppercase font-bold text-charcoal/50 mt-2">{l}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function Campaign() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], [reduce ? "0%" : "-12%", reduce ? "0%" : "12%"]);
  const textY = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 50, reduce ? 0 : -50]);

  return (
    <section ref={ref} className="relative overflow-hidden">
      <div className="relative h-[78svh] min-h-[520px] max-h-[860px]">
        <motion.div style={{ y: bgY }} className="absolute -inset-y-[14%] inset-x-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={IMAGES.campaign} alt="Find your own pace — campaign" loading="lazy" className="h-full w-full object-cover img-cinematic" />
        </motion.div>
        <div className="absolute inset-0 bg-charcoal/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-charcoal/20" />
        <motion.div
          style={{ y: textY }}
          className="relative z-10 h-full mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 flex flex-col items-center justify-center text-center"
        >
          <Reveal>
            <p className="eyebrow text-cream/75">The campaign — Season 01</p>
          </Reveal>
          <h2 className="font-display text-cream text-[52px] sm:text-[84px] lg:text-[110px] leading-[0.95] mt-6">
            <SplitWords text="Find your" />
            <br />
            <span className="italic"><SplitWords text="own pace." delay={0.2} /></span>
          </h2>
          <Reveal delay={0.25}>
            <Link
              href="/shop"
              className="group mt-9 inline-flex items-center gap-2.5 border border-cream/50 text-cream rounded-full px-9 py-4 text-[12px] tracking-[0.22em] uppercase font-bold hover:bg-cream hover:text-charcoal transition-all duration-300"
            >
              Shop the look <ArrowRight size={15} className="cta-arrow" />
            </Link>
          </Reveal>
        </motion.div>
      </div>
    </section>
  );
}

const CATS = [
  { label: "Men's Shirts", href: "/men?category=shirts", img: "https://images.pexels.com/photos/18799138/pexels-photo-18799138.png?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700" },
  { label: "Men's Shorts", href: "/men?category=shorts", img: "https://images.pexels.com/photos/12931755/pexels-photo-12931755.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700" },
  { label: "Men's Hoodies", href: "/men?category=hoodies", img: "https://images.pexels.com/photos/9789598/pexels-photo-9789598.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700" },
  { label: "Women's Leggings", href: "/women?category=leggings", img: "https://images.pexels.com/photos/30500802/pexels-photo-30500802.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700" },
  { label: "Women's Tops", href: "/women?category=tops", img: "https://images.pexels.com/photos/16122070/pexels-photo-16122070.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700" },
  { label: "Women's Shorts", href: "/women?category=shorts", img: "https://images.pexels.com/photos/30246208/pexels-photo-30246208.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700" },
];

export function ShopByCategory() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 py-20 md:py-32">
      <div className="flex items-end justify-between gap-6">
        <div>
          <Reveal>
            <p className="eyebrow text-charcoal/50">Find your fit</p>
          </Reveal>
          <h2 className="font-display text-[38px] sm:text-[52px] lg:text-[64px] leading-[1.02] mt-4">
            <SplitWords text="Shop by" /> <span className="italic"><SplitWords text="category" delay={0.15} /></span>
          </h2>
        </div>
        <Reveal delay={0.15} className="hidden sm:block">
          <p className="text-charcoal/50 text-sm max-w-[220px] text-right">Swipe to explore — every essential has its place.</p>
        </Reveal>
      </div>

      <div className="mt-10 md:mt-14 flex gap-4 md:gap-5 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-2 -mx-5 px-5 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-3 lg:grid-cols-6 sm:overflow-visible">
        {CATS.map((c, i) => (
          <Reveal key={c.label} delay={i * 0.06} className="snap-start shrink-0 w-[62vw] sm:w-auto">
            <Link href={c.href} className="group block">
              <div className="relative overflow-hidden rounded-[20px] aspect-[3/3.8] bg-ivory">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={c.img} alt={c.label} loading="lazy" className="h-full w-full object-cover img-cinematic transition-transform duration-[1000ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.08]" />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/55 via-transparent to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />
                <span className="absolute top-3.5 right-3.5 w-9 h-9 rounded-full bg-cream/90 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <ArrowUpRight size={16} />
                </span>
                <p className="absolute bottom-4 left-4 right-4 text-cream font-bold text-[14.5px] leading-tight">{c.label}</p>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Values() {
  const vals = [
    { icon: Move, title: "Designed for movement", desc: "Cuts that follow your body — never fight it." },
    { icon: Feather, title: "Comfort in every routine", desc: "Soft, breathable knits for training & rest." },
    { icon: Shirt, title: "Thoughtful essentials", desc: "A tight edit of pieces that work together." },
    { icon: Compass, title: "Your journey, your pace", desc: "No pressure. Just show up as you are." },
  ];
  return (
    <section className="bg-charcoal text-cream relative overflow-hidden grain">
      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 py-20 md:py-28">
        <div className="max-w-[720px]">
          <Reveal>
            <p className="eyebrow text-cream/50">Why Goat Mode</p>
          </Reveal>
          <h2 className="font-display text-[38px] sm:text-[52px] lg:text-[60px] leading-[1.02] mt-4">
            <SplitWords text="Made to move" /> <span className="italic text-cream/85"><SplitWords text="with you." delay={0.18} /></span>
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px mt-12 bg-cream/10 rounded-[22px] overflow-hidden border border-cream/10">
          {vals.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.08} className="bg-charcoal">
              <div className="p-7 sm:p-8 h-full hover:bg-graphite/60 transition-colors duration-500 group">
                <span className="w-12 h-12 rounded-full border border-cream/20 flex items-center justify-center group-hover:bg-cream group-hover:text-charcoal transition-all duration-500">
                  <v.icon size={20} strokeWidth={1.5} />
                </span>
                <p className="font-bold text-[16px] mt-6">{v.title}</p>
                <p className="text-cream/55 text-[13.5px] leading-relaxed mt-2">{v.desc}</p>
                <p className="mt-6 text-[11px] tracking-[0.2em] text-cream/30 font-bold">0{i + 1}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.1}>
          <p className="mt-6 text-[12px] text-cream/40 max-w-[640px]">
            Benefit statements reflect our design intent and remain editable pending final product verification.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

export function Community() {
  const imgs = [
    "https://images.pexels.com/photos/5036975/pexels-photo-5036975.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    "https://images.pexels.com/photos/4853897/pexels-photo-4853897.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    "https://images.pexels.com/photos/39303822/pexels-photo-39303822.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    "https://images.pexels.com/photos/4854302/pexels-photo-4854302.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    "https://images.pexels.com/photos/39635347/pexels-photo-39635347.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  ];
  return (
    <section className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 py-20 md:py-32">
      <div className="text-center max-w-[640px] mx-auto">
        <Reveal>
          <p className="eyebrow text-charcoal/50">@goatmode · Community</p>
        </Reveal>
        <h2 className="font-display text-[38px] sm:text-[52px] lg:text-[60px] leading-[1.02] mt-4">
          <SplitWords text="The journey" /> <span className="italic"><SplitWords text="doesn't stop here." delay={0.2} /></span>
        </h2>
        <Reveal delay={0.2}>
          <p className="mt-4 text-charcoal/55 text-[15px]">
            Follow along for new collections, everyday movement, and a little inspiration.
          </p>
        </Reveal>
      </div>
      <div className="mt-10 md:mt-14 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
        {imgs.map((src, i) => (
          <Reveal key={src} delay={i * 0.07} className={i === 4 ? "col-span-2 sm:col-span-1" : ""}>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="group relative block overflow-hidden rounded-[18px] aspect-square bg-ivory"
              aria-label="Community post"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="Community" loading="lazy" className="h-full w-full object-cover img-cinematic transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.08]" />
              <span className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/25 transition-colors duration-500" />
              <span className="absolute bottom-3 left-3 bg-cream/90 backdrop-blur rounded-full px-3.5 py-1.5 text-[10px] tracking-[0.18em] uppercase font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Follow
              </span>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
