/* =============================================================================
   ENJAZCO Clients Section — Our Valuable Clients & Owners
   Design: Precision Engineering — Blueprint Meets Prestige
   Each client displayed as a styled typographic name-logo badge
   ============================================================================= */

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

interface Client {
  id: number;
  nameEn: string;
  nameAr: string;
  shortEn: string;        // abbreviated / display name in English
  category: "giga" | "government" | "utility" | "authority";
  accentColor: string;
  logo?: string;          // optional CDN URL for actual logo image
}

const CLIENTS: Client[] = [
  {
    id: 1,
    nameEn: "NEOM",
    nameAr: "نيوم",
    shortEn: "NEOM",
    category: "giga",
    accentColor: "#00C2CB",
    logo: "https://d2xsxph8kpxj0f.cloudfront.net/310519663212668472/PcGNmqJQxswD3RLCUZRDtf/neom_logo_d6cf5737.png",
  },
  {
    id: 2,
    nameEn: "ROSHN",
    nameAr: "روشن",
    shortEn: "ROSHN",
    category: "giga",
    accentColor: "#8B5E3C",
    logo: "https://d2xsxph8kpxj0f.cloudfront.net/310519663212668472/PcGNmqJQxswD3RLCUZRDtf/roshn_logo_a31d3ee0.png",
  },
  {
    id: 3,
    nameEn: "AMAALA",
    nameAr: "أمالا",
    shortEn: "AMAALA",
    category: "giga",
    accentColor: "#C9A96E",
    logo: "https://d2xsxph8kpxj0f.cloudfront.net/310519663212668472/PcGNmqJQxswD3RLCUZRDtf/amaala_logo_f5e594a4.jpg",
  },
  {
    id: 4,
    nameEn: "Ministry of Transport & Logistics",
    nameAr: "وزارة النقل والخدمات اللوجستية",
    shortEn: "MOT",
    category: "government",
    accentColor: "#4A7FA5",
    logo: "https://d2xsxph8kpxj0f.cloudfront.net/310519663212668472/PcGNmqJQxswD3RLCUZRDtf/mot_logo_317e7c0f.jpg",
  },
  {
    id: 5,
    nameEn: "MODON",
    nameAr: "مدن",
    shortEn: "MODON",
    category: "authority",
    accentColor: "#2E7D52",
    logo: "https://d2xsxph8kpxj0f.cloudfront.net/310519663212668472/PcGNmqJQxswD3RLCUZRDtf/modon_50c4e22e.jpg",
  },
  {
    id: 6,
    nameEn: "Royal Commission for Jubail & Yanbu",
    nameAr: "الهيئة الملكية للجبيل وينبع",
    shortEn: "RCJY",
    category: "authority",
    accentColor: "#6B4FA0",
    logo: "https://d2xsxph8kpxj0f.cloudfront.net/310519663212668472/PcGNmqJQxswD3RLCUZRDtf/rcjy_logo_f0bfde92.png",
  },
  {
    id: 7,
    nameEn: "Red Sea Global",
    nameAr: "شركة البحر الأحمر للتطوير",
    shortEn: "RSG",
    category: "giga",
    accentColor: "#C0392B",
    logo: "https://d2xsxph8kpxj0f.cloudfront.net/310519663212668472/PcGNmqJQxswD3RLCUZRDtf/rsg_logo_d14eec0b.jpg",
  },
  {
    id: 8,
    nameEn: "Saudi Aramco",
    nameAr: "أرامكو السعودية",
    shortEn: "ARAMCO",
    category: "utility",
    accentColor: "#007A3D",
    logo: "https://d2xsxph8kpxj0f.cloudfront.net/310519663212668472/PcGNmqJQxswD3RLCUZRDtf/aramco_logo_7df30286.jpg",
  },
  {
    id: 9,
    nameEn: "Ministry of Housing",
    nameAr: "وزارة الإسكان",
    shortEn: "MOH",
    category: "government",
    accentColor: "#1A6B9A",
    logo: "https://d2xsxph8kpxj0f.cloudfront.net/310519663212668472/PcGNmqJQxswD3RLCUZRDtf/moh_logo_94f78da9.jpg",
  },
  {
    id: 10,
    nameEn: "Saline Water Conversion Corporation",
    nameAr: "المؤسسة العامة لتحلية المياه المالحة",
    shortEn: "SWCC",
    category: "utility",
    accentColor: "#0097A7",
    logo: "https://d2xsxph8kpxj0f.cloudfront.net/310519663212668472/PcGNmqJQxswD3RLCUZRDtf/swcc_logo_984426e4.png",
  },
  {
    id: 11,
    nameEn: "National Water Company",
    nameAr: "شركة المياه الوطنية",
    shortEn: "NWC",
    category: "utility",
    accentColor: "#0288D1",
  },
  {
    id: 12,
    nameEn: "Ministry of Municipal & Rural Affairs",
    nameAr: "وزارة الشؤون البلدية والقروية والإسكان",
    shortEn: "MOMRA",
    category: "government",
    accentColor: "#5D6D7E",
  },
  {
    id: 13,
    nameEn: "Ministry of Environment, Water & Agriculture",
    nameAr: "وزارة البيئة والمياه والزراعة",
    shortEn: "MEWA",
    category: "government",
    accentColor: "#388E3C",
  },
  {
    id: 14,
    nameEn: "Aseer Development Authority",
    nameAr: "هيئة تطوير منطقة عسير",
    shortEn: "ADA",
    category: "authority",
    accentColor: "#E67E22",
  },
  {
    id: 15,
    nameEn: "Royal Commission for Riyadh City",
    nameAr: "الهيئة الملكية لمدينة الرياض",
    shortEn: "RCRC",
    category: "authority",
    accentColor: "#8D6E63",
  },
  {
    id: 16,
    nameEn: "Makkah Region Development Authority",
    nameAr: "هيئة تطوير منطقة مكة المكرمة",
    shortEn: "MRDA",
    category: "authority",
    accentColor: "#D4AF37",
  },
];

