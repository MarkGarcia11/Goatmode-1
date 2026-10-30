"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Lock, ArrowLeft, CheckCircle2, CreditCard, AlertCircle } from "lucide-react";
import { useCart } from "@/components/CartProvider";
import { formatPrice } from "@/lib/utils";

export default function CheckoutPage() {
  const { items, subtotal, clear } = useCart();
  const [form, setForm] = useState({ email: "", firstName: "", lastName: "", address: "", city: "", zip: "", country: "United States" });
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [msg, setMsg] = useState("");
  const [orderId, setOrderId] = useState<number | null>(null);

  const shipping = subtotal >= 15000 || subtotal === 0 ? 0 : 800;
  const total = subtotal + shipping;

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  async function place(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setState("error");
      setMsg("Please enter a valid email address.");
      return;
    }
    if (!form.firstName.trim() || !form.address.trim() || !form.city.trim() || !form.zip.trim()) {
      setState("error");
      setMsg("Please complete your shipping details.");
      return;
    }
    setState("loading");
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          firstName: form.firstName,
          lastName: form.lastName,
          items: items.map((i) => ({ slug: i.slug, name: i.name, size: i.size, color: i.color, qty: i.qty, priceCents: i.priceCents, image: i.image })),
          subtotalCents: total,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not place order");
      setOrderId(data.orderId);
      setState("done");
      clear();
    } catch (err) {
      setState("error");
      setMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (state === "done") {
    return (
      <div className="pt-[170px] pb-24 mx-auto max-w-[640px] px-5 text-center">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
          <CheckCircle2 size={56} strokeWidth={1.3} className="mx-auto text-sage-deep" />
          <h1 className="font-display text-[44px] sm:text-[56px] mt-6">
            Order <span className="italic">reserved.</span>
          </h1>
          <p className="text-charcoal/60 mt-4 leading-relaxed">
            Thank you{form.firstName ? `, ${form.firstName}` : ""}. Your order{" "}
            <span className="font-bold text-charcoal">#{orderId}</span> has been reserved.
            Our secure payment integration activates at launch — we&apos;ll email you at{" "}
            <span className="font-bold text-charcoal">{form.email}</span> to complete payment.
          </p>
          <Link
            href="/shop"
            className="mt-8 inline-flex items-center gap-2 bg-charcoal text-cream rounded-full px-8 py-4 text-[11.5px] tracking-[0.2em] uppercase font-bold"
          >
            Continue shopping
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-[150px] md:pt-[170px] mx-auto max-w-[1200px] px-5 sm:px-8 pb-24">
      <Link href="/cart" className="inline-flex items-center gap-2 text-[12px] tracking-[0.18em] uppercase font-bold text-charcoal/60 hover:text-charcoal">
        <ArrowLeft size={15} /> Back to bag
      </Link>
      <h1 className="font-display text-[44px] sm:text-[60px] mt-4">
        Secure <span className="italic">checkout.</span>
      </h1>

      {items.length === 0 ? (
        <div className="text-center py-16 bg-ivory/60 rounded-[24px] mt-8">
          <p className="font-display text-3xl">Your bag is empty</p>
          <Link href="/shop" className="mt-6 inline-block bg-charcoal text-cream rounded-full px-8 py-4 text-[11.5px] tracking-[0.2em] uppercase font-bold">
            Explore collection
          </Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-[1fr_400px] gap-10 mt-10 items-start">
          <form onSubmit={place} className="space-y-8">
            <section className="bg-white border border-line rounded-[22px] p-6 sm:p-8">
              <h2 className="font-bold text-[16px]">Contact</h2>
              <input
                type="email"
                value={form.email}
                onChange={set("email")}
                placeholder="Email address"
                className="mt-4 w-full bg-ivory border border-line rounded-2xl px-5 py-3.5 text-[14.5px] outline-none focus:border-charcoal/40 placeholder:text-charcoal/35"
              />
            </section>

            <section className="bg-white border border-line rounded-[22px] p-6 sm:p-8">
              <h2 className="font-bold text-[16px]">Shipping address</h2>
              <div className="grid sm:grid-cols-2 gap-3.5 mt-4">
                <input value={form.firstName} onChange={set("firstName")} placeholder="First name" className="bg-ivory border border-line rounded-2xl px-5 py-3.5 text-[14.5px] outline-none focus:border-charcoal/40 placeholder:text-charcoal/35" />
                <input value={form.lastName} onChange={set("lastName")} placeholder="Last name" className="bg-ivory border border-line rounded-2xl px-5 py-3.5 text-[14.5px] outline-none focus:border-charcoal/40 placeholder:text-charcoal/35" />
                <input value={form.address} onChange={set("address")} placeholder="Street address" className="sm:col-span-2 bg-ivory border border-line rounded-2xl px-5 py-3.5 text-[14.5px] outline-none focus:border-charcoal/40 placeholder:text-charcoal/35" />
                <input value={form.city} onChange={set("city")} placeholder="City" className="bg-ivory border border-line rounded-2xl px-5 py-3.5 text-[14.5px] outline-none focus:border-charcoal/40 placeholder:text-charcoal/35" />
                <input value={form.zip} onChange={set("zip")} placeholder="ZIP / Postcode" className="bg-ivory border border-line rounded-2xl px-5 py-3.5 text-[14.5px] outline-none focus:border-charcoal/40 placeholder:text-charcoal/35" />
              </div>
            </section>

            <section className="bg-ivory border border-line rounded-[22px] p-6 sm:p-8">
              <h2 className="font-bold text-[16px] flex items-center gap-2">
                <CreditCard size={18} /> Payment
              </h2>
              <div className="mt-4 bg-cream border border-dashed border-charcoal/25 rounded-2xl p-5 flex gap-3.5">
                <Lock size={18} className="shrink-0 mt-0.5 text-charcoal/60" />
                <p className="text-[13.5px] leading-relaxed text-charcoal/65">
                  Our secure payment provider integration activates at launch. Placing your order
                  now <span className="font-bold text-charcoal">reserves your items — no payment is taken today.</span> We
                  never simulate or fake payments.
                </p>
              </div>
            </section>

            {state === "error" && (
              <p className="text-[13.5px] font-bold text-red-900 bg-red-50 border border-red-200 rounded-2xl px-5 py-4 flex items-center gap-2.5">
                <AlertCircle size={17} /> {msg}
              </p>
            )}

            <button
              type="submit"
              disabled={state === "loading"}
              className="w-full bg-charcoal text-cream rounded-full py-5 text-[12.5px] tracking-[0.22em] uppercase font-bold hover:bg-graphite transition-colors flex items-center justify-center gap-2.5 disabled:opacity-60"
            >
              <Lock size={15} />
              {state === "loading" ? "Reserving your order…" : `Reserve order — ${formatPrice(total)}`}
            </button>
          </form>

          <aside className="bg-white border border-line rounded-[22px] p-6 sm:p-7 lg:sticky lg:top-[150px]">
            <p className="font-bold text-[16px]">Order summary</p>
            <div className="mt-5 space-y-4 max-h-[320px] overflow-y-auto pr-1">
              {items.map((i) => (
                <div key={i.key} className="flex gap-3.5 items-center">
                  <div className="relative w-14 h-16 rounded-xl overflow-hidden bg-ivory shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={i.image} alt={i.name} className="w-full h-full object-cover" />
                    <span className="absolute top-1 right-1 w-5 h-5 rounded-full bg-charcoal text-cream text-[10px] font-bold flex items-center justify-center">
                      {i.qty}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-[13px] truncate">{i.name}</p>
                    <p className="text-[12px] text-charcoal/55">{i.color} · {i.size}</p>
                  </div>
                  <p className="font-bold text-[13px]">{formatPrice(i.priceCents * i.qty)}</p>
                </div>
              ))}
            </div>
            <div className="border-t border-line mt-5 pt-5 space-y-2.5 text-[14px]">
              <div className="flex justify-between text-charcoal/65">
                <span>Subtotal</span>
                <span className="font-bold text-charcoal">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-charcoal/65">
                <span>Shipping</span>
                <span className="font-bold text-charcoal">{shipping === 0 ? "Complimentary" : formatPrice(shipping)}</span>
              </div>
              <div className="flex justify-between text-[17px] pt-2">
                <span className="font-bold">Total</span>
                <span className="font-bold">{formatPrice(total)}</span>
              </div>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
