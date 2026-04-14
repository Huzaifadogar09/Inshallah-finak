// Design Philosophy: Industrial precision — dark charcoal base, amber/gold accents,
// bold typography, structured grid layout matching the overall ENJAZCO brand.

import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";
import { Wrench, MapPin, Hash, ChevronDown, ChevronUp } from "lucide-react";

interface MaintenanceProject {
  id: string;
  contractNo: string;
  titleEn: string;
  titleAr: string;
  regionEn: string;
  regionAr: string;
  scopeEn: string;
  scopeAr: string;
  client: string;
  status: "active" | "completed" | "awarded";
  videos?: string[];
}

const maintenanceProjects: MaintenanceProject[] = [
  {
    id: "m1",
    contractNo: "—",
    titleEn: "Maintenance and Improvement of the Road Network and Traffic Safety in Riyadh, Eastern Sector",
    titleAr: "صيانة وتحسين شبكة الطرق وسلامة المرور في الرياض، القطاع الشرقي",
    regionEn: "Riyadh Region — Eastern Sector",
    regionAr: "منطقة الرياض — القطاع الشرقي",
    scopeEn: "Comprehensive road network maintenance, traffic safety improvements, signage upgrades, and pavement rehabilitation across the eastern sector of Riyadh.",
    scopeAr: "صيانة شاملة لشبكة الطرق، وتحسينات سلامة المرور، وترقية اللافتات، وإعادة تأهيل الرصيف في القطاع الشرقي من الرياض.",
    client: "Ministry of Transport & Logistics",
    status: "active",
    videos: [
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663212668472/PcGNmqJQxswD3RLCUZRDtf/%D9%85%D9%86%D8%A7%D8%B9%D9%85%D8%A7%D9%84%D8%B4%D8%B1%D9%83%D8%A9%D8%A7%D9%86%D8%AC%D8%A7%D8%B2%D9%85%D8%B4%D8%B1%D9%88%D8%B9%D8%B4%D8%B1%D9%82%D8%A7%D9%84%D8%B1%D9%8A%D8%A7%D8%B6(1)_cc0f1039.mp4",
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663212668472/PcGNmqJQxswD3RLCUZRDtf/%D9%85%D9%86%D8%A7%D8%B9%D9%85%D8%A7%D9%84%D8%B4%D8%B1%D9%83%D8%A9%D8%A7%D9%86%D8%AC%D8%A7%D8%B2%D9%85%D8%B4%D8%B1%D9%88%D8%B9%D8%B4%D8%B1%D9%82%D8%A7%D9%84%D8%B1%D9%8A%D8%A7%D8%B6_fdc01c89.mp4",
    ],
  },
  {
    id: "m2",
    contractNo: "106",
    titleEn: "Maintenance of the Performance of the Zulfi–Ghat Roads",
    titleAr: "صيانة أداء طرق الزلفي–الغاط",
    regionEn: "Riyadh Region",
    regionAr: "منطقة الرياض",
    scopeEn: "Performance-based road maintenance contract covering the Zulfi–Ghat highway corridor, including pavement, drainage, road furniture, and safety works.",
    scopeAr: "عقد صيانة طرق قائم على الأداء يشمل محور طريق الزلفي–الغاط، بما في ذلك الرصيف والصرف الصحي ومعدات الطريق وأعمال السلامة.",
    client: "Ministry of Transport & Logistics",
    status: "active",
  },
  {
    id: "m3",
    contractNo: "301",
    titleEn: "Maintenance of the Performance of Roads in Al-Qunfudhah – Al-Ardiyat",
    titleAr: "صيانة أداء الطرق في القنفذة–الأرضيات",
    regionEn: "Makkah Region",
    regionAr: "منطقة مكة المكرمة",
    scopeEn: "Performance-based maintenance of road corridors in the Al-Qunfudhah and Al-Ardiyat areas, including surface treatment, drainage, and road safety measures.",
    scopeAr: "صيانة قائمة على الأداء لمحاور الطرق في مناطق القنفذة والأرضيات، بما في ذلك معالجة السطح والصرف وتدابير سلامة الطرق.",
    client: "Ministry of Transport & Logistics",
    status: "active",
  },
  {
    id: "m4",
    contractNo: "305",
    titleEn: "Maintenance of the Performance of Roads in the Holy Sites",
    titleAr: "صيانة أداء الطرق في المشاعر المقدسة",
    regionEn: "Makkah Region — Holy Sites",
    regionAr: "منطقة مكة المكرمة — المشاعر المقدسة",
    scopeEn: "Specialized maintenance of road infrastructure in and around the Holy Sites (Mina, Muzdalifah, Arafat), ensuring safe and efficient movement of pilgrims.",
    scopeAr: "صيانة متخصصة للبنية التحتية للطرق في المشاعر المقدسة وحولها (منى، مزدلفة، عرفات)، لضمان حركة آمنة وفعالة للحجاج.",
    client: "Ministry of Transport & Logistics",
    status: "active",
  },
  {
    id: "m5",
    contractNo: "204",
    titleEn: "Maintenance of the Performance of the Hofuf – Haradh – Al-Bathaa Roads",
    titleAr: "صيانة أداء طرق الهفوف–حرض–البطحاء",
    regionEn: "Eastern Province",
    regionAr: "المنطقة الشرقية",
    scopeEn: "Performance-based maintenance of the Hofuf–Haradh–Al-Bathaa road network, covering pavement rehabilitation, safety improvements, and road furniture.",
    scopeAr: "صيانة قائمة على الأداء لشبكة طرق الهفوف–حرض–البطحاء، تشمل إعادة تأهيل الرصيف وتحسينات السلامة ومعدات الطريق.",
    client: "Ministry of Transport & Logistics",
    status: "active",
  },
  {
    id: "m6",
    contractNo: "107",
    titleEn: "Maintenance of the Performance of the Roads of Shaqra – Marat – Sajer",
    titleAr: "صيانة أداء طرق شقراء–مرات–ساجر",
    regionEn: "Riyadh Region",
    regionAr: "منطقة الرياض",
    scopeEn: "Performance-based road maintenance covering the Shaqra–Marat–Sajer corridor, including pavement works, drainage improvements, signage, and safety upgrades.",
    scopeAr: "صيانة طرق قائمة على الأداء تشمل محور شقراء–مرات–ساجر، بما في ذلك أعمال الرصيف وتحسينات الصرف واللافتات وترقيات السلامة.",
    client: "Ministry of Transport & Logistics",
    status: "active",
  },
  {
    id: "m7",
    contractNo: "307",
    titleEn: "Maintenance of the Performance of Al-Shuaiba – Al-Lith Roads",
    titleAr: "صيانة أداء طرق الشعيبة–الليث",
    regionEn: "Makkah Region",
    regionAr: "منطقة مكة المكرمة",
    scopeEn: "Performance-based maintenance of the Al-Shuaiba–Al-Lith road corridor along the Red Sea coast, covering pavement rehabilitation, drainage, road furniture, and safety improvements.",
    scopeAr: "صيانة قائمة على الأداء لمحور طريق الشعيبة–الليث على ساحل البحر الأحمر، تشمل إعادة تأهيل الرصيف والصرف ومعدات الطريق وتحسينات السلامة.",
    client: "Ministry of Transport & Logistics",
    status: "active",
  },
];