const CATEGORY_LABELS: Record<string, { en: string; ar: string }> = {
  giga:       { en: "Giga Project",   ar: "مشروع عملاق" },
  government: { en: "Government",     ar: "جهة حكومية" },
  utility:    { en: "Utility",        ar: "مرفق" },
  authority:  { en: "Authority",      ar: "هيئة" },
};

function ClientCard({ client, index, lang, isRTL }: { client: Client; index: number; lang: string; isRTL: boolean }) {
  const catLabel = lang === "ar" ? CATEGORY_LABELS[client.category].ar : CATEGORY_LABELS[client.category].en;
  const color = client.accentColor;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: (index % 5) * 0.05 }}
      whileHover={{ y: -3, scale: 1.02 }}
      className="relative group flex flex-col overflow-hidden"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: `1px solid rgba(255,255,255,0.08)`,
        transition: "border-color 0.3s, box-shadow 0.3s, transform 0.2s",
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLDivElement).style.borderColor = `${color}60`;
        (e.currentTarget as HTMLDivElement).style.boxShadow = `0 4px 20px ${color}20`;
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.08)";
        (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
      }}
    >
      {/* Top color bar */}
      <div className="h-0.5 w-full" style={{ background: color }} />

      {/* Logo area — fills card */}
      {client.logo ? (
        <div
          className="flex items-center justify-center px-2 py-2"
          style={{ background: "rgba(255,255,255,0.96)", minHeight: "56px" }}
        >
          <img
            src={client.logo}
            alt={client.nameEn}
            className="w-full h-full object-contain"
            style={{ maxHeight: "44px" }}
          />
        </div>
      ) : (
        <div
          className="flex items-center justify-center px-2 py-3"
          style={{ minHeight: "56px" }}
        >
          <span
            className="font-black leading-none tracking-tight text-center"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: "clamp(1.1rem, 1.8vw, 1.5rem)",
              color,
              textShadow: `0 0 30px ${color}40`,
            }}
          >
            {client.shortEn}
          </span>
        </div>
      )}

      {/* Name footer */}
      <div className={`px-2 py-1.5 border-t border-white/08 ${isRTL ? "text-right" : ""}`}>
        <p
          className="text-white/80 font-semibold leading-tight truncate"
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: "0.62rem",
          }}
        >
          {client.nameEn}
        </p>
        <p
          className="text-white/35 leading-tight truncate"
          style={{
            fontFamily: "'Noto Kufi Arabic', sans-serif",
            fontSize: "0.58rem",
            direction: "rtl",
          }}
        >
          {client.nameAr}
        </p>
      </div>
    </motion.div>
  );
}

