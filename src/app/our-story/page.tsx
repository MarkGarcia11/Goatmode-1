import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal, SplitWords } from "@/components/Reveal";
import Newsletter from "@/components/Newsletter";
import GoatLogo from "@/components/GoatLogo";
import { IMAGES } from "@/lib/site";

export const metadata = { title: "Our Story — Goat Mode" };

const principles = [
  { n: "01", t: "Consistency over intensity", d: "Small sessions, repeated often, beat occasional extremes. We design for the everyday athlete." },
  { n: "02", t: "Comfort is confidence", d: "When what you wear feels right, you move freely — and it shows in everything you do." },
  { n: "03", t: "Your pace, your journey", d: "No timelines, no comparisons. Progress is personal, and every step counts." },
];

export default function StoryPage() {
  return (
    <>
      {/* hero */}
      <div className="relative pt-[150px] md:pt-[190px] pb-14 md:pb-20 overflow-hidden">
        <span aria-hidden className="pointer-events-none absolute top-24 left-0 right-0 text-center font-display italic text-[24vw] leading-none text-charcoal/[0.04] select-none">
          Journey
        </span>
        <div className="relative mx-auto max-w-[900px] px-5 sm:px-8 text-center">
          <Reveal>
            <div className="inline-flex justify-center">
              <GoatLogo size="lg" />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="eyebrow text-charcoal/50 mt-8">Our story</p>
          </Reveal>
          <h1 className="font-display text-[46px] sm:text-[72px] lg:text-[88px] leading-[0.98] mt-5">
            <SplitWords text="More than" /> <br />
            <span className="italic"><SplitWords text="what you wear." delay={0.2} /></span>
          </h1>
          <Reveal delay={0.25}>
            <p className="mt-6 text-charcoal/60 text-[15.5px] sm:text-[17px] leading-relaxed max-w-[60ch] mx-auto">
              Goat Mode began the way every meaningful journey begins — with a
              single decision to start. Born from one person&apos;s own fitness
              journey, it grew into a simple belief: show up consistently, move
              with purpose, and wear something that makes you feel ready.
            </p>
          </Reveal>
        </div>
      </div>

      {/* image duo */}
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 grid sm:grid-cols-2 gap-4 md:gap-6">
        <Reveal>
          <div className="rounded-[22px] overflow-hidden aspect-[4/4.4]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={IMAGES.story} alt="Training journey" loading="lazy" className="h-full w-full object-cover img-cinematic" />
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="rounded-[22px] overflow-hidden aspect-[4/4.4] sm:mt-12">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={IMAGES.menPanel} alt="Athlete in Goat Mode" loading="lazy" className="h-full w-full object-cover img-cinematic" />
          </div>
        </Reveal>
      </div>

      {/* narrative */}
      <div className="mx-auto max-w-[760px] px-5 sm:px-8 py-20 md:py-28 space-y-8">
        {[
          { h: "It started with showing up.", p: "No perfect plan, no ideal starting point — just a commitment to move a little more, a little more often. The early mornings were hard. The progress was slow. But every session added up, and the habit became the reward." },
          { h: "What you wear matters.", p: "Along the way, one thing became clear: the right apparel changes how a session feels. Pieces that fit well, move freely and look considered remove friction — so all that's left is you and the work." },
          { h: "Built from the ground up.", p: "Goat Mode is an independent brand at the start of its own journey. Every collection is a step forward — designed thoughtfully, produced carefully, and made to earn its place in your routine." },
        ].map((b, i) => (
          <Reveal key={b.h} delay={i * 0.05}>
            <div className="border-t border-line pt-8">
              <h2 className="font-display text-[30px] sm:text-[38px]">{b.h}</h2>
              <p className="mt-3 text-charcoal/65 text-[15.5px] leading-[1.8]">{b.p}</p>
            </div>
          </Reveal>
        ))}
      </div>

      {/* principles */}
      <div className="bg-charcoal text-cream">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 py-20 md:py-28">
          <Reveal>
            <p className="eyebrow text-cream/50">What we stand for</p>
          </Reveal>
          <h2 className="font-display text-[38px] sm:text-[56px] mt-4 max-w-[16ch]">
            <SplitWords text="Three principles," /> <span className="italic"><SplitWords text="one standard." delay={0.2} /></span>
          </h2>
          <div className="grid md:grid-cols-3 gap-5 mt-12">
            {principles.map((p, i) => (
              <Reveal key={p.n} delay={i * 0.1}>
                <div className="border border-cream/12 rounded-[22px] p-8 h-full hover:bg-graphite/50 transition-colors duration-500">
                  <p className="font-display italic text-cream/35 text-[28px]">{p.n}</p>
                  <p className="font-bold text-[18px] mt-4">{p.t}</p>
                  <p className="text-cream/55 text-[14px] leading-relaxed mt-2.5">{p.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.15}>
            <div className="mt-12 flex flex-col sm:flex-row gap-4">
              <Link href="/shop" className="group inline-flex items-center justify-center gap-2.5 bg-cream text-charcoal rounded-full px-9 py-4 text-[12px] tracking-[0.22em] uppercase font-bold hover:bg-white transition-colors">
                Explore the collection <ArrowRight size={15} className="cta-arrow" />
              </Link>
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 border border-cream/30 rounded-full px-9 py-4 text-[12px] tracking-[0.22em] uppercase font-bold hover:bg-cream/10 transition-colors">
                Get in touch
              </Link>
            </div>
          </Reveal>
        </div>
      </div>

      <Newsletter />
    </>
  );
}
