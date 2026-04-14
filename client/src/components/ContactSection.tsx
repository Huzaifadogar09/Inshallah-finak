/* =============================================================================
   ENJAZCO Contact Section — Bilingual EN/AR with RTL support
   Design: Precision Engineering — Blueprint Meets Prestige
   ============================================================================= */

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, Briefcase, Loader2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { trpc } from "@/lib/trpc";

export default function ContactSection() {
  const { t, isRTL } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", company: "", email: "", phone: "", service: "", message: "" });

  const submitMutation = trpc.contact.submit.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      setSubmitError(null);
    },
    onError: (err) => {
      setSubmitError(err.message ?? "Submission failed. Please try again.");
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    submitMutation.mutate({
      name: form.name,
      email: form.email,
      phone: form.phone || undefined,
      company: form.company || undefined,
      subject: form.service || undefined,
      message: form.message,
      lang: isRTL ? "ar" : "en",
    });
  };

  const headFont = isRTL ? "'Noto Kufi Arabic', sans-serif" : "'Barlow Condensed', sans-serif";
  const bodyFont = isRTL ? "'Noto Kufi Arabic', sans-serif" : "'Inter', sans-serif";

  const contactInfo = [
    { icon: MapPin, labelKey: "contact.info.hq", value: "Riyadh, Kingdom of Saudi Arabia" },
    { icon: Phone, labelKey: "contact.info.phone", value: "+966 11 4655557" },
    { icon: Mail, labelKey: "contact.info.email", value: "info@enjaz-co.com" },
    { icon: Briefcase, labelKey: "contact.info.jobs", value: "jobs@enjaz-co.com" },
    { icon: Clock, labelKey: "contact.info.hours", valueKey: "contact.info.hoursVal" },
  ];

  const serviceOptions = [
    "services.s1.title", "services.s2.title", "services.s3.title",
    "services.s4.title", "services.s5.title", "services.s6.title",
    "services.s7.title", "services.s8.title", "services.s9.title",
  ];

  const inputClass = `w-full bg-white/5 border border-white/10 text-white placeholder-white/30 px-4 py-3 text-sm focus:outline-none focus:border-[#D4AF37]/60 transition-colors ${isRTL ? "text-right" : ""}`;

  return (
    <section id="contact" className="py-24 lg:py-32 bg-[#0A0E1A] relative overflow-hidden" dir={isRTL ? "rtl" : "ltr"}>
      <div className="absolute bottom-0 right-0 w-96 h-96 opacity-5 pointer-events-none" style={{ background: "radial-gradient(circle, #D4AF37 0%, transparent 70%)" }} />

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
            <span className="section-label" style={{ fontFamily: isRTL ? "'Noto Kufi Arabic', sans-serif" : undefined }}>{t("contact.label")}</span>
          </div>
          <h2 className="text-white" style={{ fontFamily: headFont, fontWeight: 800, fontSize: "clamp(2.5rem, 5vw, 4rem)", lineHeight: "0.95" }}>
            {t("contact.title1")}
            <br />
            <span className="text-[#D4AF37]">{t("contact.title2")}</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Info column */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 40 : -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className={`lg:col-span-2 ${isRTL ? "text-right" : ""}`}
          >
            <p className="text-white/60 leading-relaxed mb-8" style={{ fontFamily: bodyFont }}>{t("contact.intro")}</p>

            <div className="space-y-5 mb-10">
              {contactInfo.map(({ icon: Icon, labelKey, value, valueKey }) => (
                <div key={labelKey} className={`flex items-start gap-4 ${isRTL ? "flex-row-reverse" : ""}`}>
                  <div className="w-10 h-10 flex items-center justify-center border border-[#D4AF37]/20 shrink-0" style={{ background: "rgba(212,175,55,0.06)" }}>
                    <Icon size={16} className="text-[#D4AF37]" />
                  </div>
                  <div>
                    <div className="text-white/40 text-xs uppercase tracking-widest mb-0.5" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>{t(labelKey)}</div>
                    {value && value.includes("@") ? (
                      <a href={`mailto:${value}`} className="text-white text-sm hover:text-[#D4AF37] transition-colors" style={{ fontFamily: bodyFont }}>{value}</a>
                    ) : (
                      <div className="text-white text-sm" style={{ fontFamily: bodyFont }}>{valueKey ? t(valueKey) : value}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className={`p-5 border border-[#D4AF37]/20 ${isRTL ? "text-right" : ""}`} style={{ background: "rgba(212,175,55,0.04)" }}>
              <div className="text-[#D4AF37] font-bold text-sm mb-1" style={{ fontFamily: headFont }}>{t("contact.cr.label")}</div>
              <div className="text-white/60 text-sm" style={{ fontFamily: bodyFont }}>{t("contact.cr.value")}</div>
            </div>
          </motion.div>

          {/* Form column */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -40 : 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-3"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`h-full flex flex-col items-center justify-center text-center py-16 ${isRTL ? "text-right items-end" : ""}`}
              >
                <CheckCircle size={56} className="text-[#D4AF37] mb-6" />
                <h3 className="text-white font-black text-2xl mb-3" style={{ fontFamily: headFont }}>{t("contact.success.title")}</h3>
                <p className="text-white/60" style={{ fontFamily: bodyFont }}>{t("contact.success.sub")}</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/50 text-xs uppercase tracking-widest mb-1.5" style={{ fontFamily: "'Barlow Condensed', sans-serif", textAlign: isRTL ? "right" : "left" }}>{t("contact.form.name")}</label>
                    <input name="name" value={form.name} onChange={handleChange} required placeholder={t("contact.form.namePh")} className={inputClass} style={{ fontFamily: bodyFont }} />
                  </div>
                  <div>
                    <label className="block text-white/50 text-xs uppercase tracking-widest mb-1.5" style={{ fontFamily: "'Barlow Condensed', sans-serif", textAlign: isRTL ? "right" : "left" }}>{t("contact.form.company")}</label>
                    <input name="company" value={form.company} onChange={handleChange} placeholder={t("contact.form.companyPh")} className={inputClass} style={{ fontFamily: bodyFont }} />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/50 text-xs uppercase tracking-widest mb-1.5" style={{ fontFamily: "'Barlow Condensed', sans-serif", textAlign: isRTL ? "right" : "left" }}>{t("contact.form.email")}</label>
                    <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder={t("contact.form.emailPh")} className={inputClass} style={{ fontFamily: bodyFont }} />
                  </div>
                  <div>
                    <label className="block text-white/50 text-xs uppercase tracking-widest mb-1.5" style={{ fontFamily: "'Barlow Condensed', sans-serif", textAlign: isRTL ? "right" : "left" }}>{t("contact.form.phone")}</label>
                    <input name="phone" value={form.phone} onChange={handleChange} placeholder="+966 5X XXX XXXX" className={inputClass} style={{ fontFamily: bodyFont }} />
                  </div>
                </div>
                <div>
                  <label className="block text-white/50 text-xs uppercase tracking-widest mb-1.5" style={{ fontFamily: "'Barlow Condensed', sans-serif", textAlign: isRTL ? "right" : "left" }}>{t("contact.form.service")}</label>
                  <select name="service" value={form.service} onChange={handleChange} className={inputClass} style={{ fontFamily: bodyFont }}>
                    <option value="">{t("contact.form.servicePh")}</option>
                    {serviceOptions.map((k) => (
                      <option key={k} value={t(k)}>{t(k)}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-white/50 text-xs uppercase tracking-widest mb-1.5" style={{ fontFamily: "'Barlow Condensed', sans-serif", textAlign: isRTL ? "right" : "left" }}>{t("contact.form.message")}</label>
                  <textarea name="message" value={form.message} onChange={handleChange} required rows={5} placeholder={t("contact.form.messagePh")} className={inputClass} style={{ fontFamily: bodyFont, resize: "none" }} />
                </div>
                {submitError && (
                  <p className="text-red-400 text-sm text-center" style={{ fontFamily: bodyFont }}>{submitError}</p>
                )}
                <button
                  type="submit"
                  disabled={submitMutation.isPending}
                  className="btn-gold w-full flex items-center justify-center gap-2 py-4 text-base disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{ fontFamily: isRTL ? "'Noto Kufi Arabic', sans-serif" : undefined }}
                >
                  {submitMutation.isPending
                    ? <Loader2 size={16} className="animate-spin" />
                    : <Send size={16} className={isRTL ? "rotate-180" : ""} />
                  }
                  {submitMutation.isPending
                    ? (isRTL ? "جارٍ الإرسال..." : "Sending...")
                    : t("contact.form.submit")
                  }
                </button>
              </form>
            )}
          </motion.div>
        </div>

        {/* Map */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16"
        >
          <div className="flex items-center gap-3 mb-5">
            {!isRTL && <div className="h-px w-12 bg-[#D4AF37]" />}
            <span className="text-white/40 text-xs uppercase tracking-widest" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
              {isRTL ? "موقعنا" : "Our Location"}
            </span>
            {isRTL && <div className="h-px w-12 bg-[#D4AF37]" />}
          </div>
          <div className="relative w-full overflow-hidden border border-white/10" style={{ height: "380px" }}>
            <iframe
              title="ENJAZCO Office Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3624.5!2d46.7755!3d24.7136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zUlA1UCsyNFEgUXVydHViYWgsIFJpeWFkaCwgU2F1ZGkgQXJhYmlh!5e0!3m2!1sen!2ssa!4v1&q=RP5P%2BXQ+Qurtubah,+Riyadh,+Saudi+Arabia"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) brightness(0.85) contrast(1.1)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            {/* Gold overlay border accent */}
            <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: "inset 0 0 0 1px rgba(212,175,55,0.2)" }} />
          </div>
          <div className={`mt-3 flex items-center gap-2 ${isRTL ? "flex-row-reverse justify-end" : ""}`}>
            <MapPin size={13} className="text-[#D4AF37] shrink-0" />
            <span className="text-white/40 text-xs" style={{ fontFamily: "'Inter', sans-serif" }}>
              {isRTL ? "RP5P+XQ القرطبة، الرياض، المملكة العربية السعودية" : "RP5P+XQ Qurtubah, Riyadh, Saudi Arabia"}
            </span>
            <a
              href="https://maps.google.com/?q=RP5P+XQ+Qurtubah,+Riyadh,+Saudi+Arabia"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto text-[#D4AF37]/60 hover:text-[#D4AF37] text-xs uppercase tracking-widest transition-colors"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              {isRTL ? "فتح في خرائط جوجل" : "Open in Google Maps"}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
