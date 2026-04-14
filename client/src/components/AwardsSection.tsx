/* =============================================================================
   AwardsSection — Certifications, Safety Milestones, Regional Awards & Photo Gallery
   ============================================================================= */

import { useRef, useState, useCallback, useEffect } from "react";
import { motion, useInView, easeOut, AnimatePresence } from "framer-motion";
import { Shield, Award, Trophy, X, ChevronLeft, ChevronRight, Images } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const milestones = [
  { icon: Trophy, valueKey: "awards.mile1.value", labelKey: "awards.mile1.label", subKey: "awards.mile1.sub", color: "#D4AF37" },
  { icon: Shield, valueKey: "awards.mile2.value", labelKey: "awards.mile2.label", subKey: "awards.mile2.sub", color: "#4A7FA5" },
  { icon: Award, valueKey: "awards.mile3.value", labelKey: "awards.mile3.label", subKey: "awards.mile3.sub", color: "#6DBE8C" },
];

const regionalAwards = [
  { icon: Trophy, yearKey: "awards.reg1.year", titleKey: "awards.reg1.title", bodyKey: "awards.reg1.body", orgKey: "awards.reg1.org", color: "#D4AF37" },
  { icon: Award, yearKey: "awards.reg2.year", titleKey: "awards.reg2.title", bodyKey: "awards.reg2.body", orgKey: "awards.reg2.org", color: "#4A7FA5" },
  { icon: Trophy, yearKey: "awards.reg3.year", titleKey: "awards.reg3.title", bodyKey: "awards.reg3.body", orgKey: "awards.reg3.org", color: "#6DBE8C" },
  { icon: Shield, yearKey: "awards.reg4.year", titleKey: "awards.reg4.title", bodyKey: "awards.reg4.body", orgKey: "awards.reg4.org", color: "#C07A3A" },
];

const galleryImages = [
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663212668472/PcGNmqJQxswD3RLCUZRDtf/_MG_0631_7e37c6af.webp",
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663212668472/PcGNmqJQxswD3RLCUZRDtf/_MG_0632_afe2da92.webp",
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663212668472/PcGNmqJQxswD3RLCUZRDtf/_MG_0634_d5141c88.webp",
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663212668472/PcGNmqJQxswD3RLCUZRDtf/_MG_0635_da7547f8.webp",
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663212668472/PcGNmqJQxswD3RLCUZRDtf/_MG_0636_082f87f0.webp",
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663212668472/PcGNmqJQxswD3RLCUZRDtf/_MG_0652_c29cee62.webp",
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663212668472/PcGNmqJQxswD3RLCUZRDtf/_MG_0656_83a7bae6.webp",
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663212668472/PcGNmqJQxswD3RLCUZRDtf/_MG_0659_cea02e19.webp",
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663212668472/PcGNmqJQxswD3RLCUZRDtf/_MG_0684_40b21074.webp",
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663212668472/PcGNmqJQxswD3RLCUZRDtf/_MG_0727_628d8a6f.webp",
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663212668472/PcGNmqJQxswD3RLCUZRDtf/_MG_0728_1e96276d.webp",
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663212668472/PcGNmqJQxswD3RLCUZRDtf/_MG_0730_ef4b20d3.webp",
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663212668472/PcGNmqJQxswD3RLCUZRDtf/_MG_0740_1f91e32d.webp",
];

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: easeOut },
  }),
};

