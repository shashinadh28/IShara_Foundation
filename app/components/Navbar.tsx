"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";

const G = {
  dark:  "#1A3A1A",
  fresh: "#4E9944",
  light: "#7DC46E",
};

const navLinks = [
  { label: "Home",             href: "#hero" },
  { label: "About",            href: "#about-ishara" },
  { label: "What We Support",  href: "#focus-areas" },
  { label: "Our Contribution", href: "#contribution" },
  { label: "Our Values",       href: "#core-values" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* ── FLOATING NAVBAR ──────────────────────────────────────────────── */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-4 left-0 right-0 z-50 px-3 sm:px-5 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">

          {/* ── DESKTOP ───────────────────────────────────────────────────── */}
          <div
            className="hidden md:flex items-stretch rounded-2xl overflow-hidden"
            style={{ boxShadow: "0 10px 48px rgba(0,0,0,0.35)" }}
          >
            {/* White logo section */}
            <Link
              href="/"
              className="flex items-center justify-center bg-white px-5 py-3 flex-shrink-0"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/IShara-Foundation-logo-2.jpeg"
                alt="IShara Foundation"
                style={{ height: "44px", width: "auto", display: "block", objectFit: "contain" }}
              />
            </Link>

            {/* Thin divider line */}
            <div className="w-px self-stretch" style={{ background: "rgba(45,90,39,0.15)" }} />

            {/* Dark green nav section */}
            <div
              className="flex items-center flex-1 px-4 xl:px-8 gap-2"
              style={{ background: G.dark }}
            >
              {/* Nav links — centered */}
              <nav className="flex items-center justify-center gap-1 flex-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="px-4 py-2.5 rounded-lg text-sm font-semibold whitespace-nowrap transition-all duration-200"
                    style={{ color: "rgba(255,255,255,0.72)" }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.color = "#fff";
                      (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.09)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.72)";
                      (e.currentTarget as HTMLElement).style.background = "transparent";
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              {/* CTA */}
              <Link
                href="#cta"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-bold text-sm flex-shrink-0 transition-all duration-300 hover:brightness-110"
                style={{
                  background: G.fresh,
                  boxShadow: `0 4px 20px rgba(78,153,68,0.45)`,
                }}
              >
                Get Involved <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* ── MOBILE ────────────────────────────────────────────────────── */}
          <div
            className="md:hidden flex items-stretch rounded-xl overflow-hidden"
            style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.30)" }}
          >
            {/* Logo */}
            <Link href="/" className="flex items-center bg-white px-4 py-3 flex-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/IShara-Foundation-logo-2.jpeg"
                alt="IShara Foundation"
                style={{ height: "36px", width: "auto", objectFit: "contain" }}
              />
            </Link>

            {/* Hamburger */}
            <button
              className="flex items-center justify-center w-14 flex-shrink-0"
              style={{ background: G.dark }}
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                {menuOpen ? (
                  <motion.span key="close"
                    initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}
                  >
                    <X className="w-5 h-5 text-white" />
                  </motion.span>
                ) : (
                  <motion.span key="menu"
                    initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}
                  >
                    <Menu className="w-5 h-5 text-white" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>

          {/* ── MOBILE DROPDOWN ──────────────────────────────────────────── */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                key="dropdown"
                initial={{ opacity: 0, y: -8, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: -8, height: 0 }}
                transition={{ duration: 0.22 }}
                className="md:hidden mt-2 rounded-xl overflow-hidden"
                style={{ background: G.dark, boxShadow: "0 12px 40px rgba(0,0,0,0.30)" }}
              >
                <div className="py-3 px-3 space-y-1">
                  {navLinks.map((link, i) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200"
                        style={{ color: "rgba(255,255,255,0.75)" }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.background = "rgba(125,196,110,0.12)";
                          (e.currentTarget as HTMLElement).style.color = G.light;
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.background = "transparent";
                          (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.75)";
                        }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: G.light }} />
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                  <motion.div
                    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: navLinks.length * 0.06 }}
                    className="pt-2 pb-1 px-1"
                  >
                    <Link
                      href="#cta"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-white font-bold text-sm"
                      style={{ background: G.fresh }}
                    >
                      Get Involved <ArrowRight className="w-4 h-4" />
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </motion.header>
    </>
  );
}
