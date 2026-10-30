"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import { Reveal, SplitWords } from "./Reveal";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [msg, setMsg] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setState("error");
      setMsg("Please enter a valid email address.");
      return;
    }
    setState("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setState("done");
      setMsg(data.message || "Welcome to Goat Mode. You're on the list.");
    } catch (err) {
      setState("error");
      setMsg(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  return (
    <section className="relative bg-ivory overflow-hidden">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 py-20 md:py-32 grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
        <div>
          <Reveal>
            <p className="eyebrow text-charcoal/50">The inner circle</p>
          </Reveal>
          <h2 className="font-display text-[42px] sm:text-[56px] lg:text-[68px] leading-[1.02] mt-5 text-balance">
            <SplitWords text="Be part of" /> <br />
            <span className="italic text-graphite">
              <SplitWords text="what's next." delay={0.25} />
            </span>
          </h2>
          <Reveal delay={0.2}>
            <p className="mt-5 text-charcoal/60 text-[15.5px] leading-relaxed max-w-[440px]">
              First access to new collections, launches and quiet updates.
              No noise — only what matters.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="bg-cream rounded-[24px] p-6 sm:p-10 shadow-[0_30px_80px_-40px_rgba(34,35,33,0.35)] border border-line">
            {state === "done" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <CheckCircle2 size={44} strokeWidth={1.4} className="mx-auto text-sage-deep" />
                <p className="font-display text-3xl mt-4">You&apos;re in.</p>
                <p className="text-charcoal/60 text-sm mt-2">{msg}</p>
              </motion.div>
            ) : (
              <form onSubmit={submit} noValidate>
                <label htmlFor="nl-email" className="eyebrow text-charcoal/50">
                  Email address
                </label>
                <div className="mt-3 flex flex-col sm:flex-row gap-3">
                  <input
                    id="nl-email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (state === "error") setState("idle");
                    }}
                    placeholder="you@example.com"
                    className="flex-1 bg-ivory border border-line rounded-full px-6 py-4 text-[15px] outline-none focus:border-charcoal/40 transition-colors placeholder:text-charcoal/35"
                  />
                  <button
                    type="submit"
                    disabled={state === "loading"}
                    className="group bg-charcoal text-cream rounded-full px-8 py-4 text-[11.5px] tracking-[0.2em] uppercase font-bold hover:bg-graphite transition-colors flex items-center justify-center gap-2 disabled:opacity-60 shrink-0"
                  >
                    {state === "loading" ? "Joining…" : "Subscribe"}
                    <ArrowRight size={15} className="cta-arrow" />
                  </button>
                </div>
                {state === "error" && (
                  <p className="mt-3 text-[13px] text-red-900/80 flex items-center gap-2">
                    <AlertCircle size={15} /> {msg}
                  </p>
                )}
                <p className="mt-4 text-[12px] text-charcoal/45 leading-relaxed">
                  By subscribing you agree to our privacy policy. Unsubscribe anytime.
                  We respect your inbox.
                </p>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
