/* =============================================================================
   ENJAZCO Ongoing Project Commitments Section
   Design: Precision Engineering — Blueprint Meets Prestige
   Dark background, gold accents, progress bars, status badges, filter tabs
   ============================================================================= */

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

interface Project {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  completion: number; // 0–1
  client: string;
  remarks?: string;
  category: "infrastructure" | "maintenance" | "earthworks" | "pipeline" | "other";
}

const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Jubail to Buraidah Potable Water Line",
    description: "Construction of approx. 107 km water transmission pipeline from Jubail to Buraidah, including excavation, pipe laying, valve installation, hydrostatic testing, and full commissioning.",
    startDate: "Jan 2026",
    endDate: "Dec 2027",
    completion: 0.05,
    client: "WTCO",
    category: "pipeline",
  },
  {
    id: 2,
    title: "Road Maintenance and Safety Enhancement — Eastern Sector, Riyadh",
    description: "Large-scale road maintenance, crack treatment, surface rehabilitation, and safety improvements across the Eastern Sector of Riyadh, including milling, asphalt overlay, and traffic management.",
    startDate: "Sep 2025",
    endDate: "Aug 2029",
    completion: 0.10,
    client: "Riyadh Municipality",
    category: "maintenance",
  },
  {
    id: 3,
    title: "Road Maintenance — Al-Ahsa Sector",
    description: "Road maintenance and safety enhancement works across the Al-Ahsa sector.",
    startDate: "Sep 2025",
    endDate: "Aug 2029",
    completion: 0.10,
    client: "Riyadh Municipality",
    category: "maintenance",
  },
  {
    id: 4,
    title: "Earthworks for King Salman Gate (KSG) — Design and Build",
    description: "Bulk excavation of mountainous areas, cut and fill of weathered rock, hard rock and soil, controlled blasting, demolition and relocation of on-grade and underground assets, and full site management.",
    startDate: "Jan 2026",
    endDate: "Nov 2026",
    completion: 0.05,
    client: "Rua Al Haram Al Makki Company",
    remarks: "303 Days",
    category: "earthworks",
  },
  {
    id: 5,
    title: "Infrastructure Development — First Industrial City, Jeddah (No. 1574930)",
    description: "Full infrastructure works covering roadway development, earthworks, signage, road markings, kerbs, fencing, interlock paving, and access pathways.",
    startDate: "Dec 2025",
    endDate: "Nov 2027",
    completion: 0.25,
    client: "Modon",
    category: "infrastructure",
  },
  {
    id: 6,
    title: "Earthworks and Infrastructure — Southeast of Jeddah",
    description: "Soilworks and infrastructure development in the Alwareef area southeast of Jeddah.",
    startDate: "Aug 2025",
    endDate: "May 2026",
    completion: 0.80,
    client: "National Housing Company",
    category: "earthworks",
  },
  {
    id: 7,
    title: "Port Demolition Works (4800000660)",
    description: "Demolition of port assets, segregation of recyclable/non-recyclable waste, processing of demolition arisings, and haulage to designated disposal locations.",
    startDate: "Mar 2023",
    endDate: "TBC",
    completion: 0.85,
    client: "NEOM",
    remarks: "Contract to be extended — Milestone 4 assets pending",
    category: "earthworks",
  },
  {
    id: 8,
    title: "Land Development — Jeddah Oasis",
    description: "Infrastructure works for land development in the Jeddah Oasis project.",
    startDate: "Dec 2025",
    endDate: "May 2027",
    completion: 0.25,
    client: "Modon",
    category: "infrastructure",
  },
  {
    id: 9,
    title: "Connecting Al-Baha to Riyadh / Rain / Bisha Road — Makkah Region",
    description: "Construction of roads and bridges including earthworks, signage, road markings, kerbs, street lighting, stormwater drainage, culverts, embankment and slope protection.",
    startDate: "Apr 2024",
    endDate: "Apr 2027",
    completion: 0.70,
    client: "Ministry of Transport",
    category: "infrastructure",
  },
  {
    id: 10,
    title: "Rock Cutting Stabilization — SAR Railway Network",
    description: "Stabilization of unstable rock cuttings along the SAR North–South and East–West Railway lines, addressing geotechnical challenges through a comprehensive Design and Build approach.",
    startDate: "Feb 2026",
    endDate: "Feb 2027",
    completion: 0.02,
    client: "Saudi Railways (SAR)",
    remarks: "12 Months",
    category: "infrastructure",
  },
  {
    id: 11,
    title: "Construction of Al-Ghafarat Bridge — Asir Region",
    description: "Construction of roads and bridge including earthworks, signage, road markings, street lighting, stormwater drainage, culverts, embankment and slope protection.",
    startDate: "Mar 2024",
    endDate: "Feb 2027",
    completion: 0.80,
    client: "Ministry of Transport",
    category: "infrastructure",
  },
  {
    id: 12,
    title: "Maintenance of the Performance of the Holy Sites Roads — 305",
    description: "Performance-based maintenance of roads in the Holy Sites area.",
    startDate: "TBC",
    endDate: "TBC",
    completion: 0,
    client: "Ministry of Transport",
    remarks: "Contract Awarded",
    category: "maintenance",
  },
  {
    id: 13,
    title: "Maintenance of the Performance of Shaqra Roads — Marat - Sajer (107)",
    description: "Performance-based maintenance of roads in the Shaqra, Marat, and Sajer areas.",
    startDate: "TBC",
    endDate: "TBC",
    completion: 0,
    client: "Ministry of Transport",
    remarks: "Contract Awarded",
    category: "maintenance",
  },
  {
    id: 14,
    title: "Maintenance of the Performance of Hofuf Roads — Haradh - Al-Batha (204)",
    description: "Performance-based maintenance of roads in the Hofuf, Haradh, and Al-Batha areas.",
    startDate: "TBC",
    endDate: "TBC",
    completion: 0,
    client: "Ministry of Transport",
    remarks: "Contract Awarded",
    category: "maintenance",
  },
  {
    id: 15,
    title: "Maintenance of the Performance of Shuaiba - Al-Laith Roads — 307",
    description: "Performance-based maintenance of roads in the Shuaiba and Al-Laith areas.",
    startDate: "TBC",
    endDate: "TBC",
    completion: 0,
    client: "Ministry of Transport",
    remarks: "Contract Awarded",
    category: "maintenance",
  },
  {
    id: 16,
    title: "Maintenance of the Performance of Roads — North Hail - Al-Jawf (601)",
    description: "Performance-based maintenance of roads in the North Hail and Al-Jawf areas.",
    startDate: "TBC",
    endDate: "TBC",
    completion: 0,
    client: "Ministry of Transport",
    remarks: "Contract Awarded",
    category: "maintenance",
  },
  {
    id: 17,
    title: "Maintenance of the Performance of Al-Qunfudhah Roads — Crosses (301)",
    description: "Performance-based maintenance of roads in the Al-Qunfudhah area.",
    startDate: "TBC",
    endDate: "TBC",
    completion: 0,
    client: "Ministry of Transport",
    remarks: "Contract Awarded",
    category: "maintenance",
  },
  {
    id: 18,
    title: "Al-Tantabawi in Mecca, Phase Two, 5 km long",
    description: "Construction and development of Al-Tantabawi Road in Mecca, Phase Two, covering a total length of 5 km.",
    startDate: "TBC",
    endDate: "TBC",
    completion: 0,
    client: "Ministry of Transport",
    remarks: "Contract Awarded",
    category: "maintenance",
  },
  {
    id: 19,
    title: "Planning Roads and Traffic Signs for Multiple Outlets",
    description: "Planning and installation of roads and traffic signs for multiple commercial and institutional outlets.",
    startDate: "Oct 2025",
    endDate: "Sep 2027",
    completion: 0.20,
    client: "Zakat and Tax",
    category: "infrastructure",
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  infrastructure: "#D4AF37",
  maintenance: "#4A7FA5",
  earthworks: "#C97B3A",
  pipeline: "#5A9E8F",
  other: "#8A8A8A",
};

