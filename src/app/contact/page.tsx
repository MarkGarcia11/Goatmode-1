"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, AlertCircle, MessageCircle, Truck, RotateCcw } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const topics = ["Order support", "Sizing help", "Returns & exchanges", "Press & partnerships", "Something else"];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", topic: topics[0], message: "" });
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [msg, setMsg] = useState("");

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setState("done");
      setMsg(data.message);
    } catch (err) {
      setState("error");
      setMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <div className="pt-[150px] md:pt-[180px] pb-24 mx-auto max-w-[1200px] px-5 sm:px-8">
      <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-16">
        <div>
          <Reveal>
            <p className="eyebrow text-charcoal/50">Contact</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="font-display text-[48px] sm:text-[64px] leading-[1.0] mt-4">
              Let&apos;s <span className="italic">talk.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-5 text-charcoal/60 text-[15.5px] leading-relaxed max-w-[44ch]">
              Questions about sizing, orders or the brand — we read every
              message personally and reply within 1–2 business days.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-8 space-y-3">
              {[
                { icon: Truck, t: "Order & shipping questions", d: "Track an order or ask about delivery." },
                { icon: RotateCcw, t: "Returns & exchanges", d: "Easy 30-day returns, no stress." },
                { icon: MessageCircle, t: "Anything else", d: "Sizing, stock, partnerships — just ask." },
              ].map(({ icon: Icon, t, d }) => (
                <div key={t} className="flex gap-4 bg-white border border-line rounded-2xl p-5">
                  <span className="w-11 h-11 rounded-full bg-ivory flex items-center justify-center shrink-0">
                    <Icon size={18} strokeWidth={1.6} />
                  </span>
                  <div>
                    <p className="font-bold text-[14.5px]">{t}</p>
                    <p className="text-[13px] text-charcoal/55 mt-0.5">{d}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="bg-white border border-line rounded-[24px] p-6 sm:p-9 shadow-[0_30px_70px_-45px_rgba(34,35,33,0.4)]">
            {state === "done" ? (
              <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-10">
                <CheckCircle2 size={48} strokeWidth={1.3} className="mx-auto text-sage-deep" />
                <p className="font-display text-3xl mt-5">Message sent.</p>
                <p className="text-charcoal/60 text-sm mt-2 max-w-[36ch] mx-auto">{msg}</p>
              </motion.div>
            ) : (
              <form onSubmit={submit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[12px] font-bold tracking-[0.12em] uppercase text-charcoal/60">Name</label>
                    <input value={form.name} onChange={set("name")} placeholder="Your name" required className="mt-2 w-full bg-ivory border border-line rounded-2xl px-5 py-3.5 text-[14.5px] outline-none focus:border-charcoal/40 placeholder:text-charcoal/35" />
                  </div>
                  <div>
                    <label className="text-[12px] font-bold tracking-[0.12em] uppercase text-charcoal/60">Email</label>
                    <input value={form.email} onChange={set("email")} type="email" placeholder="you@example.com" required className="mt-2 w-full bg-ivory border border-line rounded-2xl px-5 py-3.5 text-[14.5px] outline-none focus:border-charcoal/40 placeholder:text-charcoal/35" />
                  </div>
                </div>
                <div>
                  <label className="text-[12px] font-bold tracking-[0.12em] uppercase text-charcoal/60">Topic</label>
                  <select value={form.topic} onChange={set("topic")} className="mt-2 w-full bg-ivory border border-line rounded-2xl px-5 py-3.5 text-[14.5px] outline-none focus:border-charcoal/40">
                    {topics.map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-[12px] font-bold tracking-[0.12em] uppercase text-charcoal/60">Message</label>
                  <textarea value={form.message} onChange={set("message")} rows={6} placeholder="How can we help?" required className="mt-2 w-full bg-ivory border border-line rounded-2xl px-5 py-3.5 text-[14.5px] outline-none focus:border-charcoal/40 placeholder:text-charcoal/35 resize-none" />
                </div>
                {state === "error" && (
                  <p className="text-[13px] font-bold text-red-900 bg-red-50 border border-red-200 rounded-xl px-4 py-3 flex items-center gap-2">
                    <AlertCircle size={15} /> {msg}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={state === "loading"}
                  className="group w-full bg-charcoal text-cream rounded-full py-4 text-[12px] tracking-[0.22em] uppercase font-bold hover:bg-graphite transition-colors flex items-center justify-center gap-2.5 disabled:opacity-60"
                >
                  {state === "loading" ? "Sending…" : "Send message"} <Send size={15} className="cta-arrow" />
                </button>
                <p className="text-[12px] text-charcoal/45 text-center">We typically reply within 1–2 business days.</p>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </div>
  );
}
