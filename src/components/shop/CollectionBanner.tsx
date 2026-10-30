import Link from "next/link";
import { Reveal } from "../Reveal";

export default function CollectionBanner({
  eyebrow,
  title,
  italic,
  intro,
  image,
}: {
  eyebrow: string;
  title: string;
  italic: string;
  intro: string;
  image: string;
}) {
  return (
    <div className="pt-[130px] md:pt-[150px]">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <Reveal>
          <nav className="text-[11px] tracking-[0.2em] uppercase font-bold text-charcoal/45 flex gap-2">
            <Link href="/" className="hover:text-charcoal transition-colors">Home</Link>
            <span>/</span>
            <span className="text-charcoal">{eyebrow}</span>
          </nav>
        </Reveal>
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-end mt-6 pb-10">
          <div>
            <Reveal>
              <p className="eyebrow text-charcoal/50">{eyebrow}</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="font-display text-[48px] sm:text-[68px] lg:text-[84px] leading-[0.98] mt-4">
                {title} <span className="italic text-graphite">{italic}</span>
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-5 text-charcoal/60 text-[15px] leading-relaxed max-w-[52ch]">{intro}</p>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <div className="relative overflow-hidden rounded-[22px] aspect-[16/9] lg:aspect-[16/8]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={image} alt={eyebrow} className="h-full w-full object-cover img-cinematic" />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/30 to-transparent" />
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
