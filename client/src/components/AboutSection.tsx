/* =============================================================================
   ENJAZCO About Section — Bilingual EN/AR with RTL support
   Design: Precision Engineering — Blueprint Meets Prestige
   ============================================================================= */

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Shield, Award, Lightbulb, CheckCircle, Quote } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const ABOUT_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663212668472/PcGNmqJQxswD3RLCUZRDtf/NEOMAWARDED_ed1b8d33.webp";
const CHAIRMAN_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663212668472/PcGNmqJQxswD3RLCUZRDtf/chairman_3ccce58e.png";

const valueKeys = [
  { icon: Shield, titleKey: "about.val1.title", descKey: "about.val1.desc" },
  { icon: Award, titleKey: "about.val2.title", descKey: "about.val2.desc" },
  { icon: Lightbulb, titleKey: "about.val3.title", descKey: "about.val3.desc" },
  { icon: CheckCircle, titleKey: "about.val4.title", descKey: "about.val4.desc" },
];

export default function AboutSection() {
  const { t, isRTL } = useLanguage();
  const ref = useRef(null);
  const chairmanRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const chairmanInView = useInView(chairmanRef, { once: true, margin: "-80px" });

  const bodyFont = isRTL ? "'Noto Kufi Arabic', sans-serif" : "'Inter', sans-serif";
  const headFont = isRTL ? "'Noto Kufi Arabic', sans-serif" : "'Barlow Condensed', sans-serif";

  return (
    <section id="about" className="bg-[#0A0E1A] relative overflow-hidden" dir={isRTL ? "rtl" : "ltr"}>
      {/* Background geometric accent */}
      <div
        className="absolute top-0 right-0 w-96 h-96 opacity-5 pointer-events-none"
        style={{ background: "radial-gradient(circle, #D4AF37 0%, transparent 70%)" }}
      />

      {/* ── Our Story ── */}
      <div className="py-24 lg:py-32">
        <div className="container mx-auto px-4 lg:px-8" ref={ref}>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image side */}
            <motion.div
              initial={{ opacity: 0, x: isRTL ? 60 : -60 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7 }}
              className={`relative ${isRTL ? "lg:order-2" : "lg:order-1"}`}
            >
              <div className="relative">
                <img
                  src={ABOUT_IMAGE}
                  alt="ENJAZCO construction site"
                  className="w-full h-[280px] sm:h-[400px] lg:h-[500px] object-cover"
                />
                {/* Gold border accent */}
                <div
                  className={`absolute -bottom-4 ${isRTL ? "-left-4" : "-right-4"} w-full h-full border-2 border-[#D4AF37]/30 pointer-events-none`}
                />
                {/* Est. badge */}
                <div
                  className={`absolute -top-6 ${isRTL ? "-right-6" : "-left-6"} w-24 h-24 bg-[#D4AF37] flex flex-col items-center justify-center`}
                >
                  <span className="text-[#0A0E1A] font-black text-xs uppercase tracking-wider" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                    {t("about.badge")}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Text side */}
            <motion.div
              initial={{ opacity: 0, x: isRTL ? -60 : 60 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 }}
              className={isRTL ? "lg:order-1 text-right" : "lg:order-2"}
            >
              <div className={`flex items-center gap-3 mb-6 ${isRTL ? "flex-row-reverse justify-end" : ""}`}>
                <div className="h-px w-12 bg-[#D4AF37]" />
                <span className="section-label" style={{ fontFamily: isRTL ? "'Noto Kufi Arabic', sans-serif" : undefined }}>
                  {t("about.label")}
                </span>
              </div>

              <h2
                className="text-white mb-8"
                style={{ fontFamily: headFont, fontWeight: 800, fontSize: "clamp(2.5rem, 4vw, 3.5rem)", lineHeight: "0.95" }}
              >
                {t("about.title1")}
                <br />
                <span className="text-[#D4AF37]">{t("about.title2")}</span>
                <br />
                {t("about.title3")}
              </h2>

              <div className="space-y-4 mb-10">
                {["about.p1", "about.p2", "about.p3"].map((key) => (
                  <p key={key} className="text-white/65 leading-relaxed" style={{ fontFamily: bodyFont, fontSize: "0.95rem" }}>
                    {t(key)}
                  </p>
                ))}
              </div>

              {/* Values grid */}
              <div className="grid grid-cols-2 gap-4">
                {valueKeys.map(({ icon: Icon, titleKey, descKey }) => (
                  <div
                    key={titleKey}
                    className={`p-4 border border-white/10 hover:border-[#D4AF37]/40 transition-colors duration-300 ${isRTL ? "text-right" : ""}`}
                    style={{ background: "rgba(212,175,55,0.04)" }}
                  >
                    <Icon size={20} className="text-[#D4AF37] mb-2" style={{ marginLeft: isRTL ? "auto" : undefined }} />
                    <h4 className="text-white font-bold text-sm mb-1" style={{ fontFamily: headFont }}>
                      {t(titleKey)}
                    </h4>
                    <p className="text-white/50 text-xs leading-relaxed" style={{ fontFamily: bodyFont }}>
                      {t(descKey)}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Chairman's Message ── */}
      <div
        className="py-20 lg:py-28 relative"
        style={{ background: "linear-gradient(135deg, #0D1220 0%, #0A0E1A 50%, #0f1628 100%)" }}
        ref={chairmanRef}
      >
        {/* Decorative gold line top */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />

        <div className="container mx-auto px-4 lg:px-8">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={chairmanInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className={`mb-14 ${isRTL ? "text-right" : ""}`}
          >
            <div className={`flex items-center gap-3 mb-4 ${isRTL ? "flex-row-reverse justify-end" : ""}`}>
              <div className="h-px w-12 bg-[#D4AF37]" />
              <span className="section-label" style={{ fontFamily: isRTL ? "'Noto Kufi Arabic', sans-serif" : undefined }}>
                {t("about.chairman.label")}
              </span>
            </div>
            <h2
              className="text-white"
              style={{ fontFamily: headFont, fontWeight: 800, fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: "0.95" }}
            >
              {t("about.chairman.title1")}
              <br />
              <span className="text-[#D4AF37]">{t("about.chairman.title2")}</span>
            </h2>
          </motion.div>

          {/* Chairman card */}
          <div className={`grid lg:grid-cols-5 gap-12 items-center ${isRTL ? "lg:flex-row-reverse" : ""}`}>
            {/* Photo */}
            <motion.div
              initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
              animate={chairmanInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className={`lg:col-span-2 flex ${isRTL ? "justify-end lg:order-2" : "justify-start lg:order-1"}`}
            >
              <div className="relative flex flex-col items-center">
                {/* Circular gold-ring portrait */}
                <div
                  className="rounded-full p-1.5"
                  style={{
                    background: "linear-gradient(135deg, #D4AF37 0%, #f0d060 50%, #D4AF37 100%)",
                    boxShadow: "0 0 40px rgba(212,175,55,0.25), 0 20px 60px rgba(0,0,0,0.5)"
                  }}
                >
                  <div className="rounded-full overflow-hidden w-48 h-48 sm:w-64 sm:h-64 lg:w-72 lg:h-72 bg-[#0A0E1A]">
                    <img
                      src={CHAIRMAN_IMG}
                      alt="Al Sheikh Finjal Bin Sultan Al Otaibi"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Message */}
            <motion.div
              initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
              animate={chairmanInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className={`lg:col-span-3 ${isRTL ? "text-right lg:order-1" : "lg:order-2"}`}
            >
              {/* Opening quote icon */}
              <div className={`mb-6 ${isRTL ? "flex justify-end" : ""}`}>
                <Quote
                  size={40}
                  className="text-[#D4AF37]/30"
                  style={{ transform: isRTL ? "scaleX(-1)" : undefined }}
                />
              </div>

              {/* Bismillah / opening line */}
              <p
                className="text-[#D4AF37] font-semibold mb-6 text-sm tracking-wide uppercase"
                style={{ fontFamily: isRTL ? "'Noto Kufi Arabic', sans-serif" : "'Barlow Condensed', sans-serif", letterSpacing: "0.08em" }}
              >
                {t("about.chairman.bismillah")}
              </p>

              {/* Message body */}
              <div className="space-y-5 mb-10">
                {["about.chairman.msg1", "about.chairman.msg2"].map((key) => (
                  <p
                    key={key}
                    className="text-white/75 leading-loose"
                    style={{ fontFamily: bodyFont, fontSize: "1rem" }}
                  >
                    {t(key)}
                  </p>
                ))}
              </div>

              {/* Signature block */}
              <div
                className={`pt-6 border-t border-[#D4AF37]/20 ${isRTL ? "text-right" : ""}`}
              >
                <p
                  className="text-white/50 text-xs uppercase tracking-widest mb-2"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                >
                  {t("about.chairman.role")}
                </p>
                <p
                  className="text-white font-bold text-xl"
                  style={{ fontFamily: headFont, fontSize: "1.4rem" }}
                >
                  {t("about.chairman.name")}
                </p>
                <p
                  className="text-[#D4AF37] text-sm mt-1"
                  style={{ fontFamily: bodyFont }}
                >
                  {t("about.chairman.company")}
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Decorative gold line bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />
      </div>
    </section>
  );
}
