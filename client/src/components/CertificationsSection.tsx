/* =============================================================================
   ENJAZCO Certifications Section — ISO Standards & CCC
   Bilingual: English (LTR) / Arabic (RTL)
   Design: Precision Engineering — Blueprint Meets Prestige
   ============================================================================= */

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { ShieldCheck, Award, Leaf, Lock, Globe } from "lucide-react";

const certs = [
  {
    icon: Award,
    code: "ISO 9001:2015",
    titleKey: "cert.iso9001.title",
    descKey: "cert.iso9001.desc",
    color: "#D4AF37",
    bg: "rgba(212,175,55,0.08)",
    border: "rgba(212,175,55,0.25)",
  },
  {
    icon: Leaf,
    code: "ISO 14001:2015",
    titleKey: "cert.iso14001.title",
    descKey: "cert.iso14001.desc",
    color: "#4CAF7D",
    bg: "rgba(76,175,125,0.08)",
    border: "rgba(76,175,125,0.25)",
  },
  {
    icon: ShieldCheck,
    code: "ISO 45001:2018",
    titleKey: "cert.iso45001.title",
    descKey: "cert.iso45001.desc",
    color: "#5B9BD5",
    bg: "rgba(91,155,213,0.08)",
    border: "rgba(91,155,213,0.25)",
  },
  {
    icon: Lock,
    code: "ISO 27001",
    titleKey: "cert.iso27001.title",
    descKey: "cert.iso27001.desc",
    color: "#C084FC",
    bg: "rgba(192,132,252,0.08)",
    border: "rgba(192,132,252,0.25)",
  },
  {
    icon: Globe,
    code: "CCC",
    titleKey: "cert.ccc.title",
    descKey: "cert.ccc.desc",
    color: "#F97316",
    bg: "rgba(249,115,22,0.08)",
    border: "rgba(249,115,22,0.25)",
  },
];

export default function CertificationsSection() {
  const { t, isRTL } = useLanguage();
  const headFont = isRTL ? "'Noto Kufi Arabic', sans-serif" : "'Barlow Condensed', sans-serif";
  const bodyFont = isRTL ? "'Noto Kufi Arabic', sans-serif" : "'Inter', sans-serif";

  return (
    <section
      id="certifications"
      dir={isRTL ? "rtl" : "ltr"}
      className="relative py-24 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #0A0E1A 0%, #0D1220 100%)" }}
    >
      {/* Background grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(#D4AF37 1px, transparent 1px), linear-gradient(90deg, #D4AF37 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className={`mb-16 ${isRTL ? "text-right" : ""}`}
        >
          <div className={`flex items-center gap-3 mb-4 ${isRTL ? "flex-row-reverse" : ""}`}>
            <div className="h-px w-12 bg-[#D4AF37]" />
            <span
              className="text-[#D4AF37] text-xs font-bold uppercase tracking-[0.25em]"
              style={{ fontFamily: headFont }}
            >
              {isRTL ? "الاعتمادات والمعايير" : "Accreditations & Standards"}
            </span>
          </div>
          <h2
            className="text-4xl md:text-5xl font-black text-white leading-tight mb-4"
            style={{ fontFamily: headFont }}
          >
            {isRTL ? "معتمدون بأعلى المعايير" : "CERTIFIED TO THE"}
            <br />
            <span className="text-[#D4AF37]">
              {isRTL ? "الدولية والمحلية" : "HIGHEST STANDARDS"}
            </span>
          </h2>
          <p
            className="text-white/50 text-base max-w-xl leading-relaxed"
            style={{ fontFamily: bodyFont }}
          >
            {isRTL
              ? "تلتزم إنجازكو بأعلى معايير الجودة والسلامة والبيئة وأمن المعلومات، معتمدةً بشهادات دولية معترف بها عالمياً."
              : "ENJAZCO upholds internationally recognized standards across quality, environment, safety, and information security — ensuring every project is delivered with precision and accountability."}
          </p>
        </motion.div>

        {/* Certifications Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {certs.map((cert, i) => {
            const Icon = cert.icon;
            return (
              <motion.div
                key={cert.code}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="relative rounded-sm p-6 flex flex-col gap-4 cursor-default"
                style={{
                  background: cert.bg,
                  border: `1px solid ${cert.border}`,
                  backdropFilter: "blur(8px)",
                }}
              >
                {/* Icon */}
                <div
                  className="w-12 h-12 flex items-center justify-center rounded-sm"
                  style={{ background: `${cert.color}18`, border: `1px solid ${cert.color}40` }}
                >
                  <Icon size={22} style={{ color: cert.color }} />
                </div>

                {/* Code Badge */}
                <div>
                  <span
                    className="text-xs font-black tracking-widest px-2 py-0.5 rounded-sm"
                    style={{
                      color: cert.color,
                      background: `${cert.color}15`,
                      fontFamily: headFont,
                      border: `1px solid ${cert.color}30`,
                    }}
                  >
                    {cert.code}
                  </span>
                </div>

                {/* Title */}
                <h3
                  className="text-white font-bold text-sm leading-snug"
                  style={{ fontFamily: headFont }}
                >
                  {t(cert.titleKey)}
                </h3>

                {/* Description */}
                <p
                  className="text-white/40 text-xs leading-relaxed"
                  style={{ fontFamily: bodyFont }}
                >
                  {t(cert.descKey)}
                </p>

                {/* Bottom accent line */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-sm"
                  style={{ background: `linear-gradient(90deg, ${cert.color}80, transparent)` }}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Bottom banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className={`mt-12 flex flex-col sm:flex-row items-center gap-4 justify-center text-center ${isRTL ? "sm:flex-row-reverse" : ""}`}
        >
          <div className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-[#D4AF37]" />
            <span className="text-white/40 text-xs" style={{ fontFamily: bodyFont }}>
              {isRTL
                ? "جميع الشهادات سارية المفعول ومعتمدة من جهات دولية معترف بها"
                : "All certifications are current and issued by internationally accredited bodies"}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
