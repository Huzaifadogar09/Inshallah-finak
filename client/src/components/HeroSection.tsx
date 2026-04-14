/* =============================================================================
   ENJAZCO Hero Section — Full-screen media slider (images + videos)
   Bilingual: English (LTR) / Arabic (RTL)
   Design: Precision Engineering — Blueprint Meets Prestige
   ============================================================================= */

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronDown, ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const slideKeys = [
  { type: "image" as const, src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663212668472/PcGNmqJQxswD3RLCUZRDtf/enjazco_hero-3BEBtXWfLEKFZa37YFZbjy.webp", l1: "hero.slide1.l1", l2: "hero.slide1.l2", l3: "hero.slide1.l3", sub: "hero.slide1.sub", tag: "hero.slide1.tag", accentIndex: 1 },
  { type: "video" as const, src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663212668472/PcGNmqJQxswD3RLCUZRDtf/enjazco_hero_video_ea4879e3.mp4", poster: "https://d2xsxph8kpxj0f.cloudfront.net/310519663212668472/PcGNmqJQxswD3RLCUZRDtf/enjazco_hero-3BEBtXWfLEKFZa37YFZbjy.webp", l1: "hero.slide2.l1", l2: "hero.slide2.l2", l3: "hero.slide2.l3", sub: "hero.slide2.sub", tag: "hero.slide2.tag", accentIndex: 1 },
  { type: "image" as const, src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663212668472/PcGNmqJQxswD3RLCUZRDtf/alsail_5_da7f5d3e.jpeg", l1: "hero.slide3.l1", l2: "hero.slide3.l2", l3: "hero.slide3.l3", sub: "hero.slide3.sub", tag: "hero.slide3.tag", accentIndex: 2 },
  { type: "image" as const, src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663212668472/PcGNmqJQxswD3RLCUZRDtf/alsail_4_72ee3811.jpeg", l1: "hero.slide1.l1", l2: "hero.slide1.l2", l3: "hero.slide1.l3", sub: "hero.slide1.sub", tag: "hero.slide1.tag", accentIndex: 1 },
  { type: "image" as const, src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663212668472/PcGNmqJQxswD3RLCUZRDtf/alsail_3_fc8706ea.jpeg", l1: "hero.slide5.l1", l2: "hero.slide5.l2", l3: "hero.slide5.l3", sub: "hero.slide5.sub", tag: "hero.slide5.tag", accentIndex: 0 },
  { type: "image" as const, src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663212668472/PcGNmqJQxswD3RLCUZRDtf/alsail_2_25d1674b.jpeg", l1: "hero.slide3.l1", l2: "hero.slide3.l2", l3: "hero.slide3.l3", sub: "hero.slide3.sub", tag: "hero.slide3.tag", accentIndex: 2 },
  { type: "image" as const, src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663212668472/PcGNmqJQxswD3RLCUZRDtf/alsail_1_e1a8f4a7.jpeg", l1: "hero.slide1.l1", l2: "hero.slide1.l2", l3: "hero.slide1.l3", sub: "hero.slide1.sub", tag: "hero.slide1.tag", accentIndex: 1 },
  { type: "video" as const, src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663212668472/PcGNmqJQxswD3RLCUZRDtf/enjazco_hero_video_ea4879e3.mp4", poster: "https://d2xsxph8kpxj0f.cloudfront.net/310519663212668472/PcGNmqJQxswD3RLCUZRDtf/enjazco_structural-ZnQeLRtEP5rYBme8ug8KtK.webp", l1: "hero.slide4.l1", l2: "hero.slide4.l2", l3: "hero.slide4.l3", sub: "hero.slide4.sub", tag: "hero.slide4.tag", accentIndex: 0 },
  { type: "image" as const, src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663212668472/PcGNmqJQxswD3RLCUZRDtf/enjazco_structural-ZnQeLRtEP5rYBme8ug8KtK.webp", l1: "hero.slide5.l1", l2: "hero.slide5.l2", l3: "hero.slide5.l3", sub: "hero.slide5.sub", tag: "hero.slide5.tag", accentIndex: 0 },
  { type: "video" as const, src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663212668472/PcGNmqJQxswD3RLCUZRDtf/enjazco_hero_video_ea4879e3.mp4", poster: "https://d2xsxph8kpxj0f.cloudfront.net/310519663212668472/PcGNmqJQxswD3RLCUZRDtf/enjazco_hero-3BEBtXWfLEKFZa37YFZbjy.webp", l1: "hero.slide6.l1", l2: "hero.slide6.l2", l3: "hero.slide6.l3", sub: "hero.slide6.sub", tag: "hero.slide6.tag", accentIndex: 0 },
  { type: "image" as const, src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663212668472/PcGNmqJQxswD3RLCUZRDtf/hero_haram_tunnel_bd407646.jpeg", l1: "hero.slide1.l1", l2: "hero.slide1.l2", l3: "hero.slide1.l3", sub: "hero.slide1.sub", tag: "hero.slide1.tag", accentIndex: 2 },
  { type: "image" as const, src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663212668472/PcGNmqJQxswD3RLCUZRDtf/hero_construction_cranes_779e124e.png", l1: "hero.slide3.l1", l2: "hero.slide3.l2", l3: "hero.slide3.l3", sub: "hero.slide3.sub", tag: "hero.slide3.tag", accentIndex: 1 },
  { type: "image" as const, src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663212668472/PcGNmqJQxswD3RLCUZRDtf/hero_night_construction_65595f66.png", l1: "hero.slide5.l1", l2: "hero.slide5.l2", l3: "hero.slide5.l3", sub: "hero.slide5.sub", tag: "hero.slide5.tag", accentIndex: 0 },
];

const statKeys = [
  { value: "47+", labelKey: "stats.years" },
  { value: "250+", labelKey: "stats.projects" },
  { value: "1,001+", labelKey: "stats.professionals" },
  { value: "9", labelKey: "stats.specializations" },
];

const SLIDE_DURATION = 7000;

export default function HeroSection() {
  const { t, isRTL } = useLanguage();
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [direction, setDirection] = useState<1 | -1>(1);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const goTo = useCallback((index: number, dir: 1 | -1 = 1) => {
    setDirection(dir);
    setCurrent((index + slideKeys.length) % slideKeys.length);
  }, []);

  const next = useCallback(() => goTo(current + 1, 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1, -1), [current, goTo]);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(next, SLIDE_DURATION);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [paused, next]);

  useEffect(() => {
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      if (i === current) { v.currentTime = 0; v.play().catch(() => {}); }
      else v.pause();
    });
  }, [current]);

  const handleScroll = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const slideVariants = {
    enter: (dir: number) => ({ opacity: 0, scale: dir > 0 ? 1.04 : 0.96 }),
    center: { opacity: 1, scale: 1 },
    exit: (dir: number) => ({ opacity: 0, scale: dir > 0 ? 0.96 : 1.04 }),
  };

  const textVariants = {
    enter: { opacity: 0, y: 30 },
    center: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  const slide = slideKeys[current];
  const headlineFont = isRTL
    ? "'Noto Kufi Arabic', sans-serif"
    : "'Barlow Condensed', sans-serif";

  return (
    <section id="home" className="relative min-h-screen flex flex-col overflow-hidden" dir={isRTL ? "rtl" : "ltr"}>
      {/* Media Slides */}
      <div className="absolute inset-0">
        <AnimatePresence custom={direction} initial={false}>
          {slideKeys.map((s, i) =>
            i === current ? (
              <motion.div
                key={i}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 1.1, ease: [0.4, 0, 0.2, 1] }}
                className="absolute inset-0"
              >
                {s.type === "image" ? (
                  <img src={s.src} alt={`ENJAZCO — ${t(s.tag)}`} className="w-full h-full object-cover object-center" />
                ) : (
                  <video
                    ref={(el) => { videoRefs.current[i] = el; }}
                    src={s.src}
                    poster={"poster" in s ? s.poster : undefined}
                    muted loop playsInline autoPlay
                    className="w-full h-full object-cover object-center"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-[#0A0E1A]/88 via-[#0A0E1A]/55 to-[#0A0E1A]/20" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E1A] via-transparent to-[#0A0E1A]/30" />
                {/* ENJAZCO Logo Watermark */}
                <div className="absolute bottom-24 right-8 opacity-30 pointer-events-none select-none mix-blend-luminosity">
                  <img
                    src="https://d2xsxph8kpxj0f.cloudfront.net/310519663212668472/PcGNmqJQxswD3RLCUZRDtf/enjazco_new_logo_nobg_3f6c0a82.png"
                    alt="ENJAZCO"
                    className="h-28 w-auto object-contain drop-shadow-2xl"
                    style={{ filter: "brightness(2) saturate(0) contrast(1.2)" }}
                  />
                </div>
              </motion.div>
            ) : null
          )}
        </AnimatePresence>
        <div
          className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none"
          style={{ background: "linear-gradient(135deg, transparent 40%, #D4AF37 40%, #D4AF37 42%, transparent 42%)" }}
        />
      </div>

      {/* Slide Content */}
      <div className="relative flex-1 flex items-center">
        <div className="container mx-auto px-4 lg:px-8 pt-24 pb-16">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={`${current}-${isRTL}`}
              custom={direction}
              variants={textVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.6, ease: "easeOut" }}
              className={`max-w-3xl ${isRTL ? "mr-0 ml-auto lg:mr-0" : ""}`}
            >
              {/* Label */}
              <div className={`flex items-center gap-3 mb-6 ${isRTL ? "flex-row-reverse justify-end" : ""}`}>
                <div className="h-px w-12 bg-[#D4AF37]" />
                <span className="section-label" style={{ fontFamily: isRTL ? "'Noto Kufi Arabic', sans-serif" : undefined }}>
                  {t(slide.tag)}
                </span>
              </div>

              {/* Headline */}
              <h1
                className={`text-white mb-6 ${isRTL ? "text-right" : ""}`}
                style={{
                  fontFamily: headlineFont,
                  fontWeight: 800,
                  fontSize: "clamp(2.8rem, 7vw, 6rem)",
                  lineHeight: "0.95",
                }}
              >
                {[slide.l1, slide.l2, slide.l3].map((key, li) => (
                  <span key={li} className={`block ${li === slide.accentIndex ? "text-[#D4AF37]" : ""}`}>
                    {t(key)}
                  </span>
                ))}
              </h1>

              {/* Sub */}
              <p
                className={`text-white/70 text-lg leading-relaxed mb-10 max-w-xl ${isRTL ? "text-right" : ""}`}
                style={{ fontFamily: isRTL ? "'Noto Kufi Arabic', sans-serif" : "'Inter', sans-serif", fontWeight: 300 }}
              >
                {t(slide.sub)}
              </p>

              {/* CTAs */}
              <div className={`flex flex-wrap gap-4 ${isRTL ? "flex-row-reverse" : ""}`}>
                <button onClick={() => handleScroll("#services")} className="btn-gold flex items-center gap-2" style={{ fontFamily: isRTL ? "'Noto Kufi Arabic', sans-serif" : undefined }}>
                  {t("hero.cta.services")}
                  <ArrowRight size={16} className={isRTL ? "rotate-180" : ""} />
                </button>
                <button onClick={() => handleScroll("#projects")} className="btn-outline-gold" style={{ fontFamily: isRTL ? "'Noto Kufi Arabic', sans-serif" : undefined }}>
                  {t("hero.cta.projects")}
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Slider Controls */}
      <button onClick={isRTL ? next : prev} className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center border border-white/20 bg-black/30 text-white/60 hover:text-[#D4AF37] hover:border-[#D4AF37]/50 backdrop-blur-sm transition-all duration-200 z-10" aria-label="Previous slide">
        <ChevronLeft size={20} />
      </button>
      <button onClick={isRTL ? prev : next} className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center border border-white/20 bg-black/30 text-white/60 hover:text-[#D4AF37] hover:border-[#D4AF37]/50 backdrop-blur-sm transition-all duration-200 z-10" aria-label="Next slide">
        <ChevronRight size={20} />
      </button>

      {/* Dot indicators + play/pause */}
      <div className="absolute bottom-32 left-1/2 -translate-x-1/2 flex items-center gap-1.5 sm:gap-3 z-10 max-w-[90vw] overflow-x-auto px-2">
        {slideKeys.map((_, i) => (
          <button key={i} onClick={() => goTo(i, i > current ? 1 : -1)} aria-label={`Go to slide ${i + 1}`}>
            <div className="h-1 rounded-full transition-all duration-500" style={{ width: i === current ? "2.5rem" : "0.5rem", background: i === current ? "#D4AF37" : "rgba(255,255,255,0.3)" }} />
          </button>
        ))}
        <button onClick={() => setPaused((p) => !p)} className="ml-2 w-7 h-7 flex items-center justify-center border border-white/20 text-white/50 hover:text-[#D4AF37] transition-colors" aria-label={paused ? "Play" : "Pause"}>
          {paused ? <Play size={12} /> : <Pause size={12} />}
        </button>
      </div>

      {/* Slide counter */}
      <div className="absolute top-1/2 right-4 lg:right-8 -translate-y-1/2 mt-16 text-white/30 text-xs hidden lg:flex flex-col items-center gap-1" style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.15em" }}>
        <span className="text-[#D4AF37] text-base font-bold">{String(current + 1).padStart(2, "0")}</span>
        <div className="w-px h-8 bg-white/20" />
        <span>{String(slideKeys.length).padStart(2, "0")}</span>
      </div>

      {/* Stats Bar */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.8 }}
        className="relative bg-[#0A0E1A]/80 backdrop-blur-md border-t border-white/10"
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/10">
            {statKeys.map((stat, i) => (
              <div key={i} className="px-6 py-6 text-center">
                <div className="text-[#D4AF37] font-black mb-1" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "2.2rem", lineHeight: 1 }}>
                  {stat.value}
                </div>
                <div className="text-white/50 text-xs uppercase tracking-widest" style={{ fontFamily: isRTL ? "'Noto Kufi Arabic', sans-serif" : "'Barlow Condensed', sans-serif", textTransform: isRTL ? "none" : undefined }}>
                  {t(stat.labelKey)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => handleScroll("#about")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-36 left-8 text-white/40 hover:text-[#D4AF37] transition-colors hidden lg:flex flex-col items-center gap-2"
      >
        <span className="text-xs tracking-widest uppercase" style={{ fontFamily: isRTL ? "'Noto Kufi Arabic', sans-serif" : "'Barlow Condensed', sans-serif" }}>
          {t("hero.scroll")}
        </span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
          <ChevronDown size={20} />
        </motion.div>
      </motion.button>
    </section>
  );
}