const statusColors: Record<string, string> = {
  active: "bg-amber-500/20 text-amber-400 border border-amber-500/30",
  completed: "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30",
  awarded: "bg-blue-500/20 text-blue-400 border border-blue-500/30",
};

const statusLabels: Record<string, { en: string; ar: string }> = {
  active: { en: "Active", ar: "نشط" },
  completed: { en: "Completed", ar: "مكتمل" },
  awarded: { en: "Awarded", ar: "ممنوح" },
};

function MaintenanceCard({ project, isRTL }: { project: MaintenanceProject; isRTL: boolean }) {
  const [expanded, setExpanded] = useState(false);
  const [activeVideo, setActiveVideo] = useState(0);
  const title = isRTL ? project.titleAr : project.titleEn;
  const region = isRTL ? project.regionAr : project.regionEn;
  const scope = isRTL ? project.scopeAr : project.scopeEn;
  const statusLabel = statusLabels[project.status][isRTL ? "ar" : "en"];

  return (
    <div
      className="group bg-zinc-900 border border-zinc-800 hover:border-amber-500/40 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/5"
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Top accent bar */}
      <div className="h-1 w-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600" />

      {/* Video player */}
      {project.videos && project.videos.length > 0 && (
        <div className="relative bg-black">
          <video
            key={project.videos[activeVideo]}
            src={project.videos[activeVideo]}
            controls
            className="w-full aspect-video object-cover"
            preload="metadata"
          />
          {project.videos.length > 1 && (
            <div className="flex gap-2 p-2 bg-zinc-900/80 justify-center">
              {project.videos.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveVideo(i)}
                  className={`px-3 py-1 text-xs rounded font-medium transition-colors ${
                    activeVideo === i
                      ? "bg-amber-500 text-black"
                      : "bg-zinc-700 text-zinc-300 hover:bg-zinc-600"
                  }`}
                >
                  {isRTL ? `فيديو ${i + 1}` : `Video ${i + 1}`}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="p-6">
        {/* Header row */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0">
              <Wrench className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              {project.contractNo !== "—" && (
                <div className="flex items-center gap-1 mb-1">
                  <Hash className="w-3 h-3 text-zinc-500" />
                  <span className="text-xs text-zinc-500 font-mono">{project.contractNo}</span>
                </div>
              )}
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${statusColors[project.status]}`}>
                {statusLabel}
              </span>
            </div>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-white font-bold text-base leading-snug mb-3 group-hover:text-amber-400 transition-colors duration-200">
          {title}
        </h3>

        {/* Region */}
        <div className="flex items-center gap-2 mb-4">
          <MapPin className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
          <span className="text-zinc-400 text-sm">{region}</span>
        </div>

        {/* Client */}
        <div className="text-xs text-zinc-500 mb-4">
          <span className="text-zinc-600">{isRTL ? "العميل:" : "Client:"}</span>{" "}
          <span className="text-zinc-400">{project.client}</span>
        </div>

        {/* Expandable scope */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1.5 text-xs text-amber-500 hover:text-amber-400 transition-colors"
        >
          {expanded
            ? (isRTL ? "إخفاء التفاصيل" : "Hide Details")
            : (isRTL ? "عرض نطاق العمل" : "View Scope")}
          {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        {expanded && (
          <div className="mt-3 pt-3 border-t border-zinc-800">
            <p className="text-zinc-400 text-sm leading-relaxed">{scope}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function MaintenanceSection() {
  const { t, lang } = useLanguage();
  const isRTL = lang === "ar";

  return (
    <section
      id="maintenance"
      className="py-24 bg-zinc-950 relative overflow-hidden"
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Background texture */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(251,191,36,0.3) 40px, rgba(251,191,36,0.3) 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(251,191,36,0.3) 40px, rgba(251,191,36,0.3) 41px)",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-amber-500" />
            <span className="text-amber-500 text-xs font-semibold uppercase tracking-widest">
              {isRTL ? "مشاريع الصيانة" : "Maintenance Projects"}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-4">
            {isRTL ? (
              <>
                <span className="text-amber-400">صيانة</span> شبكة الطرق
              </>
            ) : (
              <>
                Road Network{" "}
                <span className="text-amber-400">Maintenance</span>
              </>
            )}
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl">
            {isRTL
              ? "عقود صيانة أداء الطرق الممنوحة من وزارة النقل والخدمات اللوجستية لضمان سلامة وكفاءة شبكة الطرق في المملكة."
              : "Performance-based road maintenance contracts awarded by the Ministry of Transport & Logistics to ensure the safety and efficiency of the Kingdom's road network."}
          </p>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12 p-5 bg-zinc-900 border border-zinc-800 rounded-xl">
          {[
            { value: "7", labelEn: "Active Contracts", labelAr: "عقود نشطة" },
            { value: "5+", labelEn: "Regions Covered", labelAr: "مناطق مشمولة" },
            { value: "MoT", labelEn: "Primary Client", labelAr: "العميل الرئيسي" },
          ].map((stat) => (
            <div key={stat.value} className="text-center">
              <div className="text-2xl font-black text-amber-400">{stat.value}</div>
              <div className="text-xs text-zinc-500 mt-1">
                {isRTL ? stat.labelAr : stat.labelEn}
              </div>
            </div>
          ))}
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {maintenanceProjects.map((project) => (
            <MaintenanceCard key={project.id} project={project} isRTL={isRTL} />
          ))}
        </div>

        {/* Bottom note */}
        <div className="mt-10 p-4 bg-amber-500/5 border border-amber-500/20 rounded-lg">
          <p className="text-zinc-500 text-sm text-center">
            {isRTL
              ? "جميع عقود الصيانة ممنوحة من وزارة النقل والخدمات اللوجستية — المملكة العربية السعودية"
              : "All maintenance contracts awarded by the Ministry of Transport & Logistics — Kingdom of Saudi Arabia"}
          </p>
        </div>
      </div>
    </section>
  );
}
