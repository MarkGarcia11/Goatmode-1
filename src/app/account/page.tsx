import Link from "next/link";
import { User, Package, Heart, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";

export const metadata = { title: "Account — Goat Mode" };

export default function AccountPage() {
  return (
    <div className="pt-[160px] md:pt-[190px] pb-24 mx-auto max-w-[720px] px-5 sm:px-8 text-center">
      <Reveal>
        <span className="w-16 h-16 rounded-full bg-ivory flex items-center justify-center mx-auto">
          <User size={26} strokeWidth={1.4} className="text-charcoal/70" />
        </span>
        <p className="eyebrow text-charcoal/50 mt-6">Account</p>
        <h1 className="font-display text-[44px] sm:text-[60px] mt-3">
          Coming <span className="italic">soon.</span>
        </h1>
        <p className="mt-4 text-charcoal/60 text-[15px] leading-relaxed max-w-[52ch] mx-auto">
          Member accounts — with order history, saved sizes and early access —
          are on the way. For now, your bag is saved on this device and our
          newsletter keeps you first in line.
        </p>
      </Reveal>
      <Reveal delay={0.15}>
        <div className="grid sm:grid-cols-2 gap-3 mt-10 text-left">
          {[
            { icon: Package, t: "Track an order", d: "Order updates arrive by email.", href: "/contact" },
            { icon: Heart, t: "Get early access", d: "Join the list for first drops.", href: "/#newsletter" },
          ].map(({ icon: Icon, t, d, href }) => (
            <Link key={t} href={href} className="group bg-white border border-line rounded-2xl p-6 hover:border-charcoal/30 transition-colors">
              <Icon size={20} strokeWidth={1.6} />
              <p className="font-bold text-[15px] mt-3 flex items-center gap-2">
                {t} <ArrowRight size={14} className="cta-arrow" />
              </p>
              <p className="text-[13px] text-charcoal/55 mt-1">{d}</p>
            </Link>
          ))}
        </div>
      </Reveal>
    </div>
  );
}
