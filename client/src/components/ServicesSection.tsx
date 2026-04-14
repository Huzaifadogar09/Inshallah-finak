/* =============================================================================
   ENJAZCO Services Section — 9 core specializations, bilingual EN/AR
   Design: Precision Engineering — Blueprint Meets Prestige
   ============================================================================= */

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const PIPELINE_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663212668472/PcGNmqJQxswD3RLCUZRDtf/enjazco_pipeline-T67nfB8PxhstKiAXDSdwL4.webp";
const MEP_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663212668472/PcGNmqJQxswD3RLCUZRDtf/enjazco_mep-VuGaV4LMWQaUNKW5XgiXQ7.webp";
const STRUCTURAL_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663212668472/PcGNmqJQxswD3RLCUZRDtf/enjazco_structural-ZnQeLRtEP5rYBme8ug8KtK.webp";

const serviceData = [
  { number: "01", titleKey: "services.s1.title", descKey: "services.s1.desc", video: "https://d2xsxph8kpxj0f.cloudfront.net/310519663212668472/PcGNmqJQxswD3RLCUZRDtf/roads_bridges_infra_7f90667b.mp4", image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663212668472/PcGNmqJQxswD3RLCUZRDtf/roads_bridges_6ddf4ed4.png", color: "#D4AF37" },
  { number: "02", titleKey: "services.s2.title", descKey: "services.s2.desc", image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80", color: "#4A7FA5" },
  { number: "03", titleKey: "services.s3.title", descKey: "services.s3.desc", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80", color: "#D4AF37" },
  { number: "04", titleKey: "services.s4.title", descKey: "services.s4.desc", image: PIPELINE_IMG, color: "#4A7FA5" },
  { number: "05", titleKey: "services.s5.title", descKey: "services.s5.desc", image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663212668472/PcGNmqJQxswD3RLCUZRDtf/project-management_93add06e.jpg", color: "#D4AF37" },
  { number: "06", titleKey: "services.s6.title", descKey: "services.s6.desc", image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80", color: "#4A7FA5" },
  { number: "07", titleKey: "services.s7.title", descKey: "services.s7.desc", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80", color: "#D4AF37" },
  { number: "08", titleKey: "services.s8.title", descKey: "services.s8.desc", image: MEP_IMG, color: "#4A7FA5" },
  { number: "09", titleKey: "services.s9.title", descKey: "services.s9.desc", image: STRUCTURAL_IMG, color: "#D4AF37" },
];

export default function ServicesSection() {
  const { t, isRTL } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeService, setActiveService] = useState(0);

  const headFont = isRTL ? "'Noto Kufi Arabic', sans-serif" : "'Barlow Condensed', sans-serif";
  const bodyFont = isRTL ? "'Noto Kufi Arabic', sans-serif" : "'Inter', sans-serif";

  return (
    <section id="services" className="py-24 lg:py-32 relative" style={{ background: "linear-gradient(180deg, #0A0E1A 0%, #0D1220 100%)" }} dir={isRTL ? "rtl" : "ltr"}>
      <div className="container mx-auto px-4 lg:px-8" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className={`mb-16 ${isRTL ? "text-right" : ""}`}
        >
          <div className={`flex items-center gap-3 mb-4 ${isRTL ? "flex-row-reverse justify-end" : ""}`}>
            <div className="h-px w-12 bg-[#D4AF37]" />
            <span className="section-label" style={{ fontFamily: isRTL ? "'Noto Kufi Arabic', sans-serif" : undefined }}>
              {t("services.label")}
            </span>
          </div>
          <h2 className="text-white" style={{ fontFamily: headFont, fontWeight: 800, fontSize: "clamp(2.5rem, 5vw, 4rem)", lineHeight: "0.95" }}>
            {t("services.title1")}
            <br />
            <span className="text-[#D4AF37]">{t("services.title2")}</span>
          </h2>
        </motion.div>

        {/* Two-column layout: list + detail */}
        <div className="grid lg:grid-cols-5 gap-6 lg:gap-8">
          {/* Service list */}
          <div className="lg:col-span-2 space-y-1">
            {serviceData.map((svc, i) => (
              <motion.button
                key={svc.number}
                initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                onClick={() => setActiveService(i)}
                className={`w-full flex items-center gap-4 px-5 py-4 transition-all duration-200 group ${isRTL ? "flex-row-reverse text-right" : "text-left"} ${activeService === i ? "bg-[#D4AF37]/10 border-l-2 border-[#D4AF37]" : "border-l-2 border-transparent hover:bg-white/5"}`}
                style={{ borderLeftWidth: isRTL ? 0 : undefined, borderRightWidth: isRTL ? 2 : undefined, borderRightColor: isRTL && activeService === i ? "#D4AF37" : isRTL ? "transparent" : undefined }}
              >
                <span
                  className="text-xs font-black shrink-0"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif", color: activeService === i ? "#D4AF37" : "rgba(255,255,255,0.25)", letterSpacing: "0.1em" }}
                >
                  {svc.number}
                </span>
                <span
                  className="text-sm font-semibold leading-tight"
                  style={{ fontFamily: headFont, color: activeService === i ? "#fff" : "rgba(255,255,255,0.6)", fontWeight: activeService === i ? 700 : 500 }}
                >
                  {t(svc.titleKey)}
                </span>
                <ArrowRight
                  size={14}
                  className={`shrink-0 transition-all duration-200 ${isRTL ? "mr-auto rotate-180" : "ml-auto"} ${activeService === i ? "text-[#D4AF37]" : "text-transparent group-hover:text-white/30"}`}
                />
              </motion.button>
            ))}
          </div>

          {/* Service detail */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeService}-${isRTL}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35 }}
                className="h-full"
              >
                <div className="relative overflow-hidden mb-6" style={{ height: "clamp(180px, 40vw, 280px)" }}>
                  {serviceData[activeService].video ? (
                    <video
                      key={serviceData[activeService].video}
                      src={serviceData[activeService].video}
                      className="w-full h-full object-cover"
                      autoPlay
                      muted
                      loop
                      playsInline
                    />
                  ) : (
                    <img
                      src={serviceData[activeService].image}
                      alt={t(serviceData[activeService].titleKey)}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E1A]/80 via-transparent to-transparent" />
                  <div
                    className={`absolute bottom-4 ${isRTL ? "right-4" : "left-4"} flex items-center gap-2`}
                  >
                    <span
                      className="text-5xl font-black opacity-30"
                      style={{ fontFamily: "'Barlow Condensed', sans-serif", color: serviceData[activeService].color }}
                    >
                      {serviceData[activeService].number}
                    </span>
                  </div>
                </div>

                <h3
                  className={`text-white font-bold mb-4 ${isRTL ? "text-right" : ""}`}
                  style={{ fontFamily: headFont, fontSize: "1.6rem", lineHeight: 1.1 }}
                >
                  {t(serviceData[activeService].titleKey)}
                </h3>

                <p
                  className={`text-white/65 leading-relaxed mb-6 ${isRTL ? "text-right" : ""}`}
                  style={{ fontFamily: bodyFont, fontSize: "0.95rem" }}
                >
                  {t(serviceData[activeService].descKey)}
                </p>

                <button
                  onClick={() => { const el = document.querySelector("#contact"); if (el) el.scrollIntoView({ behavior: "smooth" }); }}
                  className="btn-gold flex items-center gap-2 text-sm"
                  style={{ fontFamily: isRTL ? "'Noto Kufi Arabic', sans-serif" : undefined }}
                >
                  {t("nav.cta")}
                  <ArrowRight size={14} className={isRTL ? "rotate-180" : ""} />
                </button>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
