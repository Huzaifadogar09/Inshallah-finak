/* =============================================================================
   ENJAZCO Commitments Section — Bilingual EN/AR with RTL support
   Design: Precision Engineering — Blueprint Meets Prestige
   ============================================================================= */

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ShieldCheck, Leaf, Users, Award } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const commitKeys = [
  { icon: ShieldCheck, titleKey: "commit.c1.title", descKey: "commit.c1.desc" },
  { icon: Leaf, titleKey: "commit.c2.title", descKey: "commit.c2.desc" },
  { icon: Users, titleKey: "commit.c3.title", descKey: "commit.c3.desc" },
  { icon: Award, titleKey: "commit.c4.title", descKey: "commit.c4.desc" },
];

export default function CommitmentsSection() {
  const { t, isRTL } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const headFont = isRTL ? "'Noto Kufi Arabic', sans-serif" : "'Barlow Condensed', sans-serif";
  const bodyFont = isRTL ? "'Noto Kufi Arabic', sans-serif" : "'Inter', sans-serif";

  return (
    <section className="py-24 lg:py-32 bg-[#0A0E1A] relative overflow-hidden" dir={isRTL ? "rtl" : "ltr"}>
      <div
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{ background: "repeating-linear-gradient(135deg, #D4AF37 0px, #D4AF37 1px, transparent 1px, transparent 60px)" }}
      />

      <div className="container mx-auto px-4 lg:px-8" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className={`mb-16 ${isRTL ? "text-right" : "text-center"}`}
        >
          <div className={`flex items-center gap-3 mb-4 ${isRTL ? "flex-row-reverse justify-end" : "justify-center"}`}>
            <div className="h-px w-12 bg-[#D4AF37]" />
            <span className="section-label" style={{ fontFamily: isRTL ? "'Noto Kufi Arabic', sans-serif" : undefined }}>{t("commit.label")}</span>
            <div className="h-px w-12 bg-[#D4AF37]" />
          </div>
          <h2 className="text-white" style={{ fontFamily: headFont, fontWeight: 800, fontSize: "clamp(2.5rem, 5vw, 4rem)", lineHeight: "0.95" }}>
            {t("commit.title1")}
            <br />
            <span className="text-[#D4AF37]">{t("commit.title2")}</span>
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {commitKeys.map(({ icon: Icon, titleKey, descKey }, i) => (
            <motion.div
              key={titleKey}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className={`relative p-8 group ${isRTL ? "text-right" : "text-center"}`}
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <div
                className={`w-14 h-14 mb-5 flex items-center justify-center border border-[#D4AF37]/20 group-hover:border-[#D4AF37]/60 transition-colors duration-300 ${isRTL ? "mr-auto" : "mx-auto"}`}
                style={{ background: "rgba(212,175,55,0.06)" }}
              >
                <Icon size={22} className="text-[#D4AF37]" />
              </div>
              <h3 className="text-white font-bold mb-3" style={{ fontFamily: headFont, fontSize: "1.1rem" }}>
                {t(titleKey)}
              </h3>
              <p className="text-white/50 text-sm leading-relaxed" style={{ fontFamily: bodyFont }}>
                {t(descKey)}
              </p>
              <div className={`absolute bottom-0 ${isRTL ? "right-0" : "left-0"} h-px bg-[#D4AF37] transition-all duration-300 w-0 group-hover:w-full`} />
            </motion.div>
          ))}
        </div>

        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 p-10 lg:p-14 relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, rgba(212,175,55,0.12) 0%, rgba(212,175,55,0.04) 100%)", border: "1px solid rgba(212,175,55,0.20)" }}
        >
          <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-[#D4AF37]/40" />
          <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-[#D4AF37]/40" />

          <div className={`flex flex-col lg:flex-row items-center justify-between gap-8 ${isRTL ? "lg:flex-row-reverse text-right" : ""}`}>
            <div>
              <h3 className="text-white font-black mb-2" style={{ fontFamily: headFont, fontSize: "2rem", lineHeight: 1 }}>
                {t("commit.banner.title")}
              </h3>
              <p className="text-white/50 text-sm" style={{ fontFamily: bodyFont }}>
                {t("commit.banner.sub")}
              </p>
            </div>
            <button
              onClick={() => { const el = document.querySelector("#contact"); if (el) el.scrollIntoView({ behavior: "smooth" }); }}
              className="btn-gold flex-shrink-0 px-10 py-4 text-base"
              style={{ fontFamily: isRTL ? "'Noto Kufi Arabic', sans-serif" : undefined }}
            >
              {t("commit.banner.cta")}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