/* ── Lightbox ── */
function Lightbox({ images, index, onClose, onPrev, onNext }: {
  images: string[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, onPrev, onNext]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/92 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Close */}
      <button
        className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-[#D4AF37]/30 text-white rounded-full transition-colors z-10"
        onClick={onClose}
        aria-label="Close"
      >
        <X size={20} />
      </button>

      {/* Counter */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white/60 text-sm font-mono z-10">
        {index + 1} / {images.length}
      </div>

      {/* Prev */}
      <button
        className="absolute left-4 w-11 h-11 flex items-center justify-center bg-white/10 hover:bg-[#D4AF37]/30 text-white rounded-full transition-colors z-10"
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        aria-label="Previous"
      >
        <ChevronLeft size={22} />
      </button>

      {/* Image */}
      <motion.img
        key={index}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.25 }}
        src={images[index]}
        alt={`Award ceremony photo ${index + 1}`}
        className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />

      {/* Next */}
      <button
        className="absolute right-4 w-11 h-11 flex items-center justify-center bg-white/10 hover:bg-[#D4AF37]/30 text-white rounded-full transition-colors z-10"
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        aria-label="Next"
      >
        <ChevronRight size={22} />
      </button>

      {/* Thumbnail strip */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 overflow-x-auto max-w-[90vw] px-2 pb-1">
        {images.map((src, i) => (
          <button
            key={i}
            onClick={(e) => { e.stopPropagation(); }}
            onClickCapture={(e) => { e.stopPropagation(); }}
            className={`shrink-0 w-12 h-12 rounded overflow-hidden border-2 transition-all duration-200 ${i === index ? "border-[#D4AF37]" : "border-transparent opacity-50 hover:opacity-80"}`}
          >
            <img src={src} alt="" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </motion.div>
  );
}

export default function AwardsSection() {
  const { t, isRTL } = useLanguage();
  const dir = isRTL ? "rtl" : "ltr";
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = useCallback((i: number) => setLightboxIndex(i), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const prevImage = useCallback(() => setLightboxIndex(i => i !== null ? (i - 1 + galleryImages.length) % galleryImages.length : 0), []);
  const nextImage = useCallback(() => setLightboxIndex(i => i !== null ? (i + 1) % galleryImages.length : 0), []);

  return (
    <>
      <section
        ref={ref}
        id="awards"
        dir={dir}
        className="relative py-24 bg-[#0A0E1A] overflow-hidden"
      >
        {/* Background grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(#D4AF37 1px, transparent 1px), linear-gradient(90deg, #D4AF37 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-12 bg-[#D4AF37]" />
              <span className="text-[#D4AF37] text-xs font-bold tracking-[0.25em] uppercase">
                {t("awards.eyebrow")}
              </span>
              <div className="h-px w-12 bg-[#D4AF37]" />
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight leading-tight">
              {t("awards.title")}
            </h2>
            <p className="mt-4 text-gray-400 max-w-2xl mx-auto text-base leading-relaxed">
              {t("awards.subtitle")}
            </p>
          </motion.div>

          {/* ── Safety & Achievement Milestones ── */}
          <div className="mb-20">
            <motion.h3
              initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-[#D4AF37] text-sm font-bold tracking-[0.2em] uppercase mb-8 flex items-center gap-3"
            >
              <Trophy size={16} className="text-[#D4AF37]" />
              {t("awards.mile.heading")}
            </motion.h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {milestones.map((m, i) => {
                const Icon = m.icon;
                return (
                  <motion.div
                    key={i}
                    custom={i}
                    variants={fadeUp}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    className="relative bg-gradient-to-br from-white/[0.05] to-white/[0.02] border border-white/10 rounded-2xl p-8 text-center hover:border-[#D4AF37]/50 transition-all duration-300 overflow-hidden"
                  >
                    <div className="absolute inset-0 opacity-[0.04]" style={{ background: `radial-gradient(circle at 50% 0%, ${m.color}, transparent 70%)` }} />
                    <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: m.color + "22" }}>
                      <Icon size={26} style={{ color: m.color }} />
                    </div>
                    <div className="text-4xl font-black mb-1" style={{ color: m.color }}>{t(m.valueKey)}</div>
                    <div className="text-white font-bold text-base mb-1">{t(m.labelKey)}</div>
                    <p className="text-gray-500 text-sm">{t(m.subKey)}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* ── Regional Awards & Nominations ── */}
          <div className="mb-20">
            <motion.h3
              initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-[#D4AF37] text-sm font-bold tracking-[0.2em] uppercase mb-8 flex items-center gap-3"
            >
              <Award size={16} className="text-[#D4AF37]" />
              {t("awards.reg.heading")}
            </motion.h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {regionalAwards.map((award, i) => {
                const Icon = award.icon;
                return (
                  <motion.div
                    key={i}
                    custom={i}
                    variants={fadeUp}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    className="group flex gap-5 bg-white/[0.03] border border-white/10 rounded-xl p-6 hover:border-[#D4AF37]/40 hover:bg-white/[0.06] transition-all duration-300"
                  >
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 mt-1" style={{ backgroundColor: award.color + "22" }}>
                      <Icon size={22} style={{ color: award.color }} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ color: award.color, backgroundColor: award.color + "22" }}>
                          {t(award.yearKey)}
                        </span>
                        <span className="text-gray-600 text-xs">{t(award.orgKey)}</span>
                      </div>
                      <div className="text-white font-bold text-sm mb-1">{t(award.titleKey)}</div>
                      <p className="text-gray-500 text-xs leading-relaxed">{t(award.bodyKey)}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* ── Award Photo Gallery ── */}
          <div>
            <motion.h3
              initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="text-[#D4AF37] text-sm font-bold tracking-[0.2em] uppercase mb-8 flex items-center gap-3"
            >
              <Images size={16} className="text-[#D4AF37]" />
              {t("awards.gallery.heading")}
            </motion.h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {galleryImages.map((src, i) => (
                <motion.button
                  key={i}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                  onClick={() => openLightbox(i)}
                  className="group relative aspect-square overflow-hidden rounded-lg border border-white/10 hover:border-[#D4AF37]/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50"
                >
                  <img
                    src={src}
                    alt={`ENJAZCO award ceremony photo ${i + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-[#D4AF37]/0 group-hover:bg-[#D4AF37]/15 transition-colors duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-10 h-10 rounded-full bg-black/60 flex items-center justify-center">
                      <Images size={16} className="text-[#D4AF37]" />
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Portal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            images={galleryImages}
            index={lightboxIndex}
            onClose={closeLightbox}
            onPrev={prevImage}
            onNext={nextImage}
          />
        )}
      </AnimatePresence>
    </>
  );
}
