/* =============================================================================
   ENJAZCO Navbar — Bilingual (EN/AR) with RTL support + language toggle
   Design: Precision Engineering — Blueprint Meets Prestige
   ============================================================================= */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Globe, Users } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Navbar() {
  const { lang, setLang, t, isRTL } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  const navLinks = [
    { key: "nav.home", href: "#home" },
    { key: "nav.about", href: "#about" },
    {
      key: "nav.services",
      href: "#services",
      children: [
        { key: "services.s1.title", href: "#services" },
        { key: "services.s2.title", href: "#services" },
        { key: "services.s3.title", href: "#services" },
        { key: "services.s4.title", href: "#services" },
        { key: "services.s5.title", href: "#services" },
        { key: "services.s6.title", href: "#services" },
        { key: "services.s7.title", href: "#services" },
        { key: "services.s8.title", href: "#services" },
        { key: "services.s9.title", href: "#services" },
      ],
    },
    { key: "nav.projects", href: "#projects" },
    { key: "nav.commitments", href: "#commitments" },
    { key: "nav.maintenance", href: "#maintenance" },
    { key: "nav.clients", href: "#clients" },
    { key: "nav.why", href: "#why" },
    { key: "nav.contact", href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    setServicesOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const dropdownAlign = isRTL ? "right-0" : "left-0";

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0A0E1A]/95 backdrop-blur-md border-b border-white/10 shadow-2xl"
          : "bg-transparent"
      }`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button
            onClick={() => handleNavClick("#home")}
            className="flex items-center group"
          >
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663212668472/PcGNmqJQxswD3RLCUZRDtf/enjazco_new_logo_nobg_7eeabc11.png"
              alt="ENJAZCO — Al-Enjaz Trading & Contracting Company"
              className="h-20 w-auto object-contain"
              style={{ filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.4))" }}
            />
          </button>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) =>
              link.children ? (
                <div
                  key={link.key}
                  className="relative"
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  <button
                    className="flex items-center gap-1 text-white/80 hover:text-[#D4AF37] transition-colors duration-200"
                    style={{
                      fontFamily: isRTL ? "'Noto Kufi Arabic', sans-serif" : "'Barlow Condensed', sans-serif",
                      fontSize: isRTL ? "0.85rem" : "0.8rem",
                      letterSpacing: isRTL ? "0" : "0.12em",
                      textTransform: isRTL ? "none" : "uppercase",
                      fontWeight: 600,
                    }}
                  >
                    {t(link.key)}
                    <ChevronDown size={14} className={`transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {servicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.15 }}
                        className={`absolute top-full ${dropdownAlign} mt-2 w-72 bg-[#0A0E1A]/98 backdrop-blur-md border border-white/10 shadow-2xl`}
                      >
                        {link.children.map((child) => (
                          <button
                            key={child.key}
                            onClick={() => handleNavClick(child.href)}
                            className={`w-full px-5 py-3 text-white/70 hover:text-[#D4AF37] hover:bg-white/5 transition-all duration-150 text-sm border-b border-white/5 last:border-0 ${isRTL ? "text-right" : "text-left"}`}
                            style={{ fontFamily: isRTL ? "'Noto Kufi Arabic', sans-serif" : "'Inter', sans-serif" }}
                          >
                            {t(child.key)}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <button
                  key={link.key}
                  onClick={() => handleNavClick(link.href)}
                  className="relative text-white/80 hover:text-[#D4AF37] transition-colors duration-200 group"
                  style={{
                    fontFamily: isRTL ? "'Noto Kufi Arabic', sans-serif" : "'Barlow Condensed', sans-serif",
                    fontSize: isRTL ? "0.85rem" : "0.8rem",
                    letterSpacing: isRTL ? "0" : "0.12em",
                    textTransform: isRTL ? "none" : "uppercase",
                    fontWeight: 600,
                  }}
                >
                  {t(link.key)}
                  <span className={`absolute -bottom-1 ${isRTL ? "right-0" : "left-0"} w-0 h-px bg-[#D4AF37] group-hover:w-full transition-all duration-300`} />
                </button>
              )
            )}
          </div>

          {/* Right side: Language toggle + CTA */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Language Toggle */}
            <button
              onClick={() => setLang(lang === "en" ? "ar" : "en")}
              className="flex items-center gap-1.5 px-3 py-1.5 border border-white/20 text-white/60 hover:text-[#D4AF37] hover:border-[#D4AF37]/50 transition-all duration-200 text-xs font-bold tracking-wider"
              style={{ fontFamily: lang === "ar" ? "'Barlow Condensed', sans-serif" : "'Noto Kufi Arabic', sans-serif" }}
              title={lang === "en" ? "Switch to Arabic" : "التبديل إلى الإنجليزية"}
            >
              <Globe size={13} />
              {lang === "en" ? "عربي" : "EN"}
            </button>

            {/* Employee Portal */}
            <a
              href="https://erp.enjaz-co.com/web/login"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2.5 border border-[#D4AF37]/40 text-[#D4AF37]/80 hover:text-[#D4AF37] hover:border-[#D4AF37] hover:bg-[#D4AF37]/5 transition-all duration-200 text-xs font-bold tracking-wider"
              style={{ fontFamily: isRTL ? "'Noto Kufi Arabic', sans-serif" : "'Barlow Condensed', sans-serif" }}
              title={isRTL ? "بوابة الموظفين — نظام ERP" : "Employee Portal — ERP System"}
            >
              <Users size={13} />
              {isRTL ? "بوابة الموظفين" : "Employee Portal"}
            </a>

            {/* CTA */}
            <button
              onClick={() => handleNavClick("#contact")}
              className="btn-gold text-sm px-6 py-2.5"
              style={{ fontFamily: isRTL ? "'Noto Kufi Arabic', sans-serif" : undefined }}
            >
              {t("nav.cta")}
            </button>
          </div>

          {/* Mobile: Language + Hamburger */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => setLang(lang === "en" ? "ar" : "en")}
              className="flex items-center gap-1 px-2 py-1.5 border border-white/20 text-white/60 hover:text-[#D4AF37] transition-colors text-xs font-bold"
              style={{ fontFamily: lang === "ar" ? "'Barlow Condensed', sans-serif" : "'Noto Kufi Arabic', sans-serif" }}
            >
              <Globe size={12} />
              {lang === "en" ? "عربي" : "EN"}
            </button>
            <button
              className="text-white p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#0A0E1A]/98 backdrop-blur-md border-t border-white/10"
          >
            <div className={`container py-4 flex flex-col gap-1 ${isRTL ? "items-end" : "items-start"}`}>
              {navLinks.map((link) => (
                <button
                  key={link.key}
                  onClick={() => handleNavClick(link.href)}
                  className={`w-full px-4 py-3 text-white/80 hover:text-[#D4AF37] hover:bg-white/5 transition-all text-sm uppercase tracking-widest ${isRTL ? "text-right" : "text-left"}`}
                  style={{
                    fontFamily: isRTL ? "'Noto Kufi Arabic', sans-serif" : "'Barlow Condensed', sans-serif",
                    textTransform: isRTL ? "none" : "uppercase",
                    letterSpacing: isRTL ? "0" : undefined,
                  }}
                >
                  {t(link.key)}
                </button>
              ))}
              <div className="px-4 pt-2 w-full">
                <a
                  href="https://erp.enjaz-co.com/web/login"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 border border-[#D4AF37]/40 text-[#D4AF37] text-sm font-bold tracking-wider mb-3"
                  style={{ fontFamily: isRTL ? "'Noto Kufi Arabic', sans-serif" : "'Barlow Condensed', sans-serif" }}
                >
                  <Users size={14} />
                  {isRTL ? "بوابة الموظفين — HR & ERP" : "Employee Portal — HR & ERP"}
                </a>
                <button
                  onClick={() => handleNavClick("#contact")}
                  className="btn-gold w-full text-center"
                  style={{ fontFamily: isRTL ? "'Noto Kufi Arabic', sans-serif" : undefined }}
                >
                  {t("nav.cta")}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