export default function ClientsSection() {
  const { isRTL, lang } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const headFont = isRTL ? "'Noto Kufi Arabic', sans-serif" : "'Barlow Condensed', sans-serif";

  const gigaCount = CLIENTS.filter(c => c.category === "giga").length;
  const govCount = CLIENTS.filter(c => c.category === "government").length;
  const utilCount = CLIENTS.filter(c => c.category === "utility").length;
  const authCount = CLIENTS.filter(c => c.category === "authority").length;

  return (
    <section
      id="clients"
      className="py-24 lg:py-32 relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #080C18 0%, #0A0E1A 100%)" }}
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Background decoration */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] opacity-[0.03] pointer-events-none"
        style={{ background: "radial-gradient(circle, #D4AF37 0%, transparent 70%)" }}
      />
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] opacity-[0.03] pointer-events-none"
        style={{ background: "radial-gradient(circle, #4A7FA5 0%, transparent 70%)" }}
      />

      <div className="container mx-auto px-4 lg:px-8" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className={`mb-14 ${isRTL ? "text-right" : ""}`}
        >
          <div className={`flex items-center gap-3 mb-4 ${isRTL ? "flex-row-reverse justify-end" : ""}`}>
            <div className="h-px w-12 bg-[#D4AF37]" />
            <span
              className="section-label"
              style={{ fontFamily: isRTL ? "'Noto Kufi Arabic', sans-serif" : undefined }}
            >
              {isRTL ? "عملاؤنا وأصحاب الأعمال" : "Trusted By The Best"}
            </span>
          </div>

          <h2
            className="text-white mb-4"
            style={{ fontFamily: headFont, fontWeight: 800, fontSize: "clamp(2.5rem, 5vw, 4rem)", lineHeight: "0.9" }}
          >
            {isRTL ? (
              <>عملاؤنا الكرام<br /><span className="text-[#D4AF37]">وأصحاب المشاريع</span></>
            ) : (
              <>OUR VALUABLE<br /><span className="text-[#D4AF37]">CLIENTS & OWNERS</span></>
            )}
          </h2>

          <p
            className="text-white/50 max-w-2xl mb-8"
            style={{ fontFamily: isRTL ? "'Noto Kufi Arabic', sans-serif" : "'Inter', sans-serif", fontSize: "0.9rem" }}
          >
            {isRTL
              ? "نفخر بثقة كبرى المؤسسات الحكومية والمشاريع العملاقة والهيئات الوطنية في المملكة العربية السعودية، وهو ما يعكس التزامنا بأعلى معايير الجودة والاحترافية."
              : "We are proud to serve Saudi Arabia's most prominent government entities, giga-projects, national authorities, and utility corporations — a testament to our unwavering commitment to quality and professionalism."}
          </p>

          {/* Stats row */}
          <div className={`grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl ${isRTL ? "mr-0 ml-auto" : ""}`}>
            {[
              { value: gigaCount,  label: isRTL ? "مشاريع عملاقة" : "Giga Projects",  color: "#D4AF37" },
              { value: govCount,   label: isRTL ? "جهات حكومية"   : "Government",      color: "#4A7FA5" },
              { value: utilCount,  label: isRTL ? "مرافق"          : "Utilities",       color: "#0097A7" },
              { value: authCount,  label: isRTL ? "هيئات"          : "Authorities",     color: "#E67E22" },
            ].map(({ value, label, color }) => (
              <div
                key={label}
                className="p-3 border border-white/10 text-center"
                style={{ background: "rgba(255,255,255,0.02)" }}
              >
                <div
                  className="text-2xl font-black"
                  style={{ color, fontFamily: "'Barlow Condensed', sans-serif" }}
                >
                  {value}
                </div>
                <div
                  className="text-white/35 text-xs uppercase tracking-wider mt-0.5"
                  style={{ fontFamily: isRTL ? "'Noto Kufi Arabic', sans-serif" : "'Inter', sans-serif" }}
                >
                  {label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Client cards grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-2">
          {CLIENTS.map((client, i) => (
            <ClientCard key={client.id} client={client} index={i} lang={lang} isRTL={isRTL} />
          ))}
        </div>

        {/* Bottom marquee strip */}
        <div className="mt-16 overflow-hidden border-t border-b border-white/10 py-4">
          <motion.div
            animate={{ x: isRTL ? ["0%", "50%"] : ["0%", "-50%"] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="flex gap-12 whitespace-nowrap"
          >
            {[...CLIENTS, ...CLIENTS].map((client, i) => (
              <span
                key={`${client.id}-${i}`}
                className="text-white/20 font-black uppercase tracking-widest text-sm shrink-0"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                {client.shortEn}
                <span className="mx-4 text-[#D4AF37]/30">·</span>
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