const CATEGORY_LABELS: Record<string, string> = {
  all: "All Projects",
  infrastructure: "Infrastructure",
  maintenance: "Maintenance",
  earthworks: "Earthworks",
  pipeline: "Pipeline",
};

function getStatusLabel(completion: number, remarks?: string): { label: string; color: string } {
  if (remarks === "Contract Awarded") return { label: "Awarded", color: "#D4AF37" };
  if (completion === 0) return { label: "Mobilising", color: "#8A8A8A" };
  if (completion >= 0.8) return { label: "Near Completion", color: "#5A9E8F" };
  if (completion >= 0.5) return { label: "In Progress", color: "#4A7FA5" };
  return { label: "In Progress", color: "#4A7FA5" };
}

function ProgressBar({ value }: { value: number }) {
  const pct = Math.round(value * 100);
  return (
    <div className="mt-3">
      <div className="flex justify-between items-center mb-1">
        <span className="text-white/40 text-xs" style={{ fontFamily: "'Inter', sans-serif" }}>Overall Completion</span>
        <span className="text-[#D4AF37] text-xs font-bold">{pct}%</span>
      </div>
      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: pct >= 80 ? "#5A9E8F" : pct >= 50 ? "#4A7FA5" : "#D4AF37" }}
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const status = getStatusLabel(project.completion, project.remarks);
  const catColor = CATEGORY_COLORS[project.category];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
      className="border border-white/10 hover:border-[#D4AF37]/30 transition-all duration-300 cursor-pointer group"
      style={{ background: "rgba(255,255,255,0.03)" }}
      onClick={() => setExpanded(!expanded)}
    >
      <div className="p-5">
        {/* Top row */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            {/* ID badge */}
            <span
              className="text-xs font-black shrink-0 w-8 h-8 flex items-center justify-center"
              style={{ background: catColor, color: "#0A0E1A", fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              {String(project.id).padStart(2, "0")}
            </span>
            {/* Category pill */}
            <span
              className="text-xs uppercase tracking-wider px-2 py-0.5 border"
              style={{ color: catColor, borderColor: `${catColor}40`, fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              {project.category}
            </span>
          </div>
          {/* Status badge */}
          <span
            className="text-xs font-semibold px-2 py-0.5 shrink-0"
            style={{ background: `${status.color}18`, color: status.color, border: `1px solid ${status.color}40` }}
          >
            {status.label}
          </span>
        </div>

        {/* Title */}
        <h3
          className="text-white font-bold leading-tight mb-2 group-hover:text-[#D4AF37] transition-colors duration-200"
          style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "1rem" }}
        >
          {project.title}
        </h3>

        {/* Client */}
        <p className="text-white/50 text-xs mb-1" style={{ fontFamily: "'Inter', sans-serif" }}>
          <span className="text-white/30">Client: </span>{project.client}
        </p>

        {/* Dates */}
        <p className="text-white/40 text-xs" style={{ fontFamily: "'Inter', sans-serif" }}>
          {project.startDate} → {project.endDate}
          {project.remarks && project.remarks !== "Contract Awarded" && (
            <span className="ml-2 text-[#D4AF37]/60">({project.remarks})</span>
          )}
        </p>

        {/* Progress bar */}
        <ProgressBar value={project.completion} />

        {/* Expanded description */}
        {expanded && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mt-4 text-white/55 text-xs leading-relaxed border-t border-white/10 pt-4"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {project.description}
          </motion.p>
        )}

        {/* Expand hint */}
        <div className="mt-3 flex justify-end">
          <span className="text-white/20 text-xs group-hover:text-[#D4AF37]/50 transition-colors">
            {expanded ? "▲ Less" : "▼ Details"}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function OngoingProjectsSection() {
  const { isRTL } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filtered = activeFilter === "all" ? PROJECTS : PROJECTS.filter(p => p.category === activeFilter);
  const headFont = isRTL ? "'Noto Kufi Arabic', sans-serif" : "'Barlow Condensed', sans-serif";

  const stats = {
    total: PROJECTS.length,
    inProgress: PROJECTS.filter(p => p.completion > 0 && p.completion < 1 && p.remarks !== "Contract Awarded").length,
    awarded: PROJECTS.filter(p => p.remarks === "Contract Awarded").length,
    nearComplete: PROJECTS.filter(p => p.completion >= 0.8).length,
  };

  return (
    <section
      id="commitments"
      className="py-24 lg:py-32 bg-[#080C18] relative overflow-hidden"
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Background accent */}
      <div
        className="absolute bottom-0 left-0 w-[500px] h-[500px] opacity-[0.04] pointer-events-none"
        style={{ background: "radial-gradient(circle, #D4AF37 0%, transparent 70%)" }}
      />

      <div className="container mx-auto px-4 lg:px-8" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className={`mb-12 ${isRTL ? "text-right" : ""}`}
        >
          <div className={`flex items-center gap-3 mb-4 ${isRTL ? "flex-row-reverse justify-end" : ""}`}>
            <div className="h-px w-12 bg-[#D4AF37]" />
            <span className="section-label" style={{ fontFamily: isRTL ? "'Noto Kufi Arabic', sans-serif" : undefined }}>
              Active Portfolio
            </span>
          </div>
          <h2
            className="text-white mb-4"
            style={{ fontFamily: headFont, fontWeight: 800, fontSize: "clamp(2.5rem, 5vw, 4rem)", lineHeight: "0.9" }}
          >
            ONGOING PROJECT
            <br />
            <span className="text-[#D4AF37]">COMMITMENTS</span>
          </h2>
          <p className="text-white/50 max-w-xl" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9rem" }}>
            A live overview of ENJAZCO's active project portfolio — spanning infrastructure, maintenance, earthworks, and pipeline works across the Kingdom.
          </p>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10"
        >
          {[
            { label: "Total Projects", value: stats.total, color: "#D4AF37" },
            { label: "In Progress", value: stats.inProgress, color: "#4A7FA5" },
            { label: "Near Completion", value: stats.nearComplete, color: "#5A9E8F" },
            { label: "Newly Awarded", value: stats.awarded, color: "#C97B3A" },
          ].map(({ label, value, color }) => (
            <div
              key={label}
              className="p-4 border border-white/10"
              style={{ background: "rgba(255,255,255,0.03)" }}
            >
              <div className="text-3xl font-black mb-1" style={{ color, fontFamily: "'Barlow Condensed', sans-serif" }}>
                {value}
              </div>
              <div className="text-white/40 text-xs uppercase tracking-wider" style={{ fontFamily: "'Inter', sans-serif" }}>
                {label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.25 }}
          className={`flex flex-wrap gap-2 mb-8 ${isRTL ? "flex-row-reverse" : ""}`}
        >
          {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setActiveFilter(key)}
              className="px-4 py-1.5 text-xs uppercase tracking-wider border transition-all duration-200"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                background: activeFilter === key ? "#D4AF37" : "transparent",
                color: activeFilter === key ? "#0A0E1A" : "rgba(255,255,255,0.5)",
                borderColor: activeFilter === key ? "#D4AF37" : "rgba(255,255,255,0.15)",
              }}
            >
              {label}
              <span className="ml-1.5 opacity-60">
                ({key === "all" ? PROJECTS.length : PROJECTS.filter(p => p.category === key).length})
              </span>
            </button>
          ))}
        </motion.div>

        {/* Project cards grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={`mt-10 text-white/25 text-xs ${isRTL ? "text-right" : ""}`}
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          * Click any project card to expand its full scope description. Data reflects Rev.01 (Zero) status as of April 2026.
        </motion.p>
      </div>
    </section>
  );
}
