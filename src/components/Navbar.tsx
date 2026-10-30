"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Search, User, ShoppingBag, Menu, X } from "lucide-react";
import GoatLogo from "./GoatLogo";
import { NAV_LINKS, ANNOUNCEMENTS } from "@/lib/site";
import { useCart } from "./CartProvider";
import { cn } from "@/lib/utils";

export function AnnouncementBar() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % ANNOUNCEMENTS.length), 4200);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="bg-charcoal text-cream/90 text-center overflow-hidden">
      <div className="relative h-9 flex items-center justify-center px-4">
        <AnimatePresence mode="wait">
          <motion.p
            key={i}
            initial={{ y: 14, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -14, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="text-[10px] sm:text-[11px] tracking-[0.28em] uppercase font-semibold"
          >
            {ANNOUNCEMENTS[i]}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const pathname = usePathname();
  const { count, setOpen: setCartOpen } = useCart();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const solid = scrolled || !isHome || menuOpen;

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-[60]">
        <AnnouncementBar />
        <div
          className={cn(
            "transition-all duration-500",
            solid
              ? "bg-cream/90 backdrop-blur-xl border-b border-line shadow-[0_8px_30px_-18px_rgba(34,35,33,0.35)]"
              : "bg-transparent border-b border-transparent"
          )}
        >
          <nav className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10 h-[68px] md:h-[76px] flex items-center justify-between gap-4">
            {/* left: burger (mobile) + logo */}
            <div className="flex items-center gap-3">
              <button
                className={cn(
                  "lg:hidden p-2 -ml-2 transition-colors",
                  solid ? "text-charcoal" : "text-cream"
                )}
                onClick={() => setMenuOpen(true)}
                aria-label="Open menu"
              >
                <Menu size={22} strokeWidth={1.6} />
              </button>
              <Link href="/" aria-label="Goat Mode home" className="group">
                <span className="transition-transform duration-500 group-hover:scale-[1.03] inline-flex">
                  <GoatLogo variant={solid ? "dark" : "light"} size="sm" />
                </span>
              </Link>
            </div>

            {/* center links */}
            <div className="hidden lg:flex items-center gap-9">
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  data-active={pathname === l.href}
                  className={cn(
                    "link-line text-[11.5px] tracking-[0.22em] uppercase font-bold transition-colors",
                    solid ? "text-charcoal/80 hover:text-charcoal" : "text-cream/85 hover:text-cream"
                  )}
                >
                  {l.label}
                </Link>
              ))}
            </div>

            {/* right icons */}
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                onClick={() => setSearchOpen((v) => !v)}
                aria-label="Search"
                className={cn(
                  "p-2.5 rounded-full transition-all hover:bg-black/5",
                  solid ? "text-charcoal" : "text-cream hover:bg-white/10"
                )}
              >
                <Search size={19} strokeWidth={1.7} />
              </button>
              <Link
                href="/account"
                aria-label="Account"
                className={cn(
                  "hidden sm:inline-flex p-2.5 rounded-full transition-all hover:bg-black/5",
                  solid ? "text-charcoal" : "text-cream hover:bg-white/10"
                )}
              >
                <User size={19} strokeWidth={1.7} />
              </Link>
              <button
                onClick={() => setCartOpen(true)}
                aria-label="Shopping bag"
                className={cn(
                  "relative p-2.5 rounded-full transition-all hover:bg-black/5",
                  solid ? "text-charcoal" : "text-cream hover:bg-white/10"
                )}
              >
                <ShoppingBag size={19} strokeWidth={1.7} />
                <AnimatePresence>
                  {count > 0 && (
                    <motion.span
                      key={count}
                      initial={{ scale: 0.4, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.4, opacity: 0 }}
                      className="absolute -top-0.5 -right-0.5 min-w-[19px] h-[19px] px-1 rounded-full bg-charcoal text-cream text-[10px] font-bold flex items-center justify-center"
                    >
                      {count}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </nav>

          {/* expanding search */}
          <AnimatePresence>
            {searchOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden border-t border-line bg-cream"
              >
                <form
                  action="/search"
                  method="get"
                  className="mx-auto max-w-3xl px-6 py-5 flex items-center gap-3"
                  onSubmit={() => setSearchOpen(false)}
                >
                  <Search size={18} className="text-charcoal/50" />
                  <input
                    name="q"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search shirts, leggings, hoodies…"
                    className="flex-1 bg-transparent outline-none text-[15px] placeholder:text-charcoal/40"
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="text-[11px] tracking-[0.2em] uppercase font-bold bg-charcoal text-cream px-5 py-2.5 rounded-full hover:bg-graphite transition-colors"
                  >
                    Search
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[70] bg-ivory flex flex-col lg:hidden"
          >
            <div className="flex items-center justify-between px-4 h-[104px]">
              <GoatLogo size="sm" />
              <button
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                className="p-2.5 rounded-full bg-charcoal text-cream"
              >
                <X size={20} strokeWidth={1.7} />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto px-6 pb-8">
              {NAV_LINKS.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={l.href}
                    className="group flex items-baseline gap-4 py-4 border-b border-line"
                  >
                    <span className="text-[11px] font-bold text-charcoal/35 tracking-widest">
                      0{i + 1}
                    </span>
                    <span className="font-display text-[34px] leading-none group-active:italic">
                      {l.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="grid grid-cols-2 gap-3 mt-8"
              >
                <Link
                  href="/men"
                  className="bg-charcoal text-cream rounded-2xl p-5 text-left active:scale-[0.98] transition-transform"
                >
                  <p className="eyebrow opacity-70">Shop</p>
                  <p className="font-display text-2xl mt-1">Men</p>
                </Link>
                <Link
                  href="/women"
                  className="bg-sage/40 text-charcoal rounded-2xl p-5 text-left active:scale-[0.98] transition-transform"
                >
                  <p className="eyebrow opacity-70">Shop</p>
                  <p className="font-display text-2xl mt-1">Women</p>
                </Link>
              </motion.div>
            </nav>
            <div className="px-6 pb-8 text-[11px] tracking-[0.2em] uppercase text-charcoal/50 font-semibold flex justify-between">
              <span>Goat Mode © 2026</span>
              <span>Built for your journey</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
