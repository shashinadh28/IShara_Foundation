"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight, Leaf, Users, Globe, BookOpen,
  Heart, Sprout, TreePine, Shield, Quote,
  MapPin, Phone, Mail, ExternalLink,
} from "lucide-react";

/* ─── Green palette ────────────────────────────────────────────────── */
const G = {
  dark:  "#1A3A1A",
  deep:  "#2D5A27",
  mid:   "#3D7A35",
  fresh: "#4E9944",
  light: "#7DC46E",
  pale:  "#D4EDCC",
  cream: "#F4F9F2",
  gold:  "#C9A84C",
};

/* ─── Animation variants ─────────────────────────────────────────── */
const fadeUp = {
  hidden:  { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};
const stagger = { visible: { transition: { staggerChildren: 0.13 } } };
const scaleIn = {
  hidden:  { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" as const } },
};
const slideLeft = {
  hidden:  { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};
const slideRight = {
  hidden:  { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

/* ─── Reusable leaf dot ──────────────────────────────────────────── */
function LeafDot({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-block w-1.5 h-1.5 rounded-full animate-pulse ${className}`}
      style={{ background: G.fresh }}
    />
  );
}

/* ─── Animated counter ───────────────────────────────────────────── */
function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 1800;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  );
}

/* ─── Section label pill ─────────────────────────────────────────── */
function SectionLabel({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <span
      className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-5"
      style={
        dark
          ? { background: "rgba(125,196,110,0.15)", color: G.light, border: `1px solid rgba(125,196,110,0.35)` }
          : { background: G.pale, color: G.deep, border: `1px solid ${G.light}50` }
      }
    >
      <LeafDot /> {children}
    </span>
  );
}

/* ═══════════════════════════════════════════════════════════════════ */
export default function CSRClient() {
  const [hoveredValue, setHoveredValue] = useState<number | null>(null);
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const bgY   = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);

  return (
    <div className="overflow-hidden" style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif" }}>

      {/* ══════════════════════════ HERO ════════════════════════════════════ */}
      <section
        id="hero"
        ref={heroRef}
        className="relative min-h-screen flex items-center overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-20"
        style={{ background: `linear-gradient(165deg, #061506 0%, ${G.dark} 40%, ${G.deep} 80%, #153615 100%)` }}
      >
        {/* Parallax background */}
        <motion.div className="absolute inset-0 pointer-events-none" style={{ y: bgY }}>
          <div className="absolute top-0 right-0 w-[900px] h-[900px] rounded-full"
            style={{ background: `radial-gradient(circle, ${G.light}18 0%, transparent 65%)` }} />
          <div className="absolute -bottom-20 -left-20 w-[700px] h-[700px] rounded-full"
            style={{ background: `radial-gradient(circle, ${G.mid}12 0%, transparent 65%)` }} />
          <div className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle, rgba(125,196,110,0.10) 1.5px, transparent 1.5px)`,
              backgroundSize: "32px 32px",
            }}
          />
          <svg className="absolute right-[-40px] top-[-40px] w-[600px] h-[600px] opacity-[0.07]" viewBox="0 0 500 500" fill="none">
            <circle cx="250" cy="250" r="230" stroke={G.light} strokeWidth="1" strokeDasharray="8 14" />
            <circle cx="250" cy="250" r="175" stroke={G.light} strokeWidth="0.7" strokeDasharray="4 10" />
            <circle cx="250" cy="250" r="120" stroke={G.light} strokeWidth="0.4" />
            <circle cx="250" cy="250" r="65"  stroke={G.light} strokeWidth="0.3" />
          </svg>
          {/* Extra bottom-left circle */}
          <svg className="absolute left-[-60px] bottom-[-60px] w-[380px] h-[380px] opacity-[0.05]" viewBox="0 0 380 380" fill="none">
            <circle cx="190" cy="190" r="170" stroke={G.light} strokeWidth="1" strokeDasharray="6 10" />
          </svg>
        </motion.div>

        {/* Hero content */}
        <motion.div
          className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          style={{ y: textY }}
        >
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-12 items-center">

            {/* Left column */}
            <motion.div initial="hidden" animate="visible" variants={stagger} className="text-center lg:text-left">
              {/* Breadcrumb */}
              <motion.div variants={fadeUp} className="flex items-center justify-center lg:justify-start gap-2 mb-6 text-sm">
                <Link href="/" className="text-white/30 hover:text-white transition-colors">Home</Link>
                <span className="text-white/20">/</span>
                <span className="font-semibold" style={{ color: G.light }}>IShara Foundation</span>
              </motion.div>

              {/* Eyebrow */}
              <motion.span
                variants={fadeUp}
                className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-[0.15em] mb-6"
                style={{
                  background: "rgba(125,196,110,0.12)",
                  border: "1px solid rgba(125,196,110,0.35)",
                  color: G.light,
                  backdropFilter: "blur(8px)",
                }}
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60" style={{ background: G.fresh }} />
                  <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: G.fresh }} />
                </span>
                NexeraTech&apos;s CSR Initiative
              </motion.span>

              {/* Heading */}
              <motion.h1
                variants={fadeUp}
                className="text-4xl sm:text-5xl lg:text-[4.5rem] font-black text-white leading-[1.06] tracking-tight mb-6"
              >
                Technology for{" "}
                <span
                  style={{
                    background: `linear-gradient(120deg, ${G.light} 0%, #B8E8A0 45%, ${G.pale} 100%)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Meaningful
                </span>
                {" "}Social Change
              </motion.h1>

              {/* Accent line */}
              <motion.div
                variants={fadeUp}
                className="mb-6 mx-auto lg:mx-0"
                style={{ height: "3px", background: `linear-gradient(90deg, ${G.light}, transparent)`, maxWidth: "200px", borderRadius: "99px" }}
              />

              <motion.p variants={fadeUp} className="text-base text-white/70 leading-[1.8] mb-8 max-w-lg mx-auto lg:mx-0">
                NexeraTech Solutions partners with{" "}
                <span className="font-semibold text-emerald-300">IShara Foundation</span>{" "}
                to advance digital inclusion, education, and community development across India — because social
                impact is one of our four defining core values.
              </motion.p>

              {/* CTA buttons */}
              <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-8">
                <Link
                  href="#cta"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-white font-bold text-sm transition-all duration-300 hover:brightness-115 shadow-lg hover:shadow-2xl"
                  style={{
                    background: `linear-gradient(135deg, ${G.deep} 0%, ${G.fresh} 100%)`,
                    boxShadow: `0 8px 28px rgba(45,90,39,0.40)`,
                  }}
                >
                  Get Involved <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="#about-ishara"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-sm transition-all duration-300"
                  style={{ border: "1.5px solid rgba(125,196,110,0.35)", color: G.light }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(125,196,110,0.10)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                >
                  Learn More
                </Link>
              </motion.div>

              {/* Trust strip */}
              <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-5">
                {[
                  { icon: Shield, text: "Committed CSR Partner" },
                  { icon: Heart,  text: "Social Impact Core Value" },
                  { icon: Globe,  text: "Digital Inclusion Focus" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <item.icon className="w-4 h-4 flex-shrink-0" style={{ color: G.light }} />
                    <span className="text-sm font-semibold text-white/55">{item.text}</span>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right column — image card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
              className="relative mt-12 lg:mt-0"
            >
              <div className="relative max-w-[560px] mx-auto lg:mr-0">
                <div className="absolute -inset-2 bg-gradient-to-tr from-emerald-800/10 to-yellow-500/5 rounded-[2.5rem] blur-xl -z-10" />

                <div className="relative rounded-[2rem] overflow-hidden border-8 border-white/90 shadow-2xl">
                  <Image
                    src="/IShara-Foundation/landing-page.webp"
                    alt="IShara Foundation — Empowering Communities"
                    width={560}
                    height={480}
                    className="w-full h-[460px] object-cover transition-transform duration-700 hover:scale-105"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent pointer-events-none" />
                  <div className="absolute bottom-6 right-6 text-white text-right z-10">
                    <p className="text-xs uppercase tracking-widest font-semibold opacity-70">Grassroots Support</p>
                    <h4 className="text-lg font-black">Empowering Communities</h4>
                  </div>
                </div>

                {/* Logo card */}
                <div
                  className="absolute -bottom-6 left-4 sm:-left-6 bg-white rounded-2xl p-5 border border-stone-100 flex flex-col items-center z-20"
                  style={{ boxShadow: "0 20px 40px rgba(0,0,0,0.13)" }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/IShara-Foundation-logo-2.jpeg"
                    alt="IShara Foundation Logo"
                    style={{ width: "140px", height: "auto", display: "block", objectFit: "contain" }}
                  />
                  <div className="flex items-center gap-1.5 mt-3">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: G.fresh }} />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500">Official CSR Partner</span>
                  </div>
                </div>

                {/* Stats badge */}
                <div
                  className="absolute -top-6 right-4 sm:-right-6 bg-white rounded-2xl p-4 border border-stone-100 flex items-center gap-3 z-20"
                  style={{ boxShadow: "0 20px 40px rgba(0,0,0,0.10)" }}
                >
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-emerald-50 text-lg">🌱</div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 leading-none">Lives Impacted</p>
                    <p className="text-sm font-black text-stone-800 mt-1">10,000+ and growing</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.6 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: "rgba(255,255,255,0.22)" }}>Scroll</span>
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="h-8 w-5 rounded-full flex items-start justify-center pt-1.5"
            style={{ border: "1px solid rgba(255,255,255,0.22)" }}
          >
            <div className="h-1.5 w-1.5 rounded-full" style={{ background: G.light, opacity: 0.5 }} />
          </motion.div>
        </motion.div>
      </section>

      {/* ══════════════════════ IMPACT NUMBERS ══════════════════════════════ */}
      <section
        id="about-ishara"
        className="py-20 relative z-20 rounded-t-[3.5rem] -mt-14"
        style={{
          background: G.cream,
          boxShadow: "0 -24px 60px rgba(10,31,10,0.18)",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Stats row */}
          <div
            className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x rounded-2xl overflow-hidden"
            style={{ background: "#fff", border: `1px solid ${G.pale}`, boxShadow: "0 4px 32px rgba(45,90,39,0.07)" }}
          >
            {[
              { icon: "🌱", value: 10000, suffix: "+", label: "Lives Positively Impacted" },
              { icon: "🤝", value: 4,     suffix: "+",  label: "Years of Partnership" },
              { icon: "💻", value: 12,    suffix: "",   label: "Programs Supported" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="py-10 px-8 text-center"
                style={{ borderColor: G.pale }}
              >
                <span className="text-4xl block mb-3">{item.icon}</span>
                <p
                  className="text-4xl font-black mb-1"
                  style={{ color: G.deep }}
                >
                  <AnimatedCounter target={item.value} suffix={item.suffix} />
                </p>
                <p className="text-sm font-semibold" style={{ color: G.mid }}>{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════ MISSION QUOTE BANNER ═════════════════════ */}
      <section
        className="py-16 relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${G.deep} 0%, ${G.dark} 100%)` }}
      >
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `radial-gradient(circle, ${G.light} 1px, transparent 1px)`,
            backgroundSize: "24px 24px",
          }}
        />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <Quote className="w-10 h-10 mx-auto mb-6 opacity-40" style={{ color: G.light }} />
            <blockquote
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-snug mb-8"
              style={{ textShadow: "0 2px 24px rgba(0,0,0,0.25)" }}
            >
              &ldquo;Social impact is not a campaign — it is a{" "}
              <span
                style={{
                  background: `linear-gradient(120deg, ${G.light}, ${G.pale})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                core commitment
              </span>{" "}
              we live every day.&rdquo;
            </blockquote>
            <div className="flex items-center justify-center gap-3">
              <div className="w-10 h-0.5 rounded-full" style={{ background: G.light, opacity: 0.4 }} />
              <p className="text-sm font-semibold" style={{ color: G.light }}>NexeraTech Solutions — Core Values</p>
              <div className="w-10 h-0.5 rounded-full" style={{ background: G.light, opacity: 0.4 }} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════ ABOUT ISHARA ════════════════════════════════ */}
      <section className="section-py" style={{ background: "#fff" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left copy */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
              <motion.div variants={fadeUp}>
                <SectionLabel>About IShara Foundation</SectionLabel>
              </motion.div>
              <motion.h2
                variants={fadeUp}
                className="text-4xl lg:text-5xl font-black mb-6 leading-[1.1]"
                style={{ color: G.dark }}
              >
                Nurturing Communities{" "}
                <span
                  style={{
                    background: `linear-gradient(135deg, ${G.deep}, ${G.fresh})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Through Technology
                </span>
              </motion.h2>

              <motion.div variants={fadeUp} className="space-y-5 text-base leading-[1.85]" style={{ color: "#4B5563" }}>
                <p>
                  IShara Foundation is a social impact organization dedicated to digital inclusion, education,
                  and community development. NexeraTech Solutions is a committed contributor — bringing
                  technology expertise, resources, and volunteering to support IShara&apos;s programs.
                </p>
                <p>
                  At NexeraTech, social impact is one of our four core values — not a footnote in an annual
                  report. We believe that companies with technology capabilities have a responsibility and an
                  opportunity to use those capabilities for good.
                </p>
              </motion.div>

              <motion.ul variants={stagger} className="mt-9 space-y-4">
                {[
                  { title: "Technology-first approach", desc: "Harnessing digital tools to solve real social challenges" },
                  { title: "Grassroots development",    desc: "Programs built from the community up, not top-down" },
                  { title: "Long-term commitment",      desc: "Multi-year strategic partnership, not one-off charity" },
                ].map((item, i) => (
                  <motion.li key={i} variants={fadeUp} className="flex items-start gap-4">
                    <span
                      className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center mt-0.5"
                      style={{ background: G.pale, border: `1.5px solid ${G.light}` }}
                    >
                      <Leaf className="w-3.5 h-3.5" style={{ color: G.deep }} />
                    </span>
                    <div>
                      <p className="text-sm font-bold" style={{ color: G.dark }}>{item.title}</p>
                      <p className="text-sm" style={{ color: "#6B7280" }}>{item.desc}</p>
                    </div>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>

            {/* Right visual card */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn}>
              <div
                className="relative rounded-3xl p-10 overflow-hidden"
                style={{
                  background: `linear-gradient(145deg, ${G.deep} 0%, ${G.dark} 100%)`,
                  boxShadow: `0 28px 70px rgba(45,90,39,0.40)`,
                }}
              >
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: `radial-gradient(circle, ${G.light} 1px, transparent 1px)`,
                    backgroundSize: "22px 22px",
                  }}
                />
                <div className="absolute top-4 right-4 opacity-15">
                  <TreePine className="w-28 h-28 text-white" />
                </div>

                <div className="relative z-10 text-center">
                  <div
                    className="inline-flex items-center justify-center mb-8 rounded-2xl px-6 py-4"
                    style={{ background: "rgba(255,255,255,0.95)", boxShadow: "0 4px 24px rgba(0,0,0,0.12)" }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/IShara-Foundation-logo-2.jpeg"
                      alt="IShara Foundation"
                      style={{ width: "200px", height: "auto", display: "block", objectFit: "contain" }}
                    />
                  </div>

                  <h3 className="text-2xl font-black text-white mb-2">IShara Foundation</h3>
                  <p className="mb-6 font-bold text-sm" style={{ color: G.light }}>NexeraTech&apos;s CSR Partner</p>
                  <p className="text-white/65 text-sm leading-relaxed">
                    Together, we are working toward a future where technology access, digital literacy,
                    and community development are available to everyone — regardless of socioeconomic background.
                  </p>

                  <div className="flex gap-3 justify-center mt-8 flex-wrap">
                    {["Digital Inclusion", "Education", "Community"].map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 rounded-full text-xs font-bold"
                        style={{ background: "rgba(125,196,110,0.18)", color: G.light, border: `1px solid rgba(125,196,110,0.32)` }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Divider */}
                  <div className="my-8 h-px" style={{ background: "rgba(255,255,255,0.10)" }} />

                  {/* Quick contact */}
                  <div className="space-y-2 text-left">
                    {[
                      { icon: MapPin, text: "India — National Reach" },
                      { icon: Globe,  text: "Digital-first Programs" },
                      { icon: Heart,  text: "People-centred Mission" },
                    ].map((c, i) => (
                      <div key={i} className="flex items-center gap-2.5">
                        <c.icon className="w-4 h-4 flex-shrink-0" style={{ color: G.light }} />
                        <span className="text-xs font-semibold" style={{ color: "rgba(255,255,255,0.60)" }}>{c.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ══════════════════════ FOCUS AREAS ═════════════════════════════════ */}
      <section
        id="focus-areas"
        className="section-py relative overflow-hidden"
        style={{
          background: G.cream,
          backgroundImage: `radial-gradient(circle, rgba(45,90,39,0.06) 1.5px, transparent 1.5px)`,
          backgroundSize: "28px 28px",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="text-center mb-16"
          >
            <SectionLabel>What We Support</SectionLabel>
            <h2 className="text-4xl lg:text-5xl font-black mt-2 mb-4" style={{ color: G.dark }}>
              Our Focus Areas
            </h2>
            <p className="text-base max-w-xl mx-auto leading-relaxed" style={{ color: "#6B7280" }}>
              Every initiative is rooted in creating lasting, measurable impact for underserved communities across India.
            </p>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              {
                icon: Globe,
                title: "Digital Inclusion",
                desc: "Making technology and internet access available to underserved communities across India.",
                image: "/IShara-Foundation/What-We-Support/Digital-Inclusion.webp",
                color: "#2D5A27",
              },
              {
                icon: BookOpen,
                title: "Education & Literacy",
                desc: "Digital literacy programs, computer skills training, and educational resources for youth.",
                image: "/IShara-Foundation/What-We-Support/Education-Literacy.webp",
                color: "#3D7A35",
              },
              {
                icon: Users,
                title: "Skills & Employment",
                desc: "Technology skills training and career development programs to enable economic mobility.",
                image: "/IShara-Foundation/What-We-Support/Skills-Employment.webp",
                color: "#4E9944",
              },
              {
                icon: Sprout,
                title: "Community Development",
                desc: "Using technology infrastructure to support community services and development projects.",
                image: "/IShara-Foundation/What-We-Support/Community-Development.webp",
                color: "#2D5A27",
              },
            ].map((area, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ y: -10, transition: { duration: 0.25 } }}
                className="group bg-white rounded-2xl overflow-hidden flex flex-col h-full cursor-default"
                style={{
                  border: `1px solid ${G.pale}`,
                  boxShadow: "0 2px 20px rgba(45,90,39,0.06)",
                  transition: "box-shadow 0.3s, border-color 0.3s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 20px 56px rgba(45,90,39,0.15)`;
                  (e.currentTarget as HTMLElement).style.borderColor = `${G.light}80`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 20px rgba(45,90,39,0.06)";
                  (e.currentTarget as HTMLElement).style.borderColor = G.pale;
                }}
              >
                {/* Image */}
                <div className="relative h-52 w-full overflow-hidden">
                  <Image
                    src={area.image}
                    alt={area.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover transition-transform duration-600 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/50 via-transparent to-transparent pointer-events-none" />
                  {/* Number badge */}
                  <div
                    className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-black"
                    style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(6px)" }}
                  >
                    0{i + 1}
                  </div>
                  {/* Icon */}
                  <div
                    className="absolute bottom-3 left-3 w-10 h-10 rounded-xl flex items-center justify-center shadow-md"
                    style={{ background: "rgba(255,255,255,0.93)" }}
                  >
                    <area.icon className="w-5 h-5" style={{ color: area.color }} />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="font-black text-lg mb-2 leading-snug" style={{ color: G.dark }}>
                    {area.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-stone-600 flex-grow">{area.desc}</p>
                  {/* Learn more link */}
                  <div
                    className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider group-hover:gap-2.5 transition-all"
                    style={{ color: G.mid }}
                  >
                    Learn more <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════ HOW NEXERATECH CONTRIBUTES ══════════════════ */}
      <section
        id="contribution"
        className="relative overflow-hidden"
        style={{ background: G.dark, minHeight: "560px" }}
      >
        {/* ── Full-bleed plant image, left half ── */}
        <div className="absolute inset-0 z-0">
          {/* Dark base overlay across full section */}
          <div className="absolute inset-0" style={{ background: `linear-gradient(110deg, rgba(10,26,10,0.92) 0%, rgba(10,26,10,0.75) 38%, rgba(10,26,10,0.55) 55%, rgba(10,26,10,0.80) 100%)` }} />
          {/* Plant image — right side atmospheric */}
          <div className="absolute bottom-0 left-1/4 w-[440px] h-full pointer-events-none">
            <Image
              src="/IShara-Foundation/Our-Contribution/hand-plant.webp"
              alt="Hands holding plant — growth and nurturing"
              fill
              sizes="440px"
              className="object-cover object-top"
              style={{ opacity: 0.55 }}
            />
            {/* gradient fade from plant to left */}
            <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(10,26,10,0.90) 0%, rgba(10,26,10,0.20) 50%, rgba(10,26,10,0.70) 100%)" }} />
          </div>
        </div>

        {/* ── Content grid ── */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid lg:grid-cols-[1fr_1.35fr] gap-12 lg:gap-16 items-start">

            {/* ── LEFT COLUMN ─────────────────────────────────────── */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideLeft}>
              {/* Label */}
              <span
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6"
                style={{ border: `1px solid rgba(125,196,110,0.45)`, color: G.light, background: "rgba(125,196,110,0.10)" }}
              >
                <LeafDot /> Our Contribution
              </span>

              {/* Heading */}
              <h2 className="text-4xl lg:text-5xl font-black text-white leading-[1.08] mb-6">
                How NexeraTech{"\n"}
                <span style={{
                  background: `linear-gradient(120deg, ${G.light} 0%, #B8E8A0 100%)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>Contributes</span>
              </h2>

              {/* Body copy */}
              <p className="text-sm leading-[1.85] mb-10 max-w-sm" style={{ color: "rgba(255,255,255,0.65)" }}>
                Our commitment goes far beyond writing a cheque. We embed ourselves in IShara&apos;s mission —
                contributing technology, talent, time and long-term strategic partnership.
              </p>

              {/* 6-ways badge card */}
              <div
                className="inline-flex flex-col items-start rounded-2xl p-6"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(125,196,110,0.22)",
                  backdropFilter: "blur(10px)",
                }}
              >
                {/* handshake icon */}
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: "rgba(125,196,110,0.18)", border: "1px solid rgba(125,196,110,0.30)" }}
                >
                  <Heart className="w-5 h-5" style={{ color: G.light }} />
                </div>
                <p
                  className="text-5xl font-black leading-none mb-1"
                  style={{ color: G.light }}
                >
                  6
                </p>
                <p className="text-xs font-semibold" style={{ color: "rgba(255,255,255,0.50)" }}>Ways we actively contribute</p>
              </div>
            </motion.div>

            {/* ── RIGHT COLUMN — stacked cards ─────────────────────── */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
              className="grid gap-3"
            >
              {[
                { icon: "⚙️",  title: "Technology Expertise",    text: "Pro bono and subsidized technology development for IShara programs" },
                { icon: "💰",  title: "Financial Contribution",  text: "Annual CSR commitment to IShara Foundation programs and operations" },
                { icon: "🙌",  title: "Team Volunteering",       text: "NexeraTech team members volunteer time and skills at IShara events" },
                { icon: "📚",  title: "Digital Skills Training", text: "NexeraTech engineers deliver digital literacy and coding workshops" },
                { icon: "🏗️", title: "Infrastructure Support",  text: "Technology infrastructure donation for IShara community centers" },
                { icon: "🤝",  title: "Long-term Partnership",   text: "Multi-year commitment to IShara's strategic development goals" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="flex items-center gap-4 rounded-xl px-5 py-4 transition-all duration-200 cursor-default"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(125,196,110,0.14)",
                    backdropFilter: "blur(8px)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(125,196,110,0.10)";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(125,196,110,0.40)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(125,196,110,0.14)";
                  }}
                >
                  {/* Icon bubble */}
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                    style={{ background: "rgba(255,255,255,0.09)", border: "1px solid rgba(125,196,110,0.18)" }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-sm font-black text-white leading-tight">{item.title}</p>
                    <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.50)" }}>{item.text}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

          </div>
        </div>
      </section>

      {/* ══════════════════════ CORE VALUES ═════════════════════════════════ */}
      <section id="core-values" className="section-py bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeUp}>
              <SectionLabel>Our Commitment</SectionLabel>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="text-4xl lg:text-5xl font-black mb-6 leading-[1.1]"
              style={{ color: G.dark }}
            >
              Social Impact is a Core Value,{" "}
              <span
                style={{
                  background: `linear-gradient(135deg, ${G.deep}, ${G.fresh})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Not a Campaign
              </span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-base leading-relaxed max-w-2xl mx-auto mb-14"
              style={{ color: "#6B7280" }}
            >
              At NexeraTech Solutions, Social Impact is listed alongside Innovation First, Delivery Excellence,
              and Client Partnership as one of our four defining values. Technology companies have both the
              capability and the responsibility to give back.
            </motion.p>

            {/* Values grid */}
            <motion.div variants={stagger} className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {[
                { label: "Innovation First",    icon: "💡", active: false, desc: "Pioneering solutions that push boundaries" },
                { label: "Delivery Excellence", icon: "🎯", active: false, desc: "Uncompromising quality in every deliverable" },
                { label: "Client Partnership",  icon: "🤝", active: false, desc: "Long-term relationships built on trust" },
                { label: "Social Impact",       icon: "🌱", active: true,  desc: "Technology for meaningful social change" },
              ].map((val, i) => {
                const isHovered = hoveredValue === i;
                return (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    whileHover={{ y: -6, transition: { duration: 0.22 } }}
                    onMouseEnter={() => setHoveredValue(i)}
                    onMouseLeave={() => setHoveredValue(null)}
                    className="rounded-2xl p-7 text-center transition-all duration-300 cursor-default"
                    style={{
                      background: isHovered
                        ? `linear-gradient(145deg, ${G.deep}, ${G.dark})`
                        : G.cream,
                      border: `2px solid ${isHovered ? G.mid : (val.active ? G.light : G.pale)}`,
                      boxShadow: isHovered ? `0 16px 44px rgba(45,90,39,0.32)` : "none",
                    }}
                  >
                    <span className="text-4xl block mb-4">{val.icon}</span>
                    <p className="text-sm font-black mb-2" style={{ color: isHovered ? "#fff" : G.dark, transition: "color 0.3s" }}>
                      {val.label}
                    </p>
                    <p className="text-xs leading-relaxed" style={{ color: isHovered ? "rgba(255,255,255,0.70)" : "#6B7280", transition: "color 0.3s" }}>
                      {val.desc}
                    </p>
                    {val.active && (
                      <span
                        className="inline-block mt-3 text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider"
                        style={{
                          background: isHovered ? "rgba(125,196,110,0.25)" : "rgba(45,90,39,0.15)",
                          color: isHovered ? G.light : G.deep,
                          transition: "all 0.3s"
                        }}
                      >
                        CSR Focus
                      </span>
                    )}
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════ TESTIMONIAL / WHY IT MATTERS ════════════════ */}
      <section
        className="section-py relative overflow-hidden"
        style={{
          background: G.cream,
          backgroundImage: `radial-gradient(circle, rgba(45,90,39,0.05) 1.5px, transparent 1.5px)`,
          backgroundSize: "30px 30px",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="text-center mb-14"
          >
            <SectionLabel>Why It Matters</SectionLabel>
            <h2 className="text-4xl lg:text-5xl font-black mt-2" style={{ color: G.dark }}>
              The Change We Are Creating
            </h2>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            className="grid md:grid-cols-3 gap-6"
          >
            {[
              {
                stat: "700M+",
                label: "Indians still lack meaningful internet access",
                context: "Digital inclusion is one of the largest untapped opportunities for social uplift.",
                icon: "🌐",
              },
              {
                stat: "₹1 in Tech",
                label: "can create ₹10+ in community economic value",
                context: "Technology investments in underserved communities have an outsized multiplier effect.",
                icon: "📈",
              },
              {
                stat: "1 Skill",
                label: "can transform an entire family's economic future",
                context: "A single digital skill imparted to one person ripples out to their entire household.",
                icon: "🌱",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="bg-white rounded-2xl p-8 border"
                style={{
                  border: `1px solid ${G.pale}`,
                  boxShadow: "0 4px 24px rgba(45,90,39,0.07)",
                }}
              >
                <div className="text-4xl mb-5">{item.icon}</div>
                <p
                  className="text-4xl font-black mb-2"
                  style={{ color: G.deep }}
                >
                  {item.stat}
                </p>
                <p className="text-base font-bold mb-3" style={{ color: G.dark }}>{item.label}</p>
                <p className="text-sm leading-relaxed" style={{ color: "#6B7280" }}>{item.context}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════ CTA ══════════════════════════════════════════ */}
      <section
        id="cta"
        className="py-28 relative overflow-hidden"
        style={{ background: `linear-gradient(160deg, ${G.dark} 0%, #0B1E0B 50%, ${G.deep} 100%)` }}
      >
        {/* Background Image — desktop/tablet only, hidden on mobile */}
        <div className="absolute inset-0 z-0 hidden md:block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/IShara-Foundation/CSR-Initiative/bg-image.webp"
            alt="CSR Initiative Background"
            className="w-full h-full object-cover"
          />
          {/* overlay to keep text readable */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-[#0A1F0A]/75 to-black/90" />
        </div>

        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04] z-10"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
            backgroundSize: "28px 28px",
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[400px] rounded-full pointer-events-none z-10"
          style={{ background: `rgba(78,153,68,0.16)`, filter: "blur(130px)" }}
        />

        <div className="max-w-4xl mx-auto px-4 text-center relative z-20">
          {/* Logo card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            className="mb-10"
          >
            <div
              className="inline-flex items-center justify-center rounded-2xl px-8 py-5"
              style={{ background: "rgba(255,255,255,0.93)", boxShadow: `0 12px 50px rgba(0,0,0,0.35)` }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/IShara-Foundation-logo-2.jpeg"
                alt="IShara Foundation"
                style={{ width: "240px", height: "auto", display: "block", objectFit: "contain" }}
              />
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <SectionLabel dark>CSR Initiative</SectionLabel>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="text-4xl lg:text-5xl font-black text-white mb-5 mt-4 leading-[1.1]"
          >
            Want to Learn More or{" "}
            <br className="hidden sm:block" />
            Partner with IShara?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            className="text-lg mb-12 max-w-xl mx-auto leading-relaxed"
            style={{ color: "rgba(255,255,255,0.55)" }}
          >
            Reach out to the NexeraTech team and we&apos;ll connect you with IShara Foundation directly.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-9 py-4 rounded-full text-white font-black text-sm transition-all duration-300 hover:brightness-110"
              style={{
                background: `linear-gradient(135deg, ${G.mid} 0%, ${G.fresh} 60%, ${G.mid} 100%)`,
                boxShadow: `0 10px 32px rgba(61,122,53,0.55)`,
              }}
            >
              Get in Touch <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="https://isharafoundation.org"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-9 py-4 rounded-full font-bold text-sm transition-all duration-300"
              style={{ border: "1.5px solid rgba(125,196,110,0.35)", color: G.light }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(125,196,110,0.10)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
            >
              Visit IShara Foundation <ExternalLink className="w-4 h-4" />
            </a>
          </motion.div>

          {/* Quick contact strip */}
          <motion.div
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 }}
            className="mt-16 pt-12 border-t flex flex-wrap gap-8 justify-center"
            style={{ borderColor: "rgba(125,196,110,0.15)" }}
          >
            {[
              { icon: Mail,  text: "contact@nexeratech.in" },
              { icon: Phone, text: "+91 98765 43210" },
              { icon: MapPin,text: "India" },
            ].map((c, i) => (
              <div key={i} className="flex items-center gap-2.5">
                <c.icon className="w-4 h-4 flex-shrink-0" style={{ color: G.light }} />
                <span className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.45)" }}>{c.text}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════ FOOTER STRIP ═════════════════════════════════ */}
      <footer
        className="py-8 text-center"
        style={{ background: G.dark, borderTop: `1px solid rgba(125,196,110,0.12)` }}
      >
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className="flex items-center justify-center rounded-lg px-2 py-1"
              style={{ background: "rgba(255,255,255,0.92)" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/IShara-Foundation-logo-2.jpeg"
                alt="IShara Foundation"
                style={{ width: "110px", height: "auto", display: "block", objectFit: "contain" }}
              />
            </div>
            <span className="text-xs font-semibold" style={{ color: "rgba(255,255,255,0.30)" }}>× NexeraTech Solutions</span>
          </div>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>
            © {new Date().getFullYear()} IShara Foundation. A NexeraTech CSR Initiative. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5">
            <Heart className="w-3.5 h-3.5" style={{ color: G.light }} />
            <span className="text-xs font-semibold" style={{ color: "rgba(255,255,255,0.30)" }}>Made with purpose</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
