/* =============================================================================
   ENJAZCO Why Us Section — Bilingual EN/AR with RTL support
   Design: Precision Engineering — Blueprint Meets Prestige
   ============================================================================= */

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { CheckCircle2, TrendingUp, Globe, Zap, Shield, Clock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const STRUCTURAL_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663212668472/PcGNmqJQxswD3RLCUZRDtf/NEOMAWARDED_ed1b8d33.webp";

const stats = [
  { value: 47, suffix: "+", labelKey: "stats.years" },
  { value: 250, suffix: "+", labelKey: "stats.projects" },
  { value: 1001, suffix: "+", labelKey: "stats.professionals" },
  { value: 9, suffix: "", labelKey: "stats.specializations" },
];

const diffKeys = [
  { icon: CheckCircle2, titleKey: "why.w1.title", descKey: "why.w1.desc" },
  { icon: TrendingUp, titleKey: "why.w2.title", descKey: "why.w2.desc" },
  { icon: Globe, titleKey: "why.w3.title", descKey: "why.w3.desc" },
  { icon: Zap, titleKey: "why.w4.title", descKey: "why.w4.desc" },
  { icon: Shield, titleKey: "why.w5.title", descKey: "why.w5.desc" },
  { icon: Clock, titleKey: "why.w6.title", descKey: "why.w6.desc" },
];

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    const duration = 1800;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

export default function WhySection() {
  const { t, isRTL } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const headFont = isRTL ? "'Noto Kufi Arabic', sans-serif" : "'Barlow Condensed', sans-serif";
  const bodyFont = isRTL ? "'Noto Kufi Arabic', sans-serif" : "'Inter', sans-serif";

  return (
    <section id="why" className="py-24 lg:py-32 relative overflow-hidden" style={{ background: "linear-gradient(180deg, #0D1220 0%, #0A0E1A 100%)" }} dir={isRTL ? "rtl" : "ltr"}>
      {/* Background image */}
      <div className="absolute inset-0 opacity-5">
        <img src={STRUCTURAL_IMG} alt="ENJAZCO structural construction works" className="w-full h-full object-cover" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className={`text-center mb-16 ${isRTL ? "text-right" : ""}`}
        >
          <div className={`flex items-center gap-3 mb-4 ${isRTL ? "flex-row-reverse justify-end" : "justify-center"}`}>
            <div className="h-px w-12 bg-[#D4AF37]" />
            <span className="section-label" style={{ fontFamily: isRTL ? "'Noto Kufi Arabic', sans-serif" : undefined }}>{t("why.label")}</span>
            <div className="h-px w-12 bg-[#D4AF37]" />
          </div>
          <h2 className="text-white mb-4" style={{ fontFamily: headFont, fontWeight: 800, fontSize: "clamp(2.5rem, 5vw, 4rem)", lineHeight: "0.95" }}>
            {t("why.title1")}
            <br />
            <span className="text-[#D4AF37]">{t("why.title2")}</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto" style={{ fontFamily: bodyFont }}>{t("why.sub")}</p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center py-8 px-4 border border-white/10 hover:border-[#D4AF37]/30 transition-colors duration-300"
              style={{ background: "rgba(212,175,55,0.04)" }}
            >
              <div className="text-[#D4AF37] font-black mb-2" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "3rem", lineHeight: 1 }}>
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-white/60 text-sm" style={{ fontFamily: isRTL ? "'Noto Kufi Arabic', sans-serif" : "'Barlow Condensed', sans-serif", letterSpacing: isRTL ? 0 : "0.08em", textTransform: isRTL ? "none" : "uppercase" }}>
                {t(stat.labelKey)}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Differentiators */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {diffKeys.map(({ icon: Icon, titleKey, descKey }, i) => (
            <motion.div
              key={titleKey}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
              className={`p-6 border border-white/10 hover:border-[#D4AF37]/30 transition-all duration-300 group ${isRTL ? "text-right" : ""}`}
              style={{ background: "rgba(255,255,255,0.02)" }}
            >
              <div className={`flex items-start gap-4 mb-4 ${isRTL ? "flex-row-reverse" : ""}`}>
                <div className="w-10 h-10 flex items-center justify-center border border-[#D4AF37]/30 group-hover:border-[#D4AF37] transition-colors shrink-0">
                  <Icon size={18} className="text-[#D4AF37]" />
                </div>
                <h3 className="text-white font-bold text-base leading-tight pt-1.5" style={{ fontFamily: headFont }}>
                  {t(titleKey)}
                </h3>
              </div>
              <p className="text-white/55 text-sm leading-relaxed" style={{ fontFamily: bodyFont }}>
                {t(descKey)}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center"
        >
          <button
            onClick={() => { const el = document.querySelector("#contact"); if (el) el.scrollIntoView({ behavior: "smooth" }); }}
            className="btn-gold px-10 py-4 text-base"
            style={{ fontFamily: isRTL ? "'Noto Kufi Arabic', sans-serif" : undefined }}
          >
            {t("why.cta")}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
