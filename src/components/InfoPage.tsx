import { Reveal } from "./Reveal";

export default function InfoPage({
  eyebrow,
  title,
  italic,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  italic: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="pt-[150px] md:pt-[180px] pb-24 mx-auto max-w-[800px] px-5 sm:px-8">
      <Reveal>
        <p className="eyebrow text-charcoal/50">{eyebrow}</p>
      </Reveal>
      <Reveal delay={0.06}>
        <h1 className="font-display text-[42px] sm:text-[60px] leading-[1.02] mt-4">
          {title} <span className="italic">{italic}</span>
        </h1>
      </Reveal>
      {intro && (
        <Reveal delay={0.12}>
          <p className="mt-5 text-charcoal/60 text-[15.5px] leading-relaxed">{intro}</p>
        </Reveal>
      )}
      <Reveal delay={0.15}>
        <div className="mt-10 space-y-8 text-[15px] leading-[1.8] text-charcoal/75">{children}</div>
      </Reveal>
    </div>
  );
}

export function Block({ h, children }: { h: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-line pt-7">
      <h2 className="font-bold text-charcoal text-[17px]">{h}</h2>
      <div className="mt-2.5 space-y-3">{children}</div>
    </section>
  );
}
