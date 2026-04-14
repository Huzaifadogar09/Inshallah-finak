/* =============================================================================
   ENJAZCO Footer — Bilingual EN/AR with RTL support
   Design: Precision Engineering — Blueprint Meets Prestige
   ============================================================================= */

import { ArrowUp, Linkedin, Youtube, Globe, Users } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const serviceKeys = [
  "services.s1.title", "services.s2.title", "services.s3.title",
  "services.s4.title", "services.s5.title", "services.s6.title",
  "services.s7.title", "services.s8.title", "services.s9.title",
];

const quickLinkKeys = [
  { key: "nav.home", href: "#home" },
  { key: "nav.about", href: "#about" },
  { key: "nav.services", href: "#services" },
  { key: "nav.projects", href: "#projects" },
  { key: "nav.why", href: "#why" },
  { key: "nav.contact", href: "#contact" },
];

export default function Footer() {
  const { t, isRTL } = useLanguage();
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const handleNavClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const headFont = isRTL ? "'Noto Kufi Arabic', sans-serif" : "'Barlow Condensed', sans-serif";
  const bodyFont = isRTL ? "'Noto Kufi Arabic', sans-serif" : "'Inter', sans-serif";

  return (
    <footer className="bg-[#060912] border-t border-white/10 relative" dir={isRTL ? "rtl" : "ltr"}>
      <div className="h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-30" />

      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Brand Column */}
          <div className={`lg:col-span-1 ${isRTL ? "text-right" : ""}`}>
            <div className="mb-6">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663212668472/PcGNmqJQxswD3RLCUZRDtf/enjazco_new_logo_nobg_7eeabc11.png"
                alt="ENJAZCO — Al-Enjaz Trading & Contracting Company"
                className="h-20 w-auto object-contain"
              />
            </div>
            <p className="text-white/40 text-sm leading-relaxed mb-6" style={{ fontFamily: bodyFont }}>
              {t("footer.tagline")}
            </p>
            <div className={`flex gap-3 ${isRTL ? "flex-row-reverse justify-end" : ""}`}>
              <a href="https://www.linkedin.com/company/alenjaz" target="_blank" rel="noopener noreferrer" className="w-9 h-9 flex items-center justify-center border border-white/10 text-white/40 hover:text-[#D4AF37] hover:border-[#D4AF37]/40 transition-all duration-200">
                <Linkedin size={14} />
              </a>
              <a href="https://www.youtube.com/@EnjazCoProjects" target="_blank" rel="noopener noreferrer" className="w-9 h-9 flex items-center justify-center border border-white/10 text-white/40 hover:text-[#D4AF37] hover:border-[#D4AF37]/40 transition-all duration-200">
                <Youtube size={14} />
              </a>
              <a href="https://enjaz-co.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 flex items-center justify-center border border-white/10 text-white/40 hover:text-[#D4AF37] hover:border-[#D4AF37]/40 transition-all duration-200">
                <Globe size={14} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className={isRTL ? "text-right" : ""}>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-6" style={{ fontFamily: headFont, textTransform: isRTL ? "none" : "uppercase" }}>
              {t("footer.quicklinks")}
            </h4>
            <ul className="space-y-3">
              {quickLinkKeys.map((link) => (
                <li key={link.key}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className={`text-white/40 hover:text-[#D4AF37] text-sm transition-colors duration-200 ${isRTL ? "text-right" : "text-left"}`}
                    style={{ fontFamily: bodyFont }}
                  >
                    {t(link.key)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className={`lg:col-span-2 ${isRTL ? "text-right" : ""}`}>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-6" style={{ fontFamily: headFont, textTransform: isRTL ? "none" : "uppercase" }}>
              {t("footer.services")}
            </h4>
            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
              {serviceKeys.map((key) => (
                <button
                  key={key}
                  onClick={() => handleNavClick("#services")}
                  className={`text-white/40 hover:text-[#D4AF37] text-sm transition-colors duration-200 flex items-center gap-2 ${isRTL ? "flex-row-reverse text-right" : "text-left"}`}
                  style={{ fontFamily: bodyFont }}
                >
                  <span className="w-1 h-1 bg-[#D4AF37] flex-shrink-0" />
                  {t(key)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Employee Portal Banner */}
        <div className={`py-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 ${isRTL ? "sm:flex-row-reverse" : ""}`}>
          <div className={`flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
            <div className="w-9 h-9 flex items-center justify-center border border-[#D4AF37]/30 bg-[#D4AF37]/5">
              <Users size={15} className="text-[#D4AF37]" />
            </div>
            <div className={isRTL ? "text-right" : ""}>
              <div className="text-white text-sm font-bold" style={{ fontFamily: headFont }}>
                {isRTL ? "بوابة الموظفين" : "Employee Portal"}
              </div>
              <div className="text-white/40 text-xs" style={{ fontFamily: bodyFont }}>
                {isRTL ? "نظام HR & ERP المتكامل" : "All-in-One HR & ERP System"}
              </div>
            </div>
          </div>
          <a
            href="https://erp.enjaz-co.com/web/login"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-2.5 border border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37]/10 hover:border-[#D4AF37] transition-all duration-200 text-xs font-bold tracking-wider"
            style={{ fontFamily: isRTL ? "'Noto Kufi Arabic', sans-serif" : "'Barlow Condensed', sans-serif" }}
          >
            <Users size={13} />
            {isRTL ? "دخول البوابة" : "Access Portal"}
          </a>
        </div>

        {/* Social Media QR Code */}
        <div className={`py-10 border-t border-white/10 flex flex-col items-center gap-4`}>
          <p className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest" style={{ fontFamily: headFont }}>
            {isRTL ? "امسح QR لمتابعتنا على وسائل التواصل الاجتماعي" : "Scan to Follow Us on Social Media"}
          </p>
          <img
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663212668472/PcGNmqJQxswD3RLCUZRDtf/enjazco_social_qr_4a90cb7a.png"
            alt="EnjazCo Social Media QR Code"
            className="w-48 h-auto rounded-xl shadow-2xl border border-white/10"
          />
        </div>

        {/* Bottom Bar */}
        <div className={`pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 ${isRTL ? "sm:flex-row-reverse" : ""}`}>
          <p className="text-white/30 text-xs" style={{ fontFamily: bodyFont }}>
            {t("footer.copy")}
          </p>
          <div className={`flex items-center gap-6 ${isRTL ? "flex-row-reverse" : ""}`}>
            <span className="text-white/30 text-xs" style={{ fontFamily: bodyFont }}>
              {t("footer.location")}
            </span>
            <button
              onClick={scrollToTop}
              className="w-9 h-9 flex items-center justify-center border border-white/10 text-white/40 hover:text-[#D4AF37] hover:border-[#D4AF37]/40 transition-all duration-200"
            >
              <ArrowUp size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
