"use client";

import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import BrandLoader from "./BrandLoader";
import Navbar from "./Navbar";
import CartDrawer from "./CartDrawer";
import Footer from "./Footer";
import { CartProvider, useCart } from "./CartProvider";
import { CheckCircle2 } from "lucide-react";

function Toast() {
  const { toast } = useCart();
  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.97 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[90] bg-charcoal text-cream pl-4 pr-6 py-3.5 rounded-full flex items-center gap-2.5 shadow-2xl text-[13.5px] font-semibold whitespace-nowrap"
        >
          <CheckCircle2 size={17} className="text-sage" /> {toast}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Shell({ children, footer = true }: { children: React.ReactNode; footer?: boolean }) {
  const [, setLoaded] = useState(false);
  const done = useCallback(() => setLoaded(true), []);
  return (
    <>
      <BrandLoader onDone={done} />
      <Navbar />
      <main className="min-h-screen">{children}</main>
      {footer && <Footer />}
      <CartDrawer />
      <Toast />
    </>
  );
}

export default function Chrome({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <Shell>{children}</Shell>
    </CartProvider>
  );
}
