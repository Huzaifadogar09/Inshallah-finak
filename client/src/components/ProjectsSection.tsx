/* =============================================================================
   ENJAZCO Projects Section — Media slider per project, bilingual EN/AR
   Design: Precision Engineering — Blueprint Meets Prestige
   ============================================================================= */

import { useRef, useState, useCallback, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { MapPin, Calendar, ChevronLeft, ChevronRight, Play, X, Maximize2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

type MediaItem = { type: "image"; src: string } | { type: "video"; src: string; poster: string };

interface ProjectDef {
  id: number;
  titleKey: string;
  catKey: string;
  locKey: string;
  descKey: string;
  tag: string;
  tagKey: string;
  year: string;
  media: MediaItem[];
  clientLogo?: string;
  clientName?: string;
}

const projects: ProjectDef[] = [
  {
  id: 1, titleKey: "projects.p1.title", catKey: "projects.p1.cat", locKey: "projects.p1.loc", descKey: "projects.p1.desc",
    tag: "Bridges", tagKey: "projects.filter.bridges", year: "2024",
    media: [
      { type: "image", src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663212668472/PcGNmqJQxswD3RLCUZRDtf/albaha_bridge_1_22ba4970.jpeg" },
      { type: "image", src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663212668472/PcGNmqJQxswD3RLCUZRDtf/albaha_bridge_2_ce4000e1.jpeg" },
      { type: "image", src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663212668472/PcGNmqJQxswD3RLCUZRDtf/albaha_bridge_3_9954ac09.jpeg" },
    ],
  },
  {
    id: 2, titleKey: "projects.p2.title", catKey: "projects.p2.cat", locKey: "projects.p2.loc", descKey: "projects.p2.desc",
    tag: "Roads", tagKey: "projects.filter.roads", year: "2024",
    media: [
      { type: "image", src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663212668472/PcGNmqJQxswD3RLCUZRDtf/tantabawi_1_2958f01d.jpeg" },
      { type: "image", src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663212668472/PcGNmqJQxswD3RLCUZRDtf/tantabawi_2_e1b81fca.webp" },
    ],
  },
  {
    id: 3, titleKey: "projects.p3.title", catKey: "projects.p3.cat", locKey: "projects.p3.loc", descKey: "projects.p3.desc",
    tag: "Roads", tagKey: "projects.filter.roads", year: "2024",
    media: [
      { type: "image", src: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=85" },
      { type: "image", src: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=1200&q=85" },
      { type: "video", src: "https://videos.pexels.com/video-files/2053855/2053855-uhd_2560_1440_30fps.mp4", poster: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80" },
    ],
  },
  {
    id: 4, titleKey: "projects.p4.title", catKey: "projects.p4.cat", locKey: "projects.p4.loc", descKey: "projects.p4.desc",
    tag: "Pipelines", tagKey: "projects.filter.pipelines", year: "2023",
    media: [
      { type: "image", src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663212668472/PcGNmqJQxswD3RLCUZRDtf/enjazco_pipeline-T67nfB8PxhstKiAXDSdwL4.webp" },
      { type: "video", src: "https://videos.pexels.com/video-files/8597300/8597300-hd_1920_1080_25fps.mp4", poster: "https://d2xsxph8kpxj0f.cloudfront.net/310519663212668472/PcGNmqJQxswD3RLCUZRDtf/enjazco_pipeline-T67nfB8PxhstKiAXDSdwL4.webp" },
      { type: "image", src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=85" },
    ],
  },
  {
    id: 5, titleKey: "projects.p5.title", catKey: "projects.p5.cat", locKey: "projects.p5.loc", descKey: "projects.p5.desc",
    tag: "Bridges", tagKey: "projects.filter.bridges", year: "2023",
    media: [
      { type: "image", src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663212668472/PcGNmqJQxswD3RLCUZRDtf/enjazco_hero-3BEBtXWfLEKFZa37YFZbjy.webp" },
      { type: "video", src: "https://videos.pexels.com/video-files/3129671/3129671-uhd_2560_1440_30fps.mp4", poster: "https://d2xsxph8kpxj0f.cloudfront.net/310519663212668472/PcGNmqJQxswD3RLCUZRDtf/enjazco_hero-3BEBtXWfLEKFZa37YFZbjy.webp" },
      { type: "image", src: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=85" },
    ],
  },
  {
    id: 6, titleKey: "projects.p6.title", catKey: "projects.p6.cat", locKey: "projects.p6.loc", descKey: "projects.p6.desc",
    tag: "MEP", tagKey: "projects.filter.mep", year: "2022",
    media: [
      { type: "image", src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663212668472/PcGNmqJQxswD3RLCUZRDtf/enjazco_structural-ZnQeLRtEP5rYBme8ug8KtK.webp" },
      { type: "video", src: "https://videos.pexels.com/video-files/2053855/2053855-uhd_2560_1440_30fps.mp4", poster: "https://d2xsxph8kpxj0f.cloudfront.net/310519663212668472/PcGNmqJQxswD3RLCUZRDtf/enjazco_structural-ZnQeLRtEP5rYBme8ug8KtK.webp" },
      { type: "image", src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663212668472/PcGNmqJQxswD3RLCUZRDtf/enjazco_mep-VuGaV4LMWQaUNKW5XgiXQ7.webp" },
    ],
  },
  {
    id: 7, titleKey: "projects.p7.title", catKey: "projects.p7.cat", locKey: "projects.p7.loc", descKey: "projects.p7.desc",
    tag: "Structural", tagKey: "projects.filter.structural", year: "2025",
    clientLogo: "https://d2xsxph8kpxj0f.cloudfront.net/310519663212668472/PcGNmqJQxswD3RLCUZRDtf/sar_logo_f39fbedc.jpg",
    clientName: "Saudi Arabia Railways",
    media: [
      { type: "image", src: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=1200&q=85" },
      { type: "image", src: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=85" },
      { type: "image", src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=85" },
    ],
  },
  {
    id: 8, titleKey: "projects.p8.title", catKey: "projects.p8.cat", locKey: "projects.p8.loc", descKey: "projects.p8.desc",
    tag: "Earthworks", tagKey: "projects.filter.earthworks", year: "2024",
    media: [
      { type: "image", src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663212668472/PcGNmqJQxswD3RLCUZRDtf/ew_neom1_259bbf34.jpg" },
      { type: "image", src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663212668472/PcGNmqJQxswD3RLCUZRDtf/ew_neom2_1ac3ede0.jpg" },
      { type: "image", src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663212668472/PcGNmqJQxswD3RLCUZRDtf/ew_rock1_fd6b4182.png" },
      { type: "image", src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663212668472/PcGNmqJQxswD3RLCUZRDtf/ew_rock2_5233f7b5.png" },
      { type: "image", src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663212668472/PcGNmqJQxswD3RLCUZRDtf/ew_blast1_60349f84.png" },
    ],
  },
  {
    id: 9, titleKey: "projects.p9.title", catKey: "projects.p9.cat", locKey: "projects.p9.loc", descKey: "projects.p9.desc",
    tag: "Bridges", tagKey: "projects.filter.bridges", year: "2024",
    media: [
      { type: "image", src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663212668472/PcGNmqJQxswD3RLCUZRDtf/al_hassa1_eb4c8ca0.jpeg" },
      { type: "image", src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663212668472/PcGNmqJQxswD3RLCUZRDtf/al_hassa2_abdb5b0d.jpeg" },
      { type: "image", src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663212668472/PcGNmqJQxswD3RLCUZRDtf/al_hassa3_936e439c.jpeg" },
    ],
  },
  {
    id: 10, titleKey: "projects.p10.title", catKey: "projects.p10.cat", locKey: "projects.p10.loc", descKey: "projects.p10.desc",
    tag: "Roads", tagKey: "projects.filter.roads", year: "2023",
    media: [
      { type: "image", src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663212668472/PcGNmqJQxswD3RLCUZRDtf/al_wajh_c9463a91.jpeg" },
    ],
  },
  {
    id: 11, titleKey: "projects.p11.title", catKey: "projects.p11.cat", locKey: "projects.p11.loc", descKey: "projects.p11.desc",
    tag: "Bridges", tagKey: "projects.filter.bridges", year: "2023",
    media: [
      { type: "image", src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663212668472/PcGNmqJQxswD3RLCUZRDtf/hufof1_00212850.jpeg" },
      { type: "image", src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663212668472/PcGNmqJQxswD3RLCUZRDtf/hufof2_6d430c92.jpeg" },
      { type: "image", src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663212668472/PcGNmqJQxswD3RLCUZRDtf/hufof3_27dada9f.jpeg" },
    ],
  },
  {
    id: 12, titleKey: "projects.p12.title", catKey: "projects.p12.cat", locKey: "projects.p12.loc", descKey: "projects.p12.desc",
    tag: "Roads", tagKey: "projects.filter.roads", year: "2024",
    media: [
      { type: "image", src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663212668472/PcGNmqJQxswD3RLCUZRDtf/jeddah_makkah1_70e3409b.jpeg" },
      { type: "image", src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663212668472/PcGNmqJQxswD3RLCUZRDtf/jeddah_makkah2_a2b3e3e3.jpeg" },
    ],
  },
  {
    id: 13, titleKey: "projects.p13.title", catKey: "projects.p13.cat", locKey: "projects.p13.loc", descKey: "projects.p13.desc",
    tag: "Roads", tagKey: "projects.filter.roads", year: "2023",
    media: [
      { type: "image", src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663212668472/PcGNmqJQxswD3RLCUZRDtf/albaha_roads_2493b3d6.jpeg" },
    ],
  },
  {
    id: 14, titleKey: "projects.p14.title", catKey: "projects.p14.cat", locKey: "projects.p14.loc", descKey: "projects.p14.desc",
    tag: "Roads", tagKey: "projects.filter.roads", year: "2024",
    media: [
      { type: "image", src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663212668472/PcGNmqJQxswD3RLCUZRDtf/alsail_5_da7f5d3e.jpeg" },
      { type: "image", src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663212668472/PcGNmqJQxswD3RLCUZRDtf/alsail_4_72ee3811.jpeg" },
      { type: "image", src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663212668472/PcGNmqJQxswD3RLCUZRDtf/alsail_3_fc8706ea.jpeg" },
      { type: "image", src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663212668472/PcGNmqJQxswD3RLCUZRDtf/alsail_2_25d1674b.jpeg" },
      { type: "image", src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663212668472/PcGNmqJQxswD3RLCUZRDtf/alsail_1_e1a8f4a7.jpeg" },
    ],
  },
  {
    id: 15, titleKey: "projects.p15.title", catKey: "projects.p15.cat", locKey: "projects.p15.loc", descKey: "projects.p15.desc",
    tag: "Bridges", tagKey: "projects.filter.bridges", year: "2024",
    media: [
      { type: "image", src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663212668472/PcGNmqJQxswD3RLCUZRDtf/alsail_4_72ee3811.jpeg" },
      { type: "image", src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663212668472/PcGNmqJQxswD3RLCUZRDtf/alsail_5_da7f5d3e.jpeg" },
      { type: "image", src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663212668472/PcGNmqJQxswD3RLCUZRDtf/alsail_3_fc8706ea.jpeg" },
      { type: "image", src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663212668472/PcGNmqJQxswD3RLCUZRDtf/alsail_2_25d1674b.jpeg" },
      { type: "image", src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663212668472/PcGNmqJQxswD3RLCUZRDtf/alsail_1_e1a8f4a7.jpeg" },
    ],
  },
  {
    id: 16, titleKey: "projects.p16.title", catKey: "projects.p16.cat", locKey: "projects.p16.loc", descKey: "projects.p16.desc",
    tag: "Pipelines", tagKey: "projects.filter.pipelines", year: "2026",
    media: [
      { type: "image", src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663212668472/PcGNmqJQxswD3RLCUZRDtf/Jubail-BuraydaIWTP(1)_d6feac7b.jpeg" },
      { type: "image", src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663212668472/PcGNmqJQxswD3RLCUZRDtf/Jubail-BuraydaIWTP(2)_53f65fca.jpeg" },
      { type: "image", src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663212668472/PcGNmqJQxswD3RLCUZRDtf/Jubail-BuraydaIWTP(3)_4abe507e.jpeg" },
      { type: "image", src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663212668472/PcGNmqJQxswD3RLCUZRDtf/Jubail-BuraydaIWTP(4)_6f70f083.jpeg" },
    ],
  },
];

const filterKeys = [
  { key: "projects.filter.all", value: "All" },
  { key: "projects.filter.roads", value: "Roads" },
  { key: "projects.filter.bridges", value: "Bridges" },
  { key: "projects.filter.pipelines", value: "Pipelines" },
  { key: "projects.filter.mep", value: "MEP" },
  { key: "projects.filter.structural", value: "Structural" },
  { key: "projects.filter.earthworks", value: "Earthworks" },
];

/* ---------------------------------------------------------------------------
   Media Slider
   --------------------------------------------------------------------------- */
function MediaSlider({ media, compact = false, onExpand, projectTitle = "ENJAZCO Project" }: { media: MediaItem[]; compact?: boolean; onExpand?: (i: number) => void; projectTitle?: string }) {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const go = useCallback((idx: number, d: 1 | -1) => { setDir(d); setActive((idx + media.length) % media.length); }, [media.length]);

  useEffect(() => {
    if (videoRef.current) { videoRef.current.currentTime = 0; videoRef.current.play().catch(() => {}); }
  }, [active]);

  const item = media[active];

  return (
    <div className={`relative overflow-hidden bg-black ${compact ? "h-52" : "h-full"}`}>
      <AnimatePresence custom={dir} initial={false}>
        <motion.div
          key={active}
          custom={dir}
          initial={{ opacity: 0, x: dir * 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: dir * -60 }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          {item.type === "image" ? (
            <img src={item.src} alt={projectTitle} className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
          ) : (
            <video ref={videoRef} src={item.src} poster={item.poster} muted loop playsInline autoPlay className="w-full h-full object-cover" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E1A]/80 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      {item.type === "video" && (
        <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm px-2 py-1 z-10">
          <Play size={10} className="text-[#D4AF37] fill-[#D4AF37]" />
          <span className="text-[10px] text-white/80 uppercase tracking-widest" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Video</span>
        </div>
      )}
      {onExpand && (
        <button onClick={() => onExpand(active)} className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center bg-black/60 backdrop-blur-sm text-white/60 hover:text-[#D4AF37] transition-colors z-10">
          <Maximize2 size={12} />
        </button>
      )}
      {media.length > 1 && (
        <>
          <button onClick={(e) => { e.stopPropagation(); go(active - 1, -1); }} className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center bg-black/50 backdrop-blur-sm text-white/70 hover:text-[#D4AF37] transition-colors z-10"><ChevronLeft size={14} /></button>
          <button onClick={(e) => { e.stopPropagation(); go(active + 1, 1); }} className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center bg-black/50 backdrop-blur-sm text-white/70 hover:text-[#D4AF37] transition-colors z-10"><ChevronRight size={14} /></button>
        </>
      )}
      {media.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
          {media.map((_, i) => (
            <button key={i} onClick={(e) => { e.stopPropagation(); go(i, i > active ? 1 : -1); }}>
              <div className="h-1 rounded-full transition-all duration-300" style={{ width: i === active ? "1.5rem" : "0.375rem", background: i === active ? "#D4AF37" : "rgba(255,255,255,0.4)" }} />
            </button>
          ))}
        </div>
      )}
      <div className="absolute bottom-3 right-3 text-[10px] text-white/50 z-10" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
        {String(active + 1).padStart(2, "0")} / {String(media.length).padStart(2, "0")}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------------
   Lightbox
   --------------------------------------------------------------------------- */
function Lightbox({ project, onClose, t, isRTL }: { project: ProjectDef; onClose: () => void; t: (k: string) => string; isRTL: boolean }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex flex-col"
      onClick={onClose}
    >
      <div className={`flex items-center justify-between px-6 py-4 border-b border-white/10 flex-shrink-0 ${isRTL ? "flex-row-reverse" : ""}`} onClick={(e) => e.stopPropagation()}>
        <div className={isRTL ? "text-right" : ""}>
          <h3 className="text-white font-bold text-lg" style={{ fontFamily: isRTL ? "'Noto Kufi Arabic', sans-serif" : "'Barlow Condensed', sans-serif" }}>{t(project.titleKey)}</h3>
          <p className="text-white/40 text-xs">{t(project.catKey)} — {t(project.locKey)}</p>
        </div>
        <button onClick={onClose} className="w-9 h-9 flex items-center justify-center border border-white/20 text-white/60 hover:text-white transition-all"><X size={16} /></button>
      </div>
      <div className="flex-1 min-h-0" onClick={(e) => e.stopPropagation()}>
        <MediaSlider media={project.media} projectTitle={t(project.titleKey)} />
      </div>
    </motion.div>
  );
}

/* ---------------------------------------------------------------------------
   Project Card
   --------------------------------------------------------------------------- */
function ProjectCard({ project, index, t, isRTL }: { project: ProjectDef; index: number; t: (k: string) => string; isRTL: boolean }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55, delay: (index % 3) * 0.1 }}
        className="group overflow-hidden"
        style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
        dir={isRTL ? "rtl" : "ltr"}
      >
        <MediaSlider media={project.media} compact onExpand={() => setLightboxOpen(true)} projectTitle={t(project.titleKey)} />
        <div className={`p-5 ${isRTL ? "text-right" : ""}`}>
          <div className={`flex items-center justify-between mb-3 ${isRTL ? "flex-row-reverse" : ""}`}>
            <div className={`flex items-center gap-3 text-white/40 text-xs ${isRTL ? "flex-row-reverse" : ""}`}>
              <span className="flex items-center gap-1"><MapPin size={10} />{t(project.locKey)}</span>
              <span className="flex items-center gap-1"><Calendar size={10} />{project.year}</span>
            </div>
            <span className="text-xs px-2 py-0.5 font-bold uppercase tracking-widest" style={{ fontFamily: "'Barlow Condensed', sans-serif", background: "#D4AF37", color: "#0A0E1A" }}>
              {t(project.tagKey)}
            </span>
          </div>
          {project.clientLogo && (
            <div className={`flex items-center gap-2 mb-2 ${isRTL ? "flex-row-reverse" : ""}`}>
              <img
                src={project.clientLogo}
                alt={project.clientName || "Client"}
                className="h-8 object-contain rounded-sm"
                style={{ background: "#fff", padding: "3px 6px", maxWidth: "120px" }}
              />
            </div>
          )}
          <h3 className="text-white font-bold mb-2 leading-tight" style={{ fontFamily: isRTL ? "'Noto Kufi Arabic', sans-serif" : "'Barlow Condensed', sans-serif", fontSize: "1.05rem" }}>
            {t(project.titleKey)}
          </h3>
          <p className="text-white/50 text-sm leading-relaxed mb-4" style={{ fontFamily: isRTL ? "'Noto Kufi Arabic', sans-serif" : "'Inter', sans-serif" }}>
            {t(project.descKey)}
          </p>
          <div className={`flex items-center gap-2 text-white/30 text-xs ${isRTL ? "flex-row-reverse" : ""}`} style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
            <div className="flex gap-1">
              {project.media.map((m, i) => (
                <div key={i} className="w-4 h-1" style={{ background: m.type === "video" ? "#D4AF37" : "rgba(255,255,255,0.3)" }} />
              ))}
            </div>
            <span>
              {project.media.filter((m) => m.type === "image").length} {t("projects.photos")} · {project.media.filter((m) => m.type === "video").length} {t("projects.videos")}
            </span>
          </div>
        </div>
      </motion.div>
      <AnimatePresence>
        {lightboxOpen && <Lightbox project={project} onClose={() => setLightboxOpen(false)} t={t} isRTL={isRTL} />}
      </AnimatePresence>
    </>
  );
}

/* ---------------------------------------------------------------------------
   Main Section
   --------------------------------------------------------------------------- */
export default function ProjectsSection() {
  const { t, isRTL } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = activeFilter === "All" ? projects : projects.filter((p) => p.tag === activeFilter);

  return (
    <section id="projects" className="py-24 lg:py-32 bg-[#0A0E1A] relative" dir={isRTL ? "rtl" : "ltr"}>
      <div className="container mx-auto px-4 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className={`mb-12 ${isRTL ? "text-right" : ""}`}
        >
          <div className={`flex items-center gap-3 mb-4 ${isRTL ? "flex-row-reverse justify-end" : ""}`}>
            <div className="h-px w-12 bg-[#D4AF37]" />
            <span className="section-label" style={{ fontFamily: isRTL ? "'Noto Kufi Arabic', sans-serif" : undefined }}>{t("projects.label")}</span>
          </div>
          <div className={`flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 ${isRTL ? "lg:flex-row-reverse" : ""}`}>
            <h2 className="text-white" style={{ fontFamily: isRTL ? "'Noto Kufi Arabic', sans-serif" : "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: "clamp(2.5rem, 5vw, 4rem)", lineHeight: "0.95" }}>
              {t("projects.title1")}
              <br />
              <span className="text-[#D4AF37]">{t("projects.title2")}</span>
            </h2>
            <div className="flex flex-wrap gap-2">
              {filterKeys.map((f) => (
                <button
                  key={f.value}
                  onClick={() => setActiveFilter(f.value)}
                  className="px-4 py-2 text-xs uppercase tracking-widest transition-all duration-200 font-bold"
                  style={{
                    fontFamily: isRTL ? "'Noto Kufi Arabic', sans-serif" : "'Barlow Condensed', sans-serif",
                    textTransform: isRTL ? "none" : "uppercase",
                    background: activeFilter === f.value ? "#D4AF37" : "transparent",
                    color: activeFilter === f.value ? "#0A0E1A" : "rgba(255,255,255,0.5)",
                    border: `1px solid ${activeFilter === f.value ? "#D4AF37" : "rgba(255,255,255,0.15)"}`,
                  }}
                >
                  {t(f.key)}
                </button>
              ))}
            </div>
          </div>
          <div className={`flex items-center gap-4 mt-4 text-xs text-white/30 ${isRTL ? "flex-row-reverse justify-end" : ""}`}>
            <span className="flex items-center gap-1.5"><div className="w-4 h-1 bg-[#D4AF37]" /> {t("projects.legend.video")}</span>
            <span className="flex items-center gap-1.5"><div className="w-4 h-1 bg-white/30" /> {t("projects.legend.photo")}</span>
            <span className="flex items-center gap-1.5"><Maximize2 size={10} /> {t("projects.legend.expand")}</span>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} t={t} isRTL={isRTL} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
